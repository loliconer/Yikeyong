var gulp = require( 'gulp' );
var uglify = require( 'gulp-uglify' );
var minifyCss = require( 'gulp-minify-css' );
var changed = require( 'gulp-changed' );
var clean = require( 'gulp-dest-clean' );
var less = require( 'gulp-less' );
var livereload = require( 'gulp-livereload' );
var modified = require( 'gulp-modified' );

gulp.task('build',function () {
	gulp.src('src/public/js/*.js')
        .pipe(changed('dist/public/js'))
        .pipe(gulp.dest('dist/public/js'));
    
    gulp.src('src/public/css/*.css')
        .pipe(changed('dist/public/css'))
        .pipe(gulp.dest('dist/public/css'));
    
    gulp.src('public/img/**/*')
        .pipe(clean('dist/public/img'))
        .pipe(changed('dist/public/img'))
        .pipe(gulp.dest('dist/public/img'));
});

gulp.task( 'liveless', function () {
    gulp.src( 'src/public/less/*.less' )
        // .pipe( modified( 'less' ) )
        .pipe( less() )
        // .pipe( minifyCss() )
        .pipe( gulp.dest( 'src/public/css' ) )
        // .pipe( livereload() );
} );

gulp.task( 'livejs', function () {
    gulp.src( 'src/public/js/*.js' )
        .pipe( modified( 'js' ) )
        .pipe( livereload() );
} );

gulp.task( 'watch', function () {
    livereload.listen( {
        start: true
    } );
    gulp.watch( 'src/public/less/**/*.less', [ 'liveless' ] );
    gulp.watch( 'src/public/js/*.js', [ 'livejs' ] );
} );

gulp.task( 'default', function () {
    gulp.start( 'watch' );
} );