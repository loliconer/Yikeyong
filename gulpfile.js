const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const changed = require('gulp-changed')
const clean = require('gulp-dest-clean')
const less = require('gulp-less')
const livereload = require('gulp-livereload')
const cached = require('gulp-cached')

gulp.task('build', () => {
  gulp.src('src/public/js/*.js')
    .pipe(changed('dist/public/js', {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest('dist/public/js'))

  gulp.src('src/public/js/vendor/*.js')
    .pipe(changed('dist/public/js/vendor'))
    .pipe(gulp.dest('dist/public/js/vendor'))

  gulp.src('src/public/css/*.css')
    .pipe(changed('dist/public/css', {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest('dist/public/css'))

  gulp.src('src/public/img/**/*')
    .pipe(changed('dist/public/img'))
    .pipe(gulp.dest('dist/public/img'))

  gulp.src('pages/**/*.html')
    .pipe(changed('dist/pages'))
    .pipe(gulp.dest('dist/pages'))
})

gulp.task('liveless', () => {
  gulp.src('src/public/less/*.less')
    .pipe(less({
      strictMath: "on"
    }))
    .pipe(cached('less'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/public/css'))
    .pipe(livereload())
})

gulp.task('less', () => {
  gulp.src('src/public/less/blog.less')
    .pipe(less({
      strictMath: "on"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/public/css'))
})

gulp.task('livejs', () => {
  gulp.src('src/public/js/*.js')
    .pipe(cached('js'))
    .pipe(livereload())
})

gulp.task('livehtml', () => {
  gulp.src('src/blog/**/*.html')
    .pipe(cached('html'))
    .pipe(livereload())
})

gulp.task('watch', () => {
  livereload.listen({
    start: true
  });
  gulp.watch('src/public/less/**/*.less', ['liveless'])
  gulp.watch('src/public/js/*.js', ['livejs'])
  gulp.watch('src/blog/**/*.html', ['livehtml'])
})

gulp.task('default', () => {
  gulp.start('watch')
})
