const fs = require('fs')
const path = require('path')
const md = require('./src/js/lib/md.js')

function generateIndex(content) {
  const index = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!--#include file="/common/head.html"-->
  <title>亦可用的博客</title>
  <meta property="og:type" content="website">
  <meta property="og:title" content="亦可用">
  <meta property="og:url" content="https://www.yikeyong.com">
  <meta property="og:site_name" content="亦可用">
  <meta property="og:locale" content="default">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="亦可用">
</head>
<body class="page-blog">
<!--#include file="/common/nav.html"-->

<div class="container">
  <div class="left">

    <div class="block-posts">
${content}
    </div>
  </div>
</div>

<!--#include file="/common/footer.html"-->
</body>
</html>
`

  fs.writeFile('./html/blog/index.html', index, err2 => {
    if (err2) throw err2
  })
}

async function generate() {
  let srcPath = './src/md'

  let files = fs.readdirSync(srcPath)
  
  let posts = ''

  for (let i = files.length - 1; i >= 0; i--) {
    const metadata = await md(path.resolve(`${srcPath}/${files[i]}`), {
      dest: './html/blog/post',
      sort: true
    })
  
    posts += `<div class="post">
  <div class="p-title">
    <a href="/blog/post/${path.basename(files[i], '.md').substring(5)}.html" target="_blank">${metadata.title}</a>
  </div>
  <div class="p-info">
    <span>创建日期：${metadata.date.split('/').join('-')}</span>
  </div>
  <div class="p-intro">
    <p>${metadata.intro}</p>
  </div>
</div>
`
    if (i <= 0) generateIndex(posts)
  }
}

generate()