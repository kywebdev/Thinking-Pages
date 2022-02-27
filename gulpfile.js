var gulp        = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var php         = require('gulp-connect-php');

// Static Server + watching scss/html files
gulp.task('php', function(){
    php.server({
        base: './app',
        port: 8010,
        keepalive: true
    });
});

gulp.task('serve',['php', 'sass'], function() {
    browserSync.init({
        proxy: "localhost:8010",
        baseDir: "./",
        open: true,
        notify: false
    });

    gulp.watch("app/scss/*/*.scss", ['sass']);
    gulp.watch("app/scss/*/*/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/*.php").on('change', browserSync.reload);
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
    gulp.watch("app/img/*").on('change', browserSync.reload);
    gulp.watch("app/fonts/*").on('change', browserSync.reload);
    gulp.watch("app/includes/*").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
gulp.task('start', ['serve']);