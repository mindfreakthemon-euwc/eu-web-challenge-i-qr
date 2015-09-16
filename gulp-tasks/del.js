var gulp = require('gulp'),
	del = require('del');

gulp.task('clean', function (callback) {
	del([
		'./public/css',
		'./public/js',
		'./public/html',
		'./public/templates.js'
	], callback);
});