'use strict';

var gulp = require('gulp');
var critical = require('critical');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./*.scss', gulp.series('sass'));
  gulp.watch('./index.html', gulp.series('critical'));
});

gulp.task('copy', function (done) {
  gulp.src('./images/*.{jpg,svg}')
      .pipe(gulp.dest('./dist/images/'));
  done();
});

gulp.task('critical', gulp.series('sass', 'copy', function(done) {
  critical.generate({
      inline: true,
      src: 'index.html',
      css: ['dist/style.css'],
      dest: 'dist/index.html',
      minify: true,
      width: 320,
      height: 480
  });
  done()
}));

gulp.task('dev', gulp.series('sass:watch'));

gulp.task('default', gulp.series('critical'));