<template>
    <div class="right-board">
        <el-tabs v-model="currentTab" class="center-tabs">
            <el-tab-pane label="组件属性" name="component" />
            <el-tab-pane label="表单属性" name="form" />
        </el-tabs>
        <div class="field-box">
            <el-scrollbar>
                <el-form v-show="currentTab === 'component'" size="small" label-width="120px">
                    <div class="active-box" v-for="(val, key) in activeData" :key="key">
                        <el-form-item v-if="fieldMap[key]" :label="fieldMap[key]">
                            <el-switch
                                    v-if="switchArr.includes(key)"
                                    v-model="activeData[key]"
                                    @change="multipleChange"
                            ></el-switch>
                            <el-input-number
                                    v-else-if="stepArr.includes(key)"
                                    v-model="activeData[key]"
                            ></el-input-number>
                            <el-color-picker
                                v-else-if="colorPickerArr.includes(key)"
                                v-model="activeData[key]"
                            ></el-color-picker>
                            <el-input
                                v-else-if="['active-value', 'inactive-value'].includes(key)"
                                :value="setDefaultValue(activeData[key])"
                                @input="onSwitchValueInput($event, key)"
                            ></el-input>
                           <el-input
                                   v-else
                                   v-model="activeData[key]"
                                   :placeholder="fieldMap[key]"
                           ></el-input>
                        </el-form-item>
                    </div>
                    <div class="__vModel__-box">
                        <el-form-item label="默认值">
                            <el-input
                                    v-if="activeData.__vModel__ !== undefined"
                                    placeholder="请输入默认值"
                                    :value="setDefaultValue(activeData.__config__.defaultValue)"
                                    @input="onDefaultValueInput"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <div class="style-box" v-for="(val, key) in activeData.style" :key="key">
                        <el-form-item v-if="fieldMap[key]" :label="fieldMap[key]">
                            <el-input v-model="activeData.style[key]" :placeholder="fieldMap[key]"></el-input>
                        </el-form-item>
                    </div>
                    <div class="picker-options-box" v-for="(val, key) in activeData['picker-options']" :key="key">
                        <el-form-item v-if="fieldMap[key]" :label="fieldMap[key]">
                            <el-input v-model="activeData['picker-options'][key]" :placeholder="fieldMap['picker-options']"></el-input>
                        </el-form-item>
                    </div>
                    <div class="slot-box" v-for="(val, key) in activeData.__slot__" :key="key">
                        <el-form-item v-if="fieldMap[key]" :label="fieldMap[key]">
                            <el-input v-model="activeData.__slot__[key]" :placeholder="fieldMap[key]"></el-input>
                        </el-form-item>
                    </div>
                    <div class="autosize-box" v-for="(val, key) in activeData.autosize" :key="key">
                        <el-form-item v-if="fieldMap[key]" :label="fieldMap[key]">
                            <el-input v-model="activeData.autosize[key]" :placeholder="fieldMap[key]"></el-input>
                        </el-form-item>
                    </div>
                    <div class="config-box" v-for="(val, key) in activeData.__config__" :key="key">
                        <el-form-item v-if="fieldMap[key]" :label="fieldMap[key]">
                            <el-switch
                                    v-if="typeof activeData.__config__[key] === 'boolean'"
                                    v-model="activeData.__config__[key]"
                            ></el-switch>
                            <el-slider
                                    v-else-if="key === 'span'"
                                    v-model="activeData.__config__[key]"
                                    :marks="{12: ''}"
                                    :max="24"
                                    :min="1"
                            ></el-slider>
                            <el-input
                                    v-else
                                    v-model="activeData.__config__[key]"
                                    :placeholder="fieldMap[key]"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <div class="select-box" v-if="selectArr.includes(activeData.__config__.tag)">
                        <el-form-item :label="selectLabelObj[activeData.defaultType]">
                            <el-select v-model="activeData.type" @change="dateTypeChange">
                                <el-option
                                        v-for="item in typeObj[activeData.defaultType]"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.label"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="flex-box" v-if="activeData.__config__.layout === 'rowFormItem'">
                        <el-form-item label="布局模式">
                            <el-radio-group v-model="activeData.type">
                                <el-radio-button label="default"></el-radio-button>
                                <el-radio-button label="flex"></el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="size-box" v-if="activeData.__config__.tag === 'el-button'">
                        <el-form-item label="尺寸">
                            <el-radio-group v-model="activeData.size">
                                <el-radio-button label="medium"></el-radio-button>
                                <el-radio-button label="small"></el-radio-button>
                                <el-radio-button label="mini"></el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <template v-if="multipleOptionArr.includes(activeData.__config__.tag)">
                        <el-divider>选项</el-divider>
                        <div class="slot-option-box" v-for="(item, index) in activeData.__slot__.options" :key="item + '__' + index">
                            <div class="select-item">
                                <el-input v-model="item.label" placeholder="选项名"></el-input>
                                <el-input v-model="item.value" placeholder="选项值"></el-input>
                                <i class="el-icon-remove-outline" @click="activeData.__slot__.options.splice(index, 1)"></i>
                            </div>
                        </div>
                        <el-button
                                style="padding-bottom: 0"
                                icon="el-icon-circle-plus-outline"
                                type="text"
                                @click="addSelectItem"
                        >
                            添加选项
                        </el-button>
                    </template>
                    <template v-else-if="['el-cascader'].includes(activeData.__config__.tag)">
                        <el-divider>选项</el-divider>
                        <el-form-item label="数据类型">
                            <el-radio-group v-model="activeData.__config__.dataType" size="small">
                                <el-radio-button label="dynamic">
                                    动态数据
                                </el-radio-button>
                                <el-radio-button label="static">
                                    静态数据
                                </el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <template v-if="activeData.__config__.dataType === 'dynamic'">
                            <el-form-item label="标签键名">
                                <el-input v-model="activeData.props.props.label" placeholder="请输入标签键名"></el-input>
                            </el-form-item>
                            <el-form-item label="值名">
                                <el-input v-model="activeData.props.props.value" placeholder="请输入值名"></el-input>
                            </el-form-item>
                            <el-form-item label="子级键名">
                                <el-input v-model="activeData.props.props.children" placeholder="请输入子级键名"></el-input>
                            </el-form-item>
                        </template>
                        <el-tree
                            v-if="activeData.__config__.dataType === 'static'"
                            draggable
                            :data="activeData.options"
                            node-key="id"
                            :expand-on-click-node="false"
                            :render-content="renderContent"
                        ></el-tree>
                    </template>
                    <el-divider>正则校验</el-divider>
                    <div class="reg-box" v-for="item in activeData.__config__.regList" :key="item.pattern">
                        <span class="el-icon-circle-close"></span>
                        <el-form-item label="表达式">
                            <el-input v-model="item.pattern" placeholder="请输入正则"></el-input>
                        </el-form-item>
                        <el-form-item label="错误提示">
                            <el-input v-model="item.message" placeholder="请输入错误提示"></el-input>
                        </el-form-item>
                    </div>
                    <el-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
                        添加规则
                    </el-button>
                </el-form>
                <el-form v-show="currentTab === 'form'" size="small" label-width="90px">
                    <el-form-item label="表单名">
                        <el-input></el-input>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
    import {fieldMap, stepArr, multipleOptionArr, colorPickerArr,
        switchArr, selectArr, selectLabelObj, typeObj, dateTimeFormat} from '@/components/generator/fieldMap'
    import{ isNumberStr} from '@/utils';

    export default {
        name: "RightBoard",
        data(){
            return {
                currentTab: 'component',
                fieldMap: fieldMap,
                stepArr: stepArr,
                multipleOptionArr: multipleOptionArr,
                colorPickerArr: colorPickerArr,
                switchArr: switchArr,
                selectArr: selectArr,
                selectLabelObj: selectLabelObj,
                typeObj: typeObj
            }
        },
        props: ['activeData'],
        mounted(){

        },
        methods: {
            // 添加选项
            addSelectItem(){
                console.log('addSelectItem');
            },
            // 添加正则
            addReg(){
                console.log('addReg');
            },
            multipleChange(val){
                if(this.activeData.__config__.tag === 'el-select'){
                    this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
                }
            },
            setDefaultValue(val){
                if(Array.isArray(val)){
                    return val.join(',')
                }
                if(typeof val === 'boolean'){
                    return `${val}`
                }
                return val
            },
            onDefaultValueInput(str){
                if(Array.isArray(this.activeData.__config__.defaultValue)){
                    // 数组
                    this.$set(this.activeData.__config__, 'defaultValue',
                        str.split(',').map(val => (isNumberStr(val) ? +val : val))
                    )
                } else if(['true', 'false'].includes(str)){
                    // 布尔
                    this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
                } else {
                    //字符串和数字
                    this.$set(this.activeData.__config__, 'defaultValue',
                        isNumberStr(str) ? +str : str
                    )
                }
            },
            onSwitchValueInput(val, key){
                if(['true', 'false'].includes(val)){
                    this.$set(this.activeData, key, JSON.parse(val))
                }else {
                    this.$set(this.activeData, key, isNumberStr(val) ? +val : val)
                }
            },
            setTimeValue(val, type){
                const valueFormat = type === 'week' ? dateTimeFormat.date : val
                this.$set(this.activeData.__config__, 'defaultValue', null)
                this.$set(this.activeData, 'value-format', valueFormat)
                this.$set(this.activeData, 'format', val)
            },
            dateTypeChange(val){
                if(this.activeData.defaultType === 'primary'){
                    return false
                }
                this.setTimeValue(dateTimeFormat[val], val)
            },
            renderContent(h, { node, data, store }){
                return (
                    <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span class="node-operation">
                            <span title="添加" class="plus" on-click={ () => this.append(data) }>+</span>
                            <span title="删除" class="remove" on-click={ () => this.remove(node, data) }>-</span>
                      </span>
                    </span>
                )
            },
            append(data){
                console.log('appendNode');
            },
            remove(){
                console.log('removeNode');
            }
        }
    }
</script>

<style scoped lang="less">
    .field-box{
        .el-form{
            padding: 12px 18px 15px 15px;
        }
        .reg-box{
            padding: 10px;
            border-radius: 4px;
            background-color: #f8f8f8;
            position: relative;
            .el-icon-circle-close{
                position: absolute;
                top: -7px;
                right: -9px;
                z-index: 99;
                color: #606266;
                padding: 10px;
                cursor: pointer;
            }
        }
        .slot-option-box{
            .select-item{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .el-input{
                    margin-right: 10px;
                }
                i{
                    cursor: pointer;
                    &:hover{
                        color: #f40;
                    }
                }
            }
        }
    }
::v-deep .custom-tree-node{
    display: flex;
    justify-content: space-between;
    width: 100%;
    .plus,.remove{
        font-size: 20px;
        cursor: pointer;
        padding: 0 5px;
        color: #126ac6;
    }
}
::v-deep.center-tabs{
    .el-tabs__header{
        margin: 0;
    }
    .el-tabs__nav{
        width: 100%;
    }
    .el-tabs__item{
        width: 50%;
        text-align: center;
    }
}
</style>
