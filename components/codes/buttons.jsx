import TabPage from "./tab.json";
import Buttons from './buttns.json'
import { leistrap } from "../../leistrap1.0/leistrap.js";

var Components = {

    Buttons,
    TabPage,

}

function initComponent(COMPONENTS) {
    Object.keys(COMPONENTS).forEach(item => {
        var comp = COMPONENTS[item]
        var objControl = {}
        var rex = /"+[^\n]*" *:/gi
        var exists = rex.test(comp)
        if (exists) {

            var res = comp.match(rex).map(j => j.replace(/"+ *:/gi, ""))
            var result;

            res.forEach(j => {
                if (!leistrap.dep.obj.has(j, objControl)) {
                    objControl[j] = leistrap.dep.generateId(2, 5)
                }
                var id = leistrap.dep.generateId(3, 8)
                result = comp.replace(j, `"${objControl[j]}#$id::${id}#$id`)
                comp = result

            })
            leistrap.dep.obj.loopObj(objControl, function (v, k) {
                result = result.replace(new RegExp(v, "g"), k.slice(1, k.length))
            })
            COMPONENTS[item] = result

        }
    })
    return COMPONENTS
}
export { initComponent, Components }