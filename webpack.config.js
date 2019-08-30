const fs = require('fs')
const glob = require('glob')
const path = require('path')

module.exports = {
    entry: glob.sync('./abtests/**/index.js').reduce((acc, path) => {
        const entry = path.replace('/index.js', '')
        acc[entry] = path
        return acc
    }, {}),

    output: {
        filename: './[name]/build/build.js',
        path: path.resolve(__dirname)
    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    Object.keys(compilation.assets).forEach(entry => {
                        fs.readFile(entry, 'utf-8', (err, data) => {
                            if (err) {
                                console.log('\n\n\nRead File Err: ', err, '\n\n\n')
                                return
                            }
                            
                            fs.writeFile(entry, `<script>${data}</script>`, err => {
                                if (err) {
                                    console.log('\n\n\nWrite File Err: ', err, '\n\n\n')
                                }
                            })
                        })
                    })
                });
            }
        }
    ]
}