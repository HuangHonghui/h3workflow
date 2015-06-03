var gulp = require('gulp');
var scss = require('gulp-scss');
var csso = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');

var scssSourcePath = "src/scss/*.scss",
    sourceMapPath = "./", // 相对与cssPath的路径
    cssPath = "dev/css";

gulp.task('default',function () {
	
});

// 开发时用
gulp.task("devscss", function () {
    gulp.src( scssSourcePath )
    .pipe( sourcemaps.init() )
    .pipe(scss(
        {
            "bundleExec": false
        }
    ))
    .pipe(sourcemaps.write( sourceMapPath ))
    .pipe(gulp.dest( cssPath ));
});

// 发布时用
gulp.task("pubscss", function () {
    gulp.src( scssSourcePath )
    .pipe(scss(
        {"bundleExec": false}
    )).pipe(
        csso()
    ).pipe(gulp.dest( cssPath ));
});