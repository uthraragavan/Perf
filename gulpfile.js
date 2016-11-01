

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    eslint = require('gulp-eslint'),
    concat = require('gulp-concat');
    imagemin = require('gulp-imagemin'),
    gm = require('gulp-gm'),
    imageresize = require('gulp-image-resize'),
    htmlmin = require('gulp-htmlmin');

var browserSync = require('browser-sync').create();
var ngrok = require('ngrok');
var psi = require('psi');
var sequence = require('run-sequence');
var site = '';
var portVal   = 3020;

gulp.task('app-1', function() {
    gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename({
            extname: ".html"}))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init ({
     server: {
        baseDir: "./dist"
        }
    });
    gulp.watch('./src/*.html').on('change', function() {
        gulp.run('app-1');
        browserSync.reload();
        });
    gulp.watch('./src/views/*.html').on('change', function() {
        gulp.run('app-2');
        browserSync.reload();
        });
    gulp.watch('./src/js/*.js').on('change', function() {
        gulp.run('scripts-1');
        browserSync.reload();
        });
    gulp.watch('./src/views/js/*.js').on('change', function() {
        gulp.run('scripts-2');
        browserSync.reload();
        });
    gulp.watch('./src/css/*.css').on('change', function() {
        gulp.run('styles-1');
        browserSync.reload();
        });
    gulp.watch('./src/views/css/*.css').on('change', function() {
        gulp.run('styles-2');
        browserSync.reload();
        });
    gulp.watch('./src/img/*.*').on('change', function() {
        gulp.run('images-1');
        browserSync.reload();
        });
    gulp.watch('./src/views/images/*.*').on('change', function() {
        gulp.run('images-2');
        browserSync.reload();
        });


});

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(3000, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});


gulp.task('webhost', function (cb) {
  return sequence(
    'browser-sync',
    'ngrok-url',
    cb
  );
});





gulp.task('app-2', function() {
    gulp.src('./src/views/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename({
            dirname: "views",
            extname: ".html"}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts-1', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            dirname: "js",
            //suffix: "-min",
            extname: ".js"}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts-2', function() {
    gulp.src('./src/views/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            dirname: "views/js",
            //suffix: "-min",
            extname: ".js"}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('styles-1', function() {
    gulp.src('./src/css/*.css')
        .pipe(cleanCSS())
        .pipe(rename({
            dirname: "css",
            //suffix: "-min",
            extname: ".css"}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('styles-2', function() {
    gulp.src('./src/views/css/*.css')
        .pipe(cleanCSS())
        .pipe(rename({
            dirname: "views/css",
            //suffix: "-min",
            extname: ".css"}))
        .pipe(gulp.dest('./dist'));
});


gulp.task('images-1', function() {
    gulp.src('./src/img/*.*')
        .pipe(imagemin())
        .pipe(rename({
            dirname: "img"
            //suffix: "-min"
        }))
        .pipe(gulp.dest('./dist'));
});
gulp.task('images-2', function() {
    gulp.src('./src/views/images/*.*')
        .pipe(imagemin())
        .pipe(rename({
            dirname: "views/images"
            //suffix: "-min"
        }))
        .pipe(gulp.dest('./dist'));
});


gulp.task('minify', function (cb) {
  return sequence(
    'app-1',
    'app-2',
    'scripts-1',
    'scripts-2',
    'styles-1',
    'styles-2',
    'images-1',
    'images-2',
    cb
  );
});
gulp.task('script-concat-min', function() {
    gulp.src('js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('image-min-1',function() {
    gulp.src('./views/images/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./views/images'))
});
gulp.task('image-min-2',function() {
    gulp.src('./img/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./img'))
});

gulp.task('img-resize',function() {
    gulp.src('./src/views/images/pizzeria.jpg')
    .pipe(imageresize({
        width: 360,
        height: 270,
        crop: true,
        upscale: false
    }))
    .pipe(rename({
            dirname: "views/images"
            //suffix: "-thumb"
        }))
    .pipe(gulp.dest('./src'));
});

gulp.task('default', ['webhost']);

//test function to rename
gulp.task('rename', function() {
    gulp.src('./test/txt/*.txt')
    .pipe(rename({
    dirname: "txt",
    prefix: "bonjour-",
    suffix: "-hola",
    extname: ".txt"}))
    .pipe(gulp.dest('./dist'));

});
gulp.task('hello', function() {
    console.log('Hello World');
});

gulp.task('robot', function() {
    console.log('I AM A ROBOT');
});

gulp.task('sass', function () {
     gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});
gulp.task('lint', function() {
    gulp.src('js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('css/**/*.css', ['styles']);
});

gulp.task('psi-desktop', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'desktop'
  }, cb);
});

gulp.task('psi-mobile', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'mobile'
  }, cb);
});
