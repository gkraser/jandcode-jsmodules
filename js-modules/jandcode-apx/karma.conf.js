let webpackConfig = require("./webpack.config")

let testFiles = './test/unittest/**/*.test.js'

module.exports = (config) => {
    config.set({
        // ... normal karma configuration

        browsers: ['Chrome'],

        // make sure to include webpack as a framework
        frameworks: ['mocha', 'webpack'],

        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-mocha-reporter',
        ],

        files: [
            {pattern: testFiles, watched: false}
        ],

        preprocessors: {
            // add webpack as preprocessor
            [testFiles]: ['webpack']
        },

        reporters: ['mocha'],

        webpack: webpackConfig,
    });
}
