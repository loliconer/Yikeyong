const fs = require('fs')
const path = require('path')
const md = require('./src/js/lib/md.js')
const novels = require('./src/md-novel/novels')
const mdNovel = require('./src/js/lib/md-novel')

const {long, short} = novels

short.forEach(n => {
  if (!n.value) return
  mdNovel(`./src/md-novel/short/${n.value}.md`, {
    dest: './html/novels/short',
    title: n.name
  })
})

long.forEach(n => {
  const len = n.chapters.length
  n.chapters.forEach((c, i) => {
    mdNovel(`./src/md-novel/${n.value}/${i+1}.md`, {
      dest: `./html/novels/${n.value}`,
      index: i + 1,
      title: c,
      first: i === 0,
      last: i === len - 1
    })
  })
})
