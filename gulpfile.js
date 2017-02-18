const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const babelify = require('babelify');

const dependencies = [
	'react',
  	'react-dom',
    'react-router'
];

let scriptsCount = 0;

gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('deploy', function (){
	bundleApp(true);
});

gulp.task('watch', function () {
	gulp.watch(['./src/js/**/*.js'], ['scripts']);
});

gulp.task('default', ['scripts','watch']);

function bundleApp(isProduction) {
	scriptsCount++;

	const appBundler = browserify({
    	entries: './src/js/app.js',
    	debug: true
  	})

  	if (!isProduction && scriptsCount === 1){
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest('./dist/js/'));
  	}
  	if (!isProduction){
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}

  	appBundler
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest('./dist/js/'));
}