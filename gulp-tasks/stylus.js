var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	changed = require('gulp-changed');

gulp.task('stylus', function () {
	gulp.src('./app/stylus/**/*.styl')
		//.pipe(changed('./public/css', { extension: '.css' }))
		.pipe(stylus())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/css'))
		.pipe(connect.reload());
});