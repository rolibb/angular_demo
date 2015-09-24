var gulp = require('gulp'),
  compass = require('gulp-compass'),
  path = require('path');

gulp.task('compass', function() {

	var src_css = path.join(__dirname + '/public', 'css');
	var src_temp = 'public/css';

	console.log("src_css: " + src_css);

  gulp.src('resource/scss/**/*.scss')
    .pipe(compass({
		css: 'public/css',
		sass: 'resource/scss',
		image: 'public/images'
    }))
    .pipe(gulp.dest(src_temp));
});


var minifyCss = require('gulp-minify-css');

gulp.task('minify-css', function() {

	var src_temp = 'public/css';

	return gulp.src('public/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(src_temp));
});
