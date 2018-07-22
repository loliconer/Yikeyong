const fs = require('fs')
const path = require('path')
const marked = require('marked')
const beautify = require('js-beautify').html

/*
* convert a md file to html and move it to destination.
*
* @access public
* @function md
* @param {string} filePath - A string represents a file's path
*/
function md(filePath, option) {
  const name = option.index || path.basename(filePath, '.md')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err

    if (data === '') return

    let content = marked(data)
    content = content.replace(/\sid=".*">/g, '>')
    content = beautify(content, {
      indent_size: 2
    })

    let rels = ''
    let footers = ''
    if (option.index) {
      if (option.first) {
        rels = `<link rel="next" href="${option.index + 1}.html">`
        footers = `<div class="b-footer">
  <a class="link"></a>
  <a class="link" href="${option.index + 1}.html">下一章</a>
</div>`
      } else if (option.last) {
        rels = `<link rel="prev" href="${option.index - 1}.html">`
        footers = `<div class="b-footer">
  <a class="link" href="${option.index - 1}.html">上一章</a>
  <a class="link"></a>
</div>`
      } else {
        rels = `<link rel="prev" href="${option.index - 1}.html">
  <link rel="next" href="${option.index + 1}.html">`
        footers = `<div class="b-footer">
  <a class="link" href="${option.index - 1}.html">上一章</a>
  <a class="link" href="${option.index + 1}.html">下一章</a>
</div>`
      }
    }

    let str = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="icon" type="image/x-icon" href="/img/favicon.ico">
  <title>${option.title}</title>
  <link rel="stylesheet" href="/css/global.css">
  <link rel="stylesheet" href="/css/novel.css">
  ${rels}
</head>
<body class="page-novel-chapter">
<article class="container blog">
<h1>${option.title}</h1>
${content}
${footers}
</article>
</body>
</html>`

    fs.mkdir(option.dest, _err => {
      if (!_err || _err.code === 'EEXIST') {
        fs.writeFile(`${option.dest}/${name}.html`, str, err2 => {
          if (err2) throw err2
        })
      }
    })
  })
}

module.exports = md

