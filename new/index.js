const fs = require('fs')

let app = process.argv[2]
let name = app.split('/').join('-')

fs.readFile('new/html.html', 'utf8', (err, data) => {
  if (err) throw err

  data = data.replace('index.bundle.js', `${name}.bundle.js`)
  data = data.replace('style.css', `${name}.css`)

  fs.writeFile(`html/${app}.html`, data, err2 => {
    if (err2) throw err2
  })
})

fs.readFile('new/js.js', (err, data) => {
  if (err) throw err

  fs.writeFile(`src/js/${name}.js`, data, err2 => {
    if (err2) throw err2
  })
})

fs.readFile('new/less.less', 'utf8', (err, data) => {
  if (err) throw err

  fs.writeFile(`src/less/${name}.less`, data, err2 => {
    if (err2) throw err2
  })
})
