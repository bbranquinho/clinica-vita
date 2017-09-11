// http://github.com/AveVlad/gulp-connect
//https://www.npmjs.com/package/gulp-inject
//* npm install gulp
//* npm install gulp --save-dev
//* npm install gulp-conect --save-dev
//* npm install gulp-inject --save-dev



var gulp = require('gulp'),
    connect = require('gulp-connect'),
    inject = require('gulp-inject');

gulp.task('index', function () {
    var target = gulp.src("src/main/webapp/index.html");

    var source = gulp.src(['src/main/webapp/appsrc/**/*.js', 'src/main/webapp/appsrc/**/*.css'], {read: false});

    return target.pipe(inject(source, {relative: true})).pipe(gulp.dest('src/main/webapp/'));
});



gulp.task('connect', function() {
    connect.server({
        root: 'src/main/webapp/',
        livereload: true,
        port: 8081
    });
});

gulp.task('html', function () {
    gulp.src('src/main/webapp/**/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('src/main/webapp/**/*.js')
        .pipe(connect.reload());
});


gulp.task('css', function () {
    gulp.src('src/main/webapp/**/*.css')
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch(['src/main/webapp/**/*.html'], ['html']);
    gulp.watch(['src/main/webapp/**/*.js'], ['js']);
    gulp.watch(['src/main/webapp/**/*.css'], ['css']);
});

gulp.task('default', ['connect', 'watch', 'index']);

