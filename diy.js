const fs = require('fs')
const path = require('path')
const md = require('./src/js/lib/md.js')

let srcPath = './src/md-diy'

let files = fs.readdirSync(srcPath)

files.forEach(file => {
  md(path.resolve(`${srcPath}/${file}`), {
    dest: './html/article-diy',
    onlyContent: true
  })
})
