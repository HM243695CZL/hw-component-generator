<template>
    <div class="form-drawer-container">
        <el-drawer
            size="100%"
            :visible="drawer"
            :with-header="false"
            @open="onOpen" @close="onClose"
        >
            <vue-run-sfc
                    :js-labs="jsLabs"
                    :css-labs="cssLabs"
                    title="测试DEMO"
                    height="100vh"
                    :open="false"
                    :code="code"
            ></vue-run-sfc>
        </el-drawer>
    </div>
</template>

<script>
    import {
        makeUpHtml, vueTemplate, vueScript, cssStyle
    } from '@/components/generator/html'
    import { makeUpJs } from '@/components/generator/js'
    import { makeUpCss } from '@/components/generator/css'
    export default {
        name: "FormDrawer",
        data(){
            return {
                activeTab: 'html',
                htmlCode: '',
                jsCode: '',
                cssCode: '',
                jsLabs: ['https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js'],
                cssLabs: [
                    'https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/theme-chalk/index.css'
                ],
                code: '',
                height: 'calc(100vh - 100px)'
            }
        },
        props: ['drawer', 'formData', 'generateConf'],
        methods: {
            onOpen(){
                const { type } = this.generateConf
                this.htmlCode = makeUpHtml(this.formData, type)
                this.jsCode = makeUpJs(this.formData, type)
                this.cssCode = makeUpCss(this.formData)
                this.code = `
<template>
  <div>
    ${this.htmlCode}
  </div>
</template>

<script>
  ${this.jsCode}
<\/script>
                `
            },
            onClose(){
                this.$emit('closeFormDrawer')
            }
        }
    }
</script>

<style scoped>

</style>
