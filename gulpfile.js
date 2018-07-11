const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const changed = require('gulp-changed')
const clean = require('gulp-dest-clean')
const less = require('gulp-less')
const livereload = require('gulp-livereload')
const cached = require('gulp-cached')
const replace = require('gulp-replace')
const gzip = require('gulp-gzip')
const fs = require('fs')
const path = require('path')

const gzipOption = {
  threshold: '1kb',
  gzipOptions: {
    level: 9
  }
}

gulp.task('build', ['less'], () => {
  gulp.src(['public/js/*.*', 'public/js/@(data)/*.*'])
    .pipe(changed('www/public/js', {
      hasChanged: changed.compareContents
    }))
    .pipe(gulp.dest('www/public/js'))
    .pipe(gzip(gzipOption))
    .pipe(gulp.dest('www/public/js'))

  gulp.src('public/js/*.js.map')
    .pipe(changed('www/public/js', {
      hasChanged: changed.compareContents
    }))
    .pipe(gulp.dest('www/public/js'))
    .pipe(gzip(gzipOption))
    .pipe(gulp.dest('www/public/js'))

  gulp.src('public/js/vendor/*.js')
    .pipe(changed('www/public/js/vendor'))
    .pipe(gulp.dest('www/public/js/vendor'))
    .pipe(gzip(gzipOption))
    .pipe(gulp.dest('www/public/js/vendor'))

  gulp.src('public/css/*.css')
    .pipe(changed('www/public/css', {
      hasChanged: changed.compareContents
    }))
    .pipe(gulp.dest('www/public/css'))
    .pipe(gzip(gzipOption))
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
    .pipe(gzip(gzipOption))
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
  gulp.src(['html/**/*.*', '!html/novels/**/*.*', '!html/blog/**/*.*'])
    .pipe(cached('html'))
    .pipe(livereload())
})

gulp.task('watch', ['less'], () => {
  livereload.listen({
    start: true
  })

  gulp.watch('src/less/**/*.less', ['less'])
  gulp.watch('public/js/*.*', ['js'])
  gulp.watch(['html/**/*.*', '!html/novels/**/*.*', '!html/blog/**/*.*'], ['html'])
})

gulp.task('default', () => gulp.start('watch'))
