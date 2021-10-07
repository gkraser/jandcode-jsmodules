console.info("!!!!!!!!!!!!!!");

function myLoader(content, map, meta) {
    console.info("=============== Info My Loader", content, map, meta, this);

    return `
import 'jquery'    
//module.exports = {aaa:1}
export default {
   bbb:2
}

`

}

module.exports = myLoader
