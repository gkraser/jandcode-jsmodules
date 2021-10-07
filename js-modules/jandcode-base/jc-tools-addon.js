/* addon для jc-tools
----------------------------------------------------------------------------- */

module.exports = {

    webpackBaseConfig: {
        resolve: {
            alias: {
                'jquery$': 'jquery/dist/jquery.slim.js'
            }
        }
    },

    // регистрация тем
    themes: {
        "base": {
            module: "@jandcode/base/src/css/base-theme.js",
        }
    }


}