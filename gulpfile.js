'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');

// Gulp dependencies go here
gulp.task('default', () => {
	return gulp.src('assets/src/js/**/**')
		.pipe(babel({
			presets: ['es2015'],
			presets: ['react']
		}))
		.pipe(gulp.dest('assets/dist/js'));
});

gulp.task('watch', () => {
	gulp.watch('assets/src/scss/**/*.scss', ['sass']);
});

gulp.task('sass', () => {
	return gulp.src('assets/src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/dist/css'));
});

gulp.task('img', function() {
	return gulp.src('assets/src/img/*')
		.pipe(imagemin({ progressive: true }))
		.pipe(gulp.dest('assets/dist/img'));
});
