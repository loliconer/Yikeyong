const fs = require('fs')
const path = require('path')
const marked = require('marked')
const beautify = require('js-beautify').html

//convert a md file to html and move it to destination
module.exports = function(filePath) {
  let name = path.basename(filePath, '.md')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) throw err

    if (data === '') return

    let title = data.match(/### (.*)\n/)[1]
    let content = marked(data)
    content = content.replace(/\sid=".*">/g, '>')
    content = content.replace('<h3>', '<h3 class="post-title">')
    content = beautify(content, {
      indent_size: 2
    })

    let str =`<!DOCTYPE html>
<html lang="zh">
<head>
  <!--#include file="/common/head.html"-->
  <title>${title}</title>
</head>
<body class="page-post">
<div class="container blog">
${content}
</div>
<script src="/js/vendor/prism.js"></script>
</body>
</html>`

    fs.writeFile(`./html/blog/post/${name}.html`, str, err => {
      if (err) throw err
    })
  })
}
