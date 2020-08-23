//Gulp modules
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

//Connecting css files
const cssFiles = [
    './src/css/main.css'
];
//Connecting js files
const jsFiles = [
    './src/js/main.js'
];

function styles() {
    //CSS file search pattern
    return gulp.src(cssFiles)
    //Combining files into one
        .pipe(concat('style.css'))
        //Prefixes
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //CSS minification
        .pipe(cleanCSS({
            level: 2
        }))
        //Output folder for styles
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}


function scripts() {
    //JCS file search pattern
    return gulp.src(jsFiles)
    //Combining files into one
        .pipe(concat('script.js'))
        //Output folder for styles
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

//Delete everything in the specified folder
function clean() {
    return del(['build/*'])
}

//View files
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //Monitor CSS files
    gulp.watch('./src/css/**/*.css', styles);
    //Monitor JS files
    gulp.watch('./src/js/**/*.js', scripts);
    //Start sync when HTML files change
    gulp.watch("./*.html").on('change', browserSync.reload);
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));
gulp.task('dev', gulp.series('build','watch'));
