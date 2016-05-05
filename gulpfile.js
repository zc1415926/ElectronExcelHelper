/**
 * Created by zc1415926 on 2016/3/15.
 */
'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var electron = require('electron-prebuilt');
var gulpUtil = require('gulp-util');
var childProcess = require('child_process');
var electronConnect = require('electron-connect').server.create({path: './dist'});

var config = {
    path: {
        cssSrcDir: 'src/css',
        cssDistDir: 'dist/app/css',
        jsSrcDir:  'src/js',
        jsDistDir:  'dist/app/js',
        jsSrcFiles: 'src/js/**/*.js',
        fontDir: 'dist/app/fonts',
        indexJs: 'src/js/index.js'
    }
};


gulp.task('copyFrontLib', function(){
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest(config.path.cssDistDir));
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest(config.path.jsDistDir));
    gulp.src('node_modules/bootstrap/fonts/*')
        .pipe(gulp.dest(config.path.fontDir));
    gulp.src('src/main.js')
        .pipe(gulp.dest('dist/app/'));
    gulp.src('src/js/utils/tdRhjxxConverter.js')
        .pipe(gulp.dest('dist/app/js/utils/'));
    gulp.src('package.json')
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function(){
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/app/'));
});

gulp.task('js', function(){
    browserify(config.path.indexJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.path.jsDistDir + '/'));

    gulp.src('src/js/tdRhjxxConverter.js')
        .pipe(gulp.dest('dist/app/js/'));
});

gulp.task('css', function(){
    gulp.src(config.path.cssSrcDir + '/**/*.css')
        .pipe(gulp.dest(config.path.cssDistDir));
});

gulp.task('open', function(){

    var stdoutData = childProcess.spawn(electron, ['./dist', '--enable-logging']);

    stdoutData.stdout.on('data', function(data){
        gulpUtil.log(data.toString().replace('\n', ''));
    });

    stdoutData.on('exit', function(){
        //To stop the "watch" task by an error code.
        gulp.watch().close();
    });
});

gulp.task('watch', function(){
    gulp.watch(config.path.jsSrcFiles, ['js']);
    gulp.watch(config.path.cssSrcDir, ['css']);
});

gulp.task('watchWithConnect', function(){
    electronConnect.start();
    gulp.watch(config.path.jsSrcFiles, ['js']);
    gulp.watch(config.path.jsDistDir + '/**/*.js', electronConnect.reload);
});

gulp.task('connect', ['copyFrontLib', 'html', 'js', 'css', 'watchWithConnect'])

gulp.task('default', ['copyFrontLib', 'html', 'js', 'css', 'watch', 'open']);