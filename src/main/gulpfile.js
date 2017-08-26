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
    var target = gulp.src('webapp/index.html');

    var source = gulp.src(['webapp/src/**/*.js', 'webapp/src/**/*.css'], {read: false});

    return target.pipe(inject(source,{relative: true})).pipe(gulp.dest('webapp/'));
});



gulp.task('connect', function() {
    connect.server({
        root: 'webapp',
        livereload: true,
        port: 8081
    });
});

gulp.task('html', function () {
    gulp.src('./webapp/**/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./webapp/**/*.js')
        .pipe(connect.reload());
});


gulp.task('css', function () {
    gulp.src('./webapp/**/*.css')
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch(['./webapp/**/*.html'], ['html']);
    gulp.watch(['./webapp/**/*.js'], ['js']);
    gulp.watch(['./webapp/**/*.css'], ['css']);
});

gulp.task('default', ['connect', 'watch', 'index']);

