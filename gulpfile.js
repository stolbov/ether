var gulp = require('gulp');
var browserify = require('browserify');
var rename = require('gulp-rename');
var size = require('gulp-size');
//var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var reactify = require('reactify');

var tinylr = (require('tiny-lr'))();

var devPort = process.env.PORT || 4000;
var lrPort = devPort + 1;

gulp.task('scripts-debug', function () {
    var browserified = transform(function (filename) {
        var b = browserify(filename, {
            debug: true,
            extensions: ['.js', '.jsx']
        });
        b.transform(reactify);
        return b.bundle();
    });

    gulp.src('src/js/app.js')
        .pipe(browserified)
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(size({ showFiles: true }));
});


gulp.task('styles-debug', function () {
    gulp.src('src/styles/app.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(size({ showFiles: true }));
});


gulp.task('images-debug', function () {
    gulp.src('node_modules/leaflet/dist/images/**')
        .pipe(gulp.dest('build/images/leaflet/'));
    gulp.src('node_modules/leaflet-draw/dist/images/**')
        .pipe(gulp.dest('build/css/images/'));
    gulp.src('src/images/**')
        .pipe(gulp.dest('build/images'));
});

gulp.task('fonts-debug', function () {
    gulp.src('node_modules/bootstrap/dist/fonts/**')
        .pipe(gulp.dest('build/fonts'));
});

var jsSources = ['*.js', 'lib/**/*.js', 'src/js/**/*.js'];

gulp.task('jscs', function () {
    return gulp.src(jsSources)
        .pipe(jscs());
});

gulp.task('jshint', function () {
    gulp.src(jsSources)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('server-debug', function () {
    var express = require('express');
    var app = express();
    app.set('view engine', 'jade');
    app.get('/', function (req, res, next) {
        res.render('index');
    });
    app.use(express.static('build/'));
    app.listen(devPort);
    console.log('Dev server listening on port', devPort);
});

gulp.task('livereload', function () {
    tinylr.listen(lrPort);
    console.log('Livereload listening on port', lrPort);
});

gulp.task('lint', ['jshint']);

gulp.task('watch', function () {
    gulp.watch('src/js/**', ['lint', 'scripts']);
    gulp.watch('build/**', notifyLiveReload);
});

gulp.task('images-production', ['images-debug']);
gulp.task('fonts-production', ['fonts-debug']);

gulp.task('build-debug',
    [
        'lint',
        'scripts-debug',
        'styles-debug',
        'images-debug',
        'fonts-debug',
        'server-debug'
    ]
);
gulp.task('build', ['build-debug']);


gulp.task('build-right', function () {
    if (process.env.NODE_ENV === 'production') {
        gulp.run('dist');
    } else {
        gulp.run('build');
    }
});

gulp.task('default', ['build-debug', 'server-debug', 'livereload', 'watch']);

function notifyLiveReload (event) {
    var fileName = require('path').relative(__dirname, event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}
