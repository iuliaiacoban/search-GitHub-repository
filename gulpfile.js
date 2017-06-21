var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpSourcemaps  = require("gulp-sourcemaps"),
    livereload = require('gulp-livereload'),
    connect = require("gulp-connect"),
    cleanCSS = require("gulp-clean-css"),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sprite = require('gulp-sprite-generator');

var path = {
    HTML: './src/*.html',
    SASS: './src/scss/style.scss',
    JS: './src/js/main.js',
    IMG: './src/images/icons/*',
    FONT: './src/fonts/*',
    DEST: './www/',
    DEST_JS: './www/js',
    DEST_CSS: './www/css',
    DEST_IMG: './www/images/',
    DEST_FONT: './www/fonts/'
};

gulp.task('css', function() {
    return gulp.src(path.SASS)
        .pipe(gulpSourcemaps.init())
        .pipe(sass())
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(path.DEST_CSS))
        .pipe(cleanCSS())
        // .pipe(livereload())
        .pipe(connect.reload());
});

gulp.task('cleanCSS', function () {
    gulp.src('./www/css/style.css')
        .pipe(cleanCSS({keepBreaks: true}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('www/css'))
    ;
});

gulp.task('copyHtmlFiles', function () {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST))
        .pipe(connect.reload());
});

gulp.task('copyImgFiles', function () {
    return gulp.src(path.IMG)
        .pipe(gulp.dest(path.DEST_IMG))
        .pipe(connect.reload());
});

gulp.task('copyJsFiles', function () {
    return gulp.src(path.JS)
        .pipe(gulp.dest(path.DEST_JS))
        .pipe(connect.reload());
});

gulp.task('copyFontFiles', function () {
    return gulp.src(path.FONT)
        .pipe(gulp.dest(path.DEST_FONT))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('watch', function() {
    var server = livereload();
    gulp.watch(path.SASS, ['css']);
    gulp.watch(path.IMG, ['copyImgFiles']);
    gulp.watch(path.IMG, ['copyImgFiles']);
    gulp.watch(path.JS, ['copyJsFiles']);
    livereload.listen();
});

gulp.task('default', ["watch", "connect", "css", "cleanCSS", "copyImgFiles", "copyFontFiles", "copyJsFiles", "copyHtmlFiles"]);
