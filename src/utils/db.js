const FORM_CONF = 'formConf'
const DRAWING_ID = 'isGlobal'
export function getFormConf(){
    const str = localStorage.getItem(FORM_CONF)
    if(str) return JSON.parse(str)
    return null
}
export function getIdGlobal(){
    const str = localStorage.getItem(DRAWING_ID)
    if(str) return parseInt(str, 10)
    return 100
}
