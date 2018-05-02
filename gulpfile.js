const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const changed = require('gulp-changed')
const clean = require('gulp-dest-clean')
const less = require('gulp-less')
const livereload = require('gulp-livereload')
const cached = require('gulp-cached')
const replace = require('gulp-replace')
const fs = require('fs')
const path = require('path')
const md = require('./src/js/lib/md.js')
const novels = require('./src/md-novel/novels')
const mdNovel = require('./src/js/lib/md-novel')

gulp.task('build', ['less', 'md', 'md-diy'], () => {
  gulp.src(['public/js/*.*', 'public/js/@(data)/*.*'])
    .pipe(changed('www/public/js', {
      hasChanged: changed.compareContents
    }))
    .pipe(gulp.dest('www/public/js'))

  gulp.src('public/js/vendor/*.js')
    .pipe(changed('www/public/js/vendor'))
    .pipe(gulp.dest('www/public/js/vendor'))

  gulp.src('public/css/*.css')
    .pipe(changed('www/public/css', {
      hasChanged: changed.compareContents
    }))
    .pipe(gulp.dest('www/public/css'))

  gulp.src('public/img/**/*')
    .pipe(changed('www/public/img'))
    .pipe(gulp.dest('www/public/img'))

  gulp.src('html/**/*')
    .pipe(clean('www/html', {
      force: true
    }))
    .pipe(replace(/js\/vendor\/(echarts|vue|three|yikeyong)\.js/g, 'js/vendor/$1.min.js'))
    .pipe(changed('www/html', {
      hasChanged: changed.compareContents
    }))
    .pipe(gulp.dest('www/html'))
})

gulp.task('less', () => {
  gulp.src('src/less/*.less')
    .pipe(less({
      strictMath: 'on'
    }))
    .pipe(cached('less'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'))
    .pipe(livereload())
})

gulp.task('js', () => {
  gulp.src('public/js/*.*')
    .pipe(cached('js'))
    .pipe(livereload())
})

gulp.task('html', () => {
  gulp.src(['html/**/*.*', '!html/novel/**/*.*', '!html/blog/**/*.*'])
    .pipe(cached('html'))
    .pipe(livereload())
})

gulp.task('md', () => {
  let srcPath = './src/md'

  let files = fs.readdirSync(srcPath)

  files.forEach(file => {
    md(path.resolve(`${srcPath}/${file}`), {
      dest: './html/blog/post'
    })
  })
})

gulp.task('md-diy', () => {
  let srcPath = './src/md-diy'

  let files = fs.readdirSync(srcPath)

  files.forEach(file => {
    md(path.resolve(`${srcPath}/${file}`), {
      dest: './html/article-diy',
      onlyContent: true
    })
  })
})

gulp.task('md-novel', () => {
  const {long, short} = novels

  short.forEach(n => {
    if (!n.value) return
    mdNovel(`./src/md-novel/short/${n.value}.md`, {
      dest: './html/novel/short',
      title: n.name
    })
  })

  long.forEach(n => {
    const len = n.chapters.length
    n.chapters.forEach((c, i) => {
      mdNovel(`./src/md-novel/${n.value}/${i+1}.md`, {
        dest: `./html/novel/${n.value}`,
        index: i + 1,
        title: c,
        first: i === 0,
        last: i === len - 1
      })
    })
  })
})

gulp.task('watch', ['less'], () => {
  livereload.listen({
    start: true
  })

  gulp.watch('src/less/**/*.less', ['less'])
  gulp.watch('src/md/*.md', ev => {
    md(ev.path, {
      dest: './html/blog/post'
    })
  })
  gulp.watch('public/js/*.*', ['js'])
  gulp.watch(['html/**/*.*', '!html/novel/**/*.*', '!html/blog/**/*.*'], ['html'])
})

gulp.task('default', () => gulp.start('watch'))
