const styles = {}
function addClass(cssList, el){
    const css = styles[el.__config__.tag]
    css && cssList.indexOf(css) === -1 && cssList.push(css)
    if(el.__config__.children){
        el.__config__.children.forEach(ele => addClass(cssList, ele))
    }
}
export function makeUpCss(conf){
    const cssList = []
    conf.fields.forEach(el => addClass(cssList, el))
    return cssList.join('\n')
}
