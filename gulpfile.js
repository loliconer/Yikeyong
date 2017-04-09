const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const changed = require('gulp-changed')
const clean = require('gulp-dest-clean')
const less = require('gulp-less')
const livereload = require('gulp-livereload')
const cached = require('gulp-cached')

gulp.task('build', () => {
  gulp.src('public/js/*.*')
    .pipe(changed('www/public/js', {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest('www/public/js'))

  gulp.src('public/css/*.css')
    .pipe(changed('www/public/css', {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest('www/public/css'))

  gulp.src('public/js/vendor/*.js')
    .pipe(changed('www/public/js/vendor'))
    .pipe(gulp.dest('www/public/js/vendor'))

  gulp.src('public/img/**/*')
    .pipe(changed('www/public/img'))
    .pipe(gulp.dest('www/public/img'))

  gulp.src('html/**/*')
    .pipe(clean('www/html', {
      force: true
    }))
    .pipe(replace(/js\/vendor\/(echarts|vue)\.js/g, 'js/vendor/$1.min.js'))
    .pipe(changed('www/html', {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest('www/html'))
})

gulp.task('less', () => {
  gulp.src('src/less/*.less')
    .pipe(less({
      strictMath: "on"
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
  gulp.src('html/**/*.html')
    .pipe(cached('html'))
    .pipe(livereload())
})

gulp.task('watch', () => {
  livereload.listen({
    start: true
  })

  gulp.watch('src/less/**/*.less', ['less'])
  gulp.watch('public/js/*.*', ['js'])
  gulp.watch('html/**/*.*', ['html'])
})

gulp.task('default', () => gulp.start('watch'))
