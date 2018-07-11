const fs = require('fs')
const path = require('path')
const marked = require('marked')
const beautify = require('js-beautify').html
const fm = require('front-matter')

/*
* convert a md file to html and move it to destination.
*
* @access public
* @function md
* @param {string} filePath - A string represents a file's path
*/
function md(filePath, option) {
  return new Promise(resolve => {
    let name = path.basename(filePath, '.md')
    if (option.sort) name = name.substring(5)
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err
  
      if (data === '') return

      const obj = fm(data)
  
      let title
      if (!option.onlyContent) title = obj.attributes.title
      let content = marked(obj.body)
      content = content.replace(/\sid=".*">/g, '>')
      content = beautify(content, {
        indent_size: 2
      })
  
      let str = option.onlyContent ? content : `<!DOCTYPE html>
<html lang="zh">
<head>
  <!--#include file="/common/head.html"-->
  <title>${title} | 亦可用</title>
</head>
<body class="page-post">
<!--#include file="/common/nav.html"-->
<div class="container blog">
${content}
</div>
<!--#include file="/common/footer.html"-->
<script src="/js/vendor/prism.js"></script>
</body>
</html>`
  
      fs.writeFile(`${option.dest}/${name}.html`, str, err2 => {
        if (err2) throw err2

        resolve(obj.attributes)
      })
    })
  })
}

module.exports = md
