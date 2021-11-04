console.info("!!css!!!!!!!!!!!!");

function myLoader(content, map, meta) {
    console.info("=============== Info My Css Loader", content, map, meta);
    return content

}

module.exports = myLoader
