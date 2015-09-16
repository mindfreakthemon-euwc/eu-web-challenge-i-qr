var gulp = require('gulp');

require('require-dir')('./gulp-tasks');

gulp.task('assets', ['jade', 'stylus', 'js']);

gulp.task('watch', ['assets'], function () {
	gulp.watch(['./app/jade/**/*.jade'], ['jade']);
	gulp.watch(['./app/stylus/**/*.styl'], ['stylus']);
	gulp.watch(['./app/js/**/*.js'], ['js']);
});

gulp.task('test', ['lint']);
gulp.task('default', ['connect', 'watch']);