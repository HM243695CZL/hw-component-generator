<template>
    <div class="code-type-dialog">
        <el-dialog
            width="500px"
            :close-on-click-modal="false"
            @open="onOpen"
            @close="onClose"
            :visible.sync="dialogVisible"
        >
            <el-form
                ref="elForm"
                :model="formData"
                size="medium"
                label-width="100px"
            >
                <el-form-item label="生成类型" prop="type">
                    <el-radio-group v-model="formData.type">
                        <el-radio label="file">页面</el-radio>
                        <el-radio label="dialog">弹窗</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="close">
                    取消
                </el-button>
                <el-button type="primary" @click="handelConfirm">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CodeTypeDialog",
        data(){
            return {
                formData: {
                    type: 'file'
                }
            }
        },
        props: ['dialogVisible'],
        methods: {
            onOpen(){

            },
            onClose(){
                this.close()
            },
            close(){
                this.$emit('update:dialogVisible', false)
            },
            handelConfirm(){
                this.$emit('confirm', {...this.formData})
                this.close()
            }
        }
    }
</script>

<style scoped>

</style>
