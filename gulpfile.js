var gulp = require('gulp');
var scss = require('gulp-scss');
var csso = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default',function () {
	
});

// 开发时用
gulp.task("devscss", function () {
    gulp.src(
        "src/scss/*.scss"
    )
    .pipe(sourcemaps.init())
    .pipe(scss(
        {
            "bundleExec": false
        }
    ))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dev/css"));
});

// 发布时用
gulp.task("pubscss", function () {
    gulp.src(
        "src/scss/*.scss"
    ).pipe(scss(
        {"bundleExec": false}
    )).pipe(
        csso()
    ).pipe(gulp.dest("dist/css"));
});