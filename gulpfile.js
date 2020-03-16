const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();


function css() {
  return gulp
    .src('./dev/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
      })
    )
    //.pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    notify: false
  });

  gulp.watch('dev/scss/**/*.scss', css);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
}

// eslint-disable-next-line node/exports-style
exports.default = gulp.series(serve, css);