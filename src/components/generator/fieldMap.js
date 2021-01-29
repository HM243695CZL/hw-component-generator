// 字段映射配置
export const fieldMap = {
    label: '标题',
    labelWidth: '标签宽度',
    showLabel: '显示标签',
    required: '是否必填',
    span: '表单栅格',
    __vModel__: '字段名',
    placeholder: '占位提示',
    width: '组件宽度',
    clearable: '能够清空',
    'prefix-icon': '前图标',
    'suffix-icon': '后图标',
    maxlength: '最多输入',
    'show-word-limit': '显示输入统计',
    readonly: '是否只读',
    disabled: '是否禁用',
    prepend: '前缀',
    append: '后缀',
    minRows: '最小行数',
    maxRows: '最大行数',
    min: '最小值/至少应选',
    max: '最大值/最多可选',
    step: '步长',
    'step-strictly': '严格步数',
    precision: '精度',
    'controls-position': '按钮位置',
    filterable: '能否搜索',
    multiple: '是否多选',
    'show-all-levels': '展示全路径',
    separator: '分隔符',
    border: '是否带边框',
    optionType: '选项样式',
    'active-text': '开启提示',
    'inactive-text': '关闭提示',
    'active-color': '开启颜色',
    'inactive-color': '关闭颜色',
    'active-value': '开启值',
    'inactive-value': '关闭值',
    'show-stops': '显示间断点',
    range: '范围选择',
    selectableRange: '时间段',
    format: '时间格式',
    'range-separator': '分隔符',
    'start-placeholder': '开始占位',
    'end-placeholder': '结束占位',
    'allow-half': '允许半选',
    'show-text': '辅助文字',
    default: '按钮文字',
    icon: '按钮图标',
    round: '是否圆角',
    circle: '是否圆形'
}
// 解析为inputNumber的字段
export const stepArr = ['min', 'max', 'step', 'minChecked', 'maxChecked', 'precision']

export const multipleOptionArr = ['el-select', 'el-checkbox-group']
// 解析为取色板的字段
export const colorPickerArr = ['active-color', 'inactive-color']
// 解析为开关的字段
export const switchArr = ['showLabel', 'required', 'show-word-limit', 'clearable',
                        'readonly', 'disabled', 'show-all-levels', 'step-strictly', 'filterable', 'multiple', 'show-stops',
                        'range', 'is-range', 'allow-half', 'show-text', 'round', 'circle']
// 解析为下拉框的字段
export const selectArr = ['el-date-picker', 'el-button']
// 下拉框的label显示
export const selectLabelObj = {
    date: '时间类型',
    daterange: '时间类型',
    primary: '按钮类型'
}
export const typeObj = {
    date: [
        {
            label: '日(date)',
            value: 'date'
        },
        {
            label: '周(week)',
            value: 'week'
        },
        {
            label: '月(month)',
            value: 'month'
        },
        {
            label: '年(year)',
            value: 'year'
        },
        {
            label: '日期时间(datetime)',
            value: 'datetime'
        }
    ],
    daterange: [
        {
            label: '日期范围(daterange)',
            value: 'daterange'
        },
        {
            label: '月范围(monthrange)',
            value: 'monthrange'
        },
        {
            label: '日期时间范围(datetimerange)',
            value: 'datetimerange'
        }
    ],
    primary: [
        {
            label: 'primary',
            value: 'primary'
        },
        {
            label: 'success',
            value: 'success'
        },
        {
            label: 'warning',
            value: 'warning'
        },
        {
            label: 'danger',
            value: 'danger'
        },
        {
            label: 'info',
            value: 'info'
        },
        {
            label: 'text',
            value: 'text'
        }
    ]
}
export const dateTimeFormat ={
    date: 'yyyy-MM-dd',
    week: 'yyyy 年 WW 周',
    month: 'yyyy-MM',
    year: 'yyyy',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    monthrange: 'yyyy-MM',
    datetimerange: 'yyyy-MM-dd HH:mm:ss'
}
