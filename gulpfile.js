'use strict';

var gulp = require('gulp');
var critical = require('critical');
var sass = require('gulp-sass');

gulp.task('default', defaultTask);

function defaultTask(done) {
  // place code for your default task here
  critical.generate({
        inline: true,
        src: 'index.html',
        css: ['dist/style.css'],
        dest: 'dist/index.html',
        minify: true,
        width: 320,
        height: 480
    });
  done();
}
 
gulp.task('sass', function () {
  return gulp.src('./*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./*.scss', gulp.series('sass'));
});