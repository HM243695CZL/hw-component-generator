import {isArray} from "util";
import {deepClone, exportDefault, titleCase} from "@/utils";
import ruleTrigger from './ruleTrigger'

let confGlobal
const inheritAttrs = {
    file: '',
    dialog: 'inheritAttrs: false'
}
// 构建组件属性
function buildAttributes(scheme, dataList, ruleList, optionsList, methodList, propsList, uploadVarList){
    const config = scheme.__config__
    const slot = scheme.__slot__
    buildData(scheme, dataList)
    buildRules(scheme, ruleList)
    //特殊处理options属性
    if(scheme.options || (slot && slot.options && slot.options.length)){
        buildOptions(scheme, optionsList)
        if(config.dataType === 'dynamic'){
            const model = `${scheme.__vModel__}Options`
            const options = titleCase(model)
            buildOptionMethod(`get${options}`, model, methodList)
        }
    }
    // 处理props
    if(scheme.props && scheme.props.props){
        buildProps(scheme, propsList)
    }
}
// 混入处理函数
function mixinMethod(type){
    const list = []
    const minxins = {
        file: confGlobal.formBtns ? {
            submitForm: `submitForm(){
                this.$refs['${confGlobal.formRef}'].validate(valid => {
                    if(!valid) return 
                })
            },`,
            resetForm: `
            resetForm(){
                this.$refs['${confGlobal.formRef}'].resetFields()
            },`
        } : null,
        dialog: {
            onOpen: 'onOpen(){}',
            onClose: `onClose(){
                this.$refs['${confGlobal.formRef}'].resetFields()
            },`,
            close: `close(){
                this.$emit('update:visible', false)
            },`,
            handleConfirm: `handleConfirm(){
                this.$refs['${confGlobal.formRef}'].validate(valid => {
                    if(!valid) return
                    this.close()
                })
            },`
        }
    }
    const methods = minxins[type]
    if(methods){
        Object.keys(methods).forEach(key => {
            list.push(methods[key])
        })
    }
    return list
}
// 构建data
function buildData(scheme, dataList){
    const config = scheme.__config__
    if(scheme.__vModel__ === undefined) return
    const defaultValue = JSON.stringify(config.defaultValue)
    dataList.push(`${scheme.__vModel__}: ${defaultValue}`)
}
// 构建校验规则
function buildRules(scheme, ruleList){
    const config = scheme.__config__
    if(scheme.__vModel__ === undefined) return
    const rules = []
    if(ruleTrigger[config.tag]){
        if(config.required){
            const type = isArray(config.defaultValue) ? 'type: \'array\',' : ''
            let message = isArray(config.defaultValue) ? `请至少选择一个${config.label}` : scheme.placeholder
            if(message === undefined) message = `${config.label}不能为空`
            rules.push(`{ required: true, ${type} message: '${message}', trigger: '${ruleTrigger[config.tag]}' }`)
        }
        if(config.regList && isArray(config.regList)){
            config.regList.forEach( item => {
                if(item.pattern){
                    rules.push(
                        `{ pattern: ${eval(item.pattern)}, message: '${item.message}', trigger: '${ruleTrigger[config.tag]}' }`
                    )
                }
            })
        }
        ruleList.push(`${scheme.__vModel__}: [${rules.join(',')}],`)
    }
}
// 构建options
function buildOptions(scheme, optionsList){
    if(scheme.__vModel__ === undefined) return
    // 级联选择器el-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
    let { options } = scheme
    if(!options) options = scheme.__slot__.options
    if(scheme.__config__.dataType === 'dynamic'){ options = [] }
    const str = `${scheme.__vModel__}Options: ${JSON.stringify(options)}`
    optionsList.push(str)
}
function buildProps(scheme, propsList){
    const str = `${scheme.__vModel__}Props: ${JSON.stringify(scheme.props.props)}`
    propsList.push(str)
}
function buildOptionMethod(methodName, model, methodList){
    const str = `${methodName}(){
        // 发起请求获取数据
        this.${model}
    }`
    methodList.push(str)
}
// js整体拼接
function buildExport(conf, type, data, rules, selectOptions, uploadVar, props, methods){
    return `${exportDefault}{
        ${inheritAttrs[type]}
        components: {},
        props: [],
        data(){
            return {
                ${conf.formModel}: {
                    ${data}
                },
                ${conf.formRules}: {
                    ${rules}
                },
                ${uploadVar}
                ${selectOptions}
                ${props}
            }
        },
        computed: {},
        watch: {},
        created(){},
        mounted(){},
        methods: {
            ${methods}
        }
    }`
}
/**
 *组装js
 * @param formConfig 表单配置
 * @param type 类型，文件或弹窗
 */
export function makeUpJs(formConfig, type){
    confGlobal = formConfig = deepClone(formConfig)
    const dataList = []
    const ruleList = []
    const optionsList = []
    const propsList = []
    const methodList = mixinMethod(type)
    const uploadVarList = []
    formConfig.fields.forEach(el => {
        buildAttributes(el, dataList, ruleList, optionsList, methodList, propsList, uploadVarList)
    })
    const script = buildExport(
        formConfig,
        type,
        dataList.join('\n'),
        ruleList.join('\n'),
        optionsList.join('\n'),
        uploadVarList.join('\n'),
        propsList.join('\n'),
        methodList.join('\n')
    )
    confGlobal = null
    return script
}
