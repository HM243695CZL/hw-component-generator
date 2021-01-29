<template>
    <div class="home-container">
        <div class="left-board">
            <div class="logo-container">
                <img :src="logo" alt="" class="logo-img">
                <div class="name">Hw-Generator</div>
            </div>
            <div class="comp-wrapper-container">
                <el-scrollbar>
                    <div class="component-list">
                        <div class="component-type-item" v-for="(item, index) in componentTypeList" :key="index">
                            <div class="component-type-item-title">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-component"></use>
                                </svg>
                                {{item.title}}
                            </div>
                            <draggable
                                    class="components-draggable"
                                    :list="item.list"
                                    :sort="false"
                                    :clone="cloneComponent"
                                    :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                                    @end="onEnd"
                            >
                                <div
                                        class="component-item"
                                        v-for="(ele, i) in item.list"
                                        :key="i"
                                        @click="addComponent(ele)"
                                >
                                    <div class="components-body">
                                        <svg class="icon component-icon" aria-hidden="true">
                                            <use :xlink:href="'#icon-' + ele.__config__.tagIcon"></use>
                                        </svg>
                                        {{ele.__config__.label}}
                                    </div>
                                </div>
                            </draggable>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="center-board">
            <div class="action-bar-container">
                <el-button icon="el-icon-video-play" type="text" @click="run">
                    运行
                </el-button>
                <el-button icon="el-icon-view" @click="showData" type="text">
                    查看数据
                </el-button>
                <el-button icon="el-icon-delete" type="text" @click="empty">
                    清空
                </el-button>
            </div>
            <el-scrollbar class="content-wrapper-container">
                <el-row class="center-board-row" :gutter="formConf.gutter">
                    <el-form
                            :size="formConf.size"
                            :label-position="formConf.labelPosition"
                            :disabled="formConf.disabled"
                            :label-width="formConf.labelWidth + 'px'"
                    >
                        <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
                            <draggable-item
                                    v-for="(element, index) in drawingList"
                                    :key="element.renderKey"
                                    :drawing-list="drawingList"
                                    :element="element"
                                    :index="index"
                                    :active-id="activeId"
                                    :form-conf="formConf"
                                    @activeItem="activeFormItem"
                                    @deleteItem="drawingItemDelete"
                                    @copyItem="drawingItemCopy"
                            />
                        </draggable>
                    </el-form>
                </el-row>
            </el-scrollbar>
        </div>
        <right-board
            :active-data="activeData"
        />
        <code-type-dialog
            :dialog-visible.sync="dialogVisible"
            @confirm="generate"
        />
        <form-drawer
            :drawer="drawerVisible"
            :form-data="formData"
            :generate-conf="generateConf"
            @closeFormDrawer="closeFormDrawer"
        />
    </div>
</template>

<script>
    import RightBoard from '@/layout/RightBoard'
    import draggable from 'vuedraggable'
    import DraggableItem from '@/components/draggableItem'
    import CodeTypeDialog from '@/layout/CodeTypeDialog'
    import FormDrawer from '@/layout/FormDrawer'
    import {
        inputComponents,
        selectComponents,
        layoutComponents
    } from '@/components/generator/config'
    import {
        deepClone
    } from '@/utils';
    import{
        getFormConf,
        getIdGlobal
    } from '@/utils/db';
    import {
        formConf
    } from '@/components/generator/config'
    import drawingDefault from '@/components/generator/drawingDefault'
    let tempActiveData
    const formConfInDB = getFormConf()
    const isGlobal = getIdGlobal()
    export default {
        name: 'Home',
        data() {
            return {
                logo: require('@/assets/hw.png'),
                isGlobal,
                componentTypeList: [
                    { title: '输入型组件', list: inputComponents },
                    { title: '选择型组件', list: selectComponents },
                    { title: '布局型组件', list: layoutComponents }
                ],
                formConf,
                drawingList: drawingDefault,
                currentTab: 'component',
                activeData: drawingDefault[0],
                activeId: drawingDefault[0].formId,
                dialogVisible: false,
                drawerVisible: false,
                generateConf: null,
                formData: {}
            }
        },
        components: {
            RightBoard,
            draggable,
            DraggableItem,
            CodeTypeDialog,
            FormDrawer
        },
        mounted(){
            if(formConfInDB){
                this.formConf = formConfInDB
            }
        },
        methods: {
            // 添加组件
            addComponent(item){
                const clone = this.cloneComponent(item)
                this.drawingList.push(clone)
                this.activeFormItem(clone)
            },
            cloneComponent(origin){
                const clone = deepClone(origin)
                const config = clone.__config__
                config.span = this.formConf.span
                this.createIdAndKey(clone)
                clone.placeholder !== undefined && (clone.placeholder += config.label)
                tempActiveData = clone
                return tempActiveData
            },
            onEnd(obj){
                if(obj.from !== obj.to){
                    this.activeData = tempActiveData
                    this.activeId = this.isGlobal
                }
            },
            createIdAndKey(item){
                const config = item.__config__
                config.formId = ++this.isGlobal
                config.renderKey = +new Date() // 改变renderKey后可以实现强制更新组件
                if(config.layout === 'colFormItem'){
                    item.__vModel__ = `field${this.isGlobal}`
                }else if(config.layout === 'rowFormItem'){
                    config.componentName = `row${this.isGlobal}`
                    !Array.isArray(config.children) && (config.children = [])
                    delete config.label // rowFormItem无需配置label属性
                }
                if(Array.isArray(config.children)){
                    config.children = config.children.map(childItem => this.createIdAndKey(childItem))
                }
                return item
            },
            activeFormItem(element){
                this.activeData = element
                this.activeId = element.__config__.formId
            },
            run(){
                this.dialogVisible = true
            },
            empty(){
                this.$confirm('确定要清空所有组件吗？', '提示', {
                    type: 'warning'
                }).then( () => {
                    this.drawingList = []
                    this.isGlobal = 100
                })
            },
            showData(){
                console.log(this.drawingList);
            },
            AssembleFormData(){
                this.formData = {
                    fields: deepClone(this.drawingList),
                    ...this.formConf
                }
            },
            generate(data){
                const func = this['execRun']
                this.generateConf = data
                func && func(data)
            },
            execRun(data){
                this.AssembleFormData()
                this.drawerVisible = true
            },
            closeFormDrawer(){
                this.drawerVisible = false
            },
            drawingItemCopy(item, parent){
                let clone = deepClone(item)
                clone = this.createIdAndKey(clone)
                parent.push(clone)
                this.activeFormItem(clone)
            },
            drawingItemDelete(index, parent){
                parent.splice(index, 1)
                this.$nextTick(() => {
                    const len = this.drawingList.length
                    if(index > 0){
                        this.activeFormItem(this.drawingList[index - 1])
                    }else if(len){
                        this.activeFormItem(this.drawingList[len - 1])
                    }
                })
            }
        }
    }
</script>
<style scoped lang="less">
    .home-container {
        box-sizing: border-box;
    }
    .right-board{
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
    }
</style>
