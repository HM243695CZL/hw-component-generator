// 表单属性【右面板】
export const formConf = {
    formRef: 'elForm',
    formModel: 'formData',
    size: 'medium',
    labelPosition: 'right',
    labelWidth: 100,
    formRules: 'rules',
    gutter: 15,
    disabled: false,
    span: 24,
    formBtns: true
}
// 输入型组件
export const inputComponents = [
    {
        // 组件的自定义配置
        __config__: {
            label: '单行文本',
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: 'el-input',
            tagIcon: 'input',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            document: 'https://element.eleme.cn/#/zh-CN/component/input',
            regList: [] // 正则校验规则
        },
        // 组件的插槽属性
        __slot__: {
            prepend: '',
            append: ''
        },
        //其余的可以直接写在组件标签上的属性
        placeholder: '请输入',
        style: {
            width: '100%'
        },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
    },
    {
        __config__: {
            label: '多行文本',
            labelWidth: null,
            showLabel: true,
            tag: 'el-input',
            tagIcon: 'textarea',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/input'
        },
        type: 'textarea',
        placeholder: '请输入',
        autosize: {
            minRows: 4,
            maxRows: 4
        },
        style: { width: '100%' },
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
    },
    {
        __config__: {
            label: '密码',
            labelWidth: null,
            showLabel: true,
            tag: 'el-input',
            tagIcon: 'beforetype-',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/input'
        },
        __slot__: {
            prepend: '',
            append: ''
        },
        placeholder: '请输入',
        'show-password': true,
        style: {
            width: '100%'
        },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
    },
    {
        __config__: {
            label: '计数器',
            labelWidth: null,
            showLabel: true,
            tag: 'el-input-number',
            tagIcon: 'number',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/input-number'
        },
        placeholder: '',
        min: undefined,
        max: undefined,
        step: 1,
        'step-strictly': false,
        precision: undefined,
        'controls-position': '',
        disabled: false
    }
]
// 选择型组件
export const selectComponents = [
    {
        __config__: {
            label: '下拉选择',
            showLabel: true,
            labelWidth: null,
            tag: 'el-select',
            tagIcon: 'select',
            layout: 'colFormItem',
            span: 24,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/select'
        },
        __slot__: {
            options: [
                { label: '选项一', value: 1},
                { label: '选项二', value: 2}
            ]
        },
        placeholder: '请选择',
        style: { width: '100%' },
        clearable: true,
        disabled: false,
        filterable: false,
        multiple: false
    },
    {
        __config__: {
            label: '级联选择',
            showLabel: true,
            labelWidth: null,
            tag: 'el-cascader',
            tagIcon: 'cascades',
            layout: 'colFormItem',
            defaultValue: '',
            dataType: 'dynamic',
            span: 24,
            required: true,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/cascader'
        },
        options: [
            {
                id: 1, value: 1, label: '选项1',
                children: [
                    { id: 2, value: 2, label: '选项1-1' }
                ]
            }
        ],
        placeholder: '请选择',
        style: { width: '100%'},
        props: {
            props: {
                multiple: false,
                label: 'label',
                value: 'value',
                children: 'children'
            }
        },
        'show-all-levels': true,
        disabled: false,
        clearable: true,
        filterable: false,
        separator: '/'
    },
    {
        __config__: {
            label: '单选框组',
            labelWidth: null,
            showLabel: true,
            tag: 'el-radio-group',
            tagIcon: 'radio',
            changeTag: true,
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            border: false,
            optionType: 'default',
            document: 'https://element.eleme.cn/#/zh-CN/component/radio',
            regList: []
        },
        __slot__: {
            options: [
                { label: '选项一', value: 1},
                { label: '选项二', value: 2}
            ]
        },
        style: {},
        size: 'medium',
        disabled: false
    },
    {
        __config__: {
            label: '多选框组',
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: 'el-checkbox-group',
            tagIcon: 'checkboxlist',
            defaultValue: [],
            required: true,
            layout: 'colFormItem',
            span: 24,
            optionType: 'default',
            border: false,
            document: 'https://element.eleme.cn/#/zh-CN/component/checkbox',
            regList: []
        },
        __slot__: {
            options: [
                { label: '选项一', value: 1},
                { label: '选项二', value: 2}
            ]
        },
        style: {},
        size: 'medium',
        min: null,
        max: null,
        disabled: false
    },
    {
        __config__: {
            label: '开关',
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: 'el-switch',
            tagIcon: 'switch',
            defaultValue: false,
            required: true,
            layout: 'colFormItem',
            span: 24,
            document: 'https://element.eleme.cn/#/zh-CN/component/switch',
            regList: []
        },
        style: {},
        disabled: false,
        'active-text': '',
        'inactive-text': '',
        'active-color': null,
        'inactive-color': null,
        'active-value': true,
        'inactive-value': false
    },
    {
        __config__: {
            label: '滑块',
            labelWidth: null,
            showLabel: true,
            tag: 'el-slider',
            tagIcon: 'slider_shadow',
            defaultValue: null,
            required: true,
            layout: 'colFormItem',
            span: 24,
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/slider',
            regList: []
        },
        disabled: false,
        min: 0,
        max: 100,
        step: 1,
        'show-stops': false,
        range: false
    },
    {
        __config__: {
            label: '时间选择',
            labelWidth: null,
            showLabel: true,
            tag: 'el-time-picker',
            tagIcon: 'time',
            defaultValue: null,
            required: true,
            layout: 'colFormItem',
            span: 24,
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/time-picker',
            regList: []
        },
        placeholder: '请选择',
        style: { width: '100%'},
        disabled: false,
        clearable: false,
        'picker-options': {
            selectableRange: '00:00:00-23:59:59'
        },
        format: 'HH:mm:ss',
        'value-format': 'HH:mm:ss'
    },
    {
        __config__: {
            label: '时间范围',
            labelWidth: null,
            showLabel: true,
            tag: 'el-time-picker',
            tagIcon: 'time-range',
            defaultValue: null,
            required: true,
            layout: 'colFormItem',
            span: 24,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
        },
        style: { width: '100%' },
        disabled: false,
        clearable: true,
        'is-range': true,
        'range-separator': '至',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        format: 'HH:mm:ss',
        'value-format': 'HH:mm:ss'
    },
    {
        __config__: {
            label: '日期选择',
            labelWidth: null,
            showLabel: true,
            tag: 'el-date-picker',
            tagIcon: 'date_select',
            defaultValue: null,
            required: true,
            layout: 'colFormItem',
            span: 24,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
        },
        type: 'date',
        defaultType: 'date',
        style: { width: '100%'},
        disabled: false,
        clearable: true,
        format: 'yyyy-MM-dd',
        'value-format': 'yyyy-MM-dd',
        readonly: false
    },
    {
        __config__: {
            label: '日期范围',
            labelWidth: null,
            showLabel: true,
            tag: 'el-date-picker',
            tagIcon: 'date-range',
            defaultValue: null,
            required: true,
            layout: 'colFormItem',
            span: 24,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
        },
        style: { width: '100%' },
        type: 'daterange',
        defaultType: 'daterange',
        'range-separator': '至',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        disabled: false,
        clearable: false,
        format: 'yyyy-MM-dd',
        'value-format': 'yyyy-MM-dd',
        readonly: false
    },
    {
        __config__: {
            label: '评分',
            labelWidth: null,
            showLabel: true,
            tag: 'el-rate',
            tagIcon: 'star',
            defaultValue: 0,
            required: true,
            layout: 'colFormItem',
            span: 24,
            regList: [],
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/rate'
        },
        style: {},
        max: 5,
        'allow-half': false,
        'show-text': false,
        disabled: false
    }
]
// 布局型组件
export const layoutComponents = [
    {
        __config__: {
            label: '行容器',
            tagIcon: 'row',
            layout: 'rowFormItem',
            layoutTree: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
        },
        type: 'default',
        justify: 'start',
        align: 'top'
    },
    {
        __config__: {
            label: '按钮',
            labelWidth: null,
            showLabel: true,
            tag: 'el-button',
            tagIcon: 'button',
            layout: 'colFormItem',
            span: 12,
            changeTag: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/button'
        },
        __slot__: {
            default: '主要按钮'
        },
        type: 'primary',
        defaultType: 'primary',
        disabled: false,
        icon: 'el-icon-search',
        round: false,
        circle: false,
        size: 'medium'
    }
]
