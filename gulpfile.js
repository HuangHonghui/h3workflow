/**
 * Usage:
 * $ gulp devscss 编译并压缩scss
 * $ gulp devjs 复制js到目标路径
 * $ gulp dev 同时执行上面2个任务
 * ============================
 * $ gulp pubscss 编译并压缩scss
 * $ gulp pubjs 复制并压缩js到目标路径
 * $ gulp concatjs 合并压缩指定js
 * $ gulp pub 同时执行上面2个任务
 */

var gulp = require('gulp');
var scss = require('gulp-scss'); // 编译scss为css
var csso = require('gulp-csso'); // 压缩css
var uglify = require('gulp-uglify'); // 压缩js
var sourcemaps = require('gulp-sourcemaps'); // 生成sourcemaps
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

var scssSourcePath = "src/scss/*.scss",
    sourceMapPath = "./", // 相对于目标路径
    cssDevPath = "dev/css",
    cssPath = "dist/css",
    jsSourcePath = "src/scripts/**/*.js",
    jsDevPath = "dev/js",
    jsPath = "dist/js";
    
    // 配置合并的文件顺序，目标路径，文件名等
    // 如果为空则只压缩文件
var jsArray = [
    {
        pathArray:['src/scripts/plugins.js','src/scripts/main.js'],
        newFileName:"all.js",
        targetPath:jsPath
    },
    {
        pathArray:jsSourcePath,
        newFileName:"good.js",
        targetPath:jsPath
    }
];

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
    .pipe(autoprefixer())
    .pipe(sourcemaps.write( sourceMapPath ))
    .pipe(gulp.dest( cssDevPath ));
});
gulp.task("devjs", function () {
    gulp.src( jsSourcePath )
//    .pipe( sourcemaps.init() )
//    .pipe( uglify() )
//    .pipe( rename(function (path) {
//        path.basename += ".min";
//    }) )
//    .pipe(sourcemaps.write( sourceMapPath ))
    .pipe(gulp.dest( jsDevPath ));
});
gulp.task('dev',["devscss","devjs"]);

// 发布时用
gulp.task("pubscss", function () {
    gulp.src( scssSourcePath )
    .pipe(scss(
        {"bundleExec": false}
    ))
    .pipe(autoprefixer())
    .pipe(
        csso()
    )
    .pipe( rename(function (path) {
        path.basename += ".min";
    }) )
    .pipe(gulp.dest( cssPath ));
});

// 合并js的方法
function concatJs(obj) {
    gulp.src( obj.pathArray )
    .pipe( concat( obj.newFileName ) )
    .pipe( sourcemaps.init() )
    .pipe( uglify() )
    .pipe( rename(function (path) {
        path.basename += ".min";
    }) )
    .pipe(sourcemaps.write( sourceMapPath ))
    .pipe(gulp.dest( obj.targetPath ));
}

gulp.task("concatjs", function () {
    if(jsArray && jsArray.length>0){
        jsArray.map(concatJs);
    }
});

gulp.task("pubjs", function () {
    gulp.src( jsSourcePath )
        .pipe(gulp.dest( jsPath ))
        .pipe( uglify() )
        .pipe( rename(function (path) {
            path.basename += ".min";
        }) )
        .pipe(gulp.dest( jsPath ));
});


gulp.task('pub',["pubscss","pubjs","concatjs"]);