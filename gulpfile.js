const { watch, src, dest, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const config = {
   src: {
      js: [
         'node_modules/babel-polyfill/dist/polyfill.js',
         'src/**/*.js'
      ],
      scss: 'src/**/*.scss',
      fonts: 'src/fonts/*',
      images: 'src/images/*',
      html: 'src/*.html'
   },
   public: {
      base: 'public/',
      scripts: 'public/scripts',
      fonts: 'public/fonts',
      images: 'public/images'
   }
}

function jsTask(done) {
   src(config.src.js)
      .pipe(babel({
         presets: ['@babel/preset-env']
      }))
      .pipe(concat('main.bundle.js'))
      .pipe(uglify())
      .pipe(dest(config.public.scripts))
   done();
}

function cssTask(done) {
   src(config.src.scss)
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(rename({ suffix: '.bundle' }))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(dest(config.public.base))
   done();
}

function fontTask(done) {
   src(config.src.fonts)
      .pipe(dest(config.public.fonts))
   done();
}

function imagesTask(done) {
   src(config.src.images)
      .pipe(dest(config.public.images))
   done();
}

function htmlTask(done) {
   src(config.src.html)
      .pipe(dest(config.public.base))
   done();
}

function watchFiles() {
   watch(config.src.js, series(jsTask, reload));
   watch(config.src.scss, series(cssTask, reload));
   watch(config.src.fonts, series(fontTask, reload));
   watch(config.src.images, series(imagesTask, reload));
   watch(config.src.html, series(htmlTask, reload));
}

function liveReload(done) {
   browserSync.init({
      server: {
         baseDir: config.public.base
      },
   });
   done();
}

function reload(done) {
   browserSync.reload();
   done();
}

function cleanUp() {
   return del([config.public.base]);
}

exports.dev = parallel(jsTask, cssTask, fontTask, imagesTask, htmlTask, watchFiles, liveReload);
exports.build = series(cleanUp, parallel(jsTask, cssTask, fontTask, imagesTask, htmlTask));