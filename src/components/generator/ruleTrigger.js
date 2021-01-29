/**
 *用于生成表单校验，指定正则表达式的触发方式
 *未在此处声明无触发方式的组件将不生成rule
 */
export default {
    'el-input': 'blur',
    'el-select': 'change',
    'el-cascader': 'change'
}
