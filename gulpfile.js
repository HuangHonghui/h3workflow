var gulp = require('gulp');
var scss = require('gulp-scss'); // 编译scss为css
var csso = require('gulp-csso'); // 压缩css
var uglify = require('gulp-uglify'); // 压缩js
var sourcemaps = require('gulp-sourcemaps'); // 生成sourcemaps

var scssSourcePath = "src/scss/*.scss",
    sourceMapPath = "./", // 相对于目标路径
    cssDevPath = "dev/css",
    cssPath = "dist/css",
    jsSourcePath = "src/scripts/**/*.js",
    jsDevPath = "dev/js",
    jsPath = "dist/js";

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
    .pipe(gulp.dest( cssDevPath ));
});
gulp.task("devjs", function () {
    gulp.src( jsSourcePath )
    .pipe( sourcemaps.init() )
    .pipe( uglify() )
    .pipe(sourcemaps.write( sourceMapPath ))
    .pipe(gulp.dest( jsDevPath ));
});
gulp.task('dev',["devscss","devjs"]);

// 发布时用
gulp.task("pubscss", function () {
    gulp.src( scssSourcePath )
    .pipe(scss(
        {"bundleExec": false}
    )).pipe(
        csso()
    ).pipe(gulp.dest( cssPath ));
});
gulp.task("pubjs", function () {
    gulp.src( jsSourcePath )
    .pipe( uglify() )
    .pipe(gulp.dest( jsPath ));
});
gulp.task('pub',["pubscss","pubjs"]);