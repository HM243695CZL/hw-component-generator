import ruleTrigger from './ruleTrigger'
let confGlobal
let someSpanIsNot24


function buildFormTemplate(scheme, child, type){
    let labelPosition = ''
    if(scheme.labelPosition !== 'right'){
        labelPosition = `label-position="${scheme.labelPosition}"`
    }
    const disabled = scheme.disabled ? `:disabled="${scheme.disabled}"` : ''
    let str = `<el-form ref="${scheme.formRef}" :model="${scheme.formModel}" :rules="${scheme.formRules}" size="${scheme.size}" ${disabled} label-width="${scheme.labelWidth}px" ${labelPosition}>
        ${child}
    </el-form>`
    if(someSpanIsNot24){
        str = `<el-row :gutter="${scheme.gutter}">
                ${str}
            </el-row>`
    }
    return str
}
// span不等于24的用el-col包裹
function colWrapper(scheme, str){
    if(someSpanIsNot24 || scheme.__config__.span !== 24){
        return `<el-col :span="${scheme.__config__.span}">
                ${str}
            </el-col>`
    }
    return str
}
const layouts = {
    colFormItem(scheme){
        const config = scheme.__config__
        let labelWidth = ''
        let label = `label=${config.label}`
        if(config.labelWidth && config.labelWidth !== confGlobal.labelWidth){
            labelWidth = `label-width="${config.labelWidth}px"`
        }
        if(config.showLabel === false){
            labelWidth = 'label-width="0"'
            label = ''
        }
        const required = !ruleTrigger[config.tag] && config.required ? 'required' : ''
        const tagDom = tags[config.tag] ? tags[config.tag](scheme) : null
        let str =
        `<el-form-item ${labelWidth} ${label} prop="${scheme.__vModel__}" ${required}>
            ${tagDom}
        </el-form-item>`
        str = colWrapper(scheme, str)
        return str
    }
}
const tags = {
    'el-input': el => {
        const {
            tag, disabled, vModel, clearable, placeholder, width
        } = attrBuilder(el)
        const maxlength = el.maxlength ? `:maxlength="${el.maxlength}"` : ''
        const showWordLimit = el['show-word-limit'] ? 'show-word-limit' : ''
        const readonly = el.readonly ? 'readonly' : ''
        const prefixIcon = el['prefix-icon'] ? `prefix-icon='${el['prefix-icon']}'` : ''
        const suffixIcon = el['suffix-icon'] ? `suffix-icon='${el['suffix-icon']}'` : ''
        const showPassword = el['show-password'] ? 'show-password' : ''
        const type = el.type ? `type="${el.type}"` : ''
        const autosize = el.autosize && el.autosize.minRows
            ? `:autosize="{minRows: ${el.autosize.minRows}, maxRows: ${el.autosize.maxRows}}"`
            : ''
        let child = buildElInputChild(el)
        if(child) child = `\n${child}\n` // 换行
        return `<${tag} ${vModel} ${type} ${placeholder} ${maxlength} ${showWordLimit} ${readonly} ${disabled} ${clearable} ${prefixIcon} ${suffixIcon} ${showPassword} ${autosize} ${width}>${child}</${tag}>`
    }
}
function attrBuilder(el){
    return {
        tag: el.__config__.tag,
        vModel: `v-model="${confGlobal.formModel}.${el.__vModel__}"`,
        clearable: el.clearable ? 'clearable' : '',
        placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : '',
        // width: el.style && el.style.width ? ':style="{width: \'100%\'}"' : '',
        disabled: el.disabled ? ':disabled=\'true\'' : ''
    }
}
// el-input 子级
function buildElInputChild(scheme){
    const children = []
    const slot = scheme.__slot__
    if(slot && slot.prepend){
        children.push(`<template slot="prepend">${slot.prepend}</template>`)
    }
    if(slot && slot.append){
        children.push(`<template slot="append">${slot.append}</template>`)
    }
    return children.join('\n')
}
/**
 * 组装html代码
 * @param formConfig 表单配置
 * @param type 类型，文件或弹窗
 */
export function makeUpHtml(formConfig, type){
    const htmlList = []
    confGlobal = formConfig
    formConfig.fields.forEach(el => {
        htmlList.push(layouts[el.__config__.layout](el))
    })
    const htmlStr = htmlList.join('\n')
    let temp = buildFormTemplate(formConfig, htmlStr, type)
    confGlobal = null
    return temp
}
