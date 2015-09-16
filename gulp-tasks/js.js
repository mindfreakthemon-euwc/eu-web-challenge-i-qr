var gulp = require('gulp'),
	connect = require('gulp-connect'),
	changed = require('gulp-changed'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel');

gulp.task('js', function () {
	gulp.src('./app/js/**/*.js')
		.pipe(changed('./public/js', { extension: '.js' }))
		.pipe(rename(function (path) {
			path.extname = '.js';
		}))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel({
			modules: 'amd'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/js'))
		.pipe(connect.reload());
});