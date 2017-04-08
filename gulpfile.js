'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

// Gulp dependencies go here
gulp.task('default', () => {
	return gulp.src('src/js/es6/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('src/js/dist'));
});

gulp.task('sass', () => {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'));
});

gulp.task('watch', () => {
	gulp.watch('src/scss/**/*.scss', ['sass']);
});
