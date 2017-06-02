var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

// browser-sync task for starting the server.

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers

gulp.task('browser-sync', function() {
  var files = ['./dev/style.css','./dev/*.php', './dev/**/*.php', './dev/js/*.js'];

  //initialize browsersync
  browserSync.init(files, {
    //browsersync with a php server
    proxy: {
      target: "localhost:8888/child-testing",
      proxyRes: [function(res) {
          res.headers["Expires"] = "0";
          res.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
          res.headers["Pragma"] = "no-cache";
        }
      ]
    }

  });
});

// gulp dev tasks

gulp.task('sass', function() {
  return gulp.src('./dev/sass/*.scss')
  .pipe(sass({
    style: 'compressed',
    includePaths: './node_modules/bootstrap-sass/assets/stylesheets'
  }))
  .pipe(autoprefixer())
  .pipe(rename('style.css'))
  .pipe(gulp.dest('./dev'))
  .pipe(reload({stream: true}));
});

// Default task to be run with `gulp`

gulp.task('default', [
  'sass', 'browser-sync'
], function() {
  gulp.watch("./dev/sass/**/*.scss", ['sass']);
  gulp.watch('./dev/**/*.php').on('change', browserSync.reload);

});

//  ============================================== //

// gulp tasks for prodction build

// gulp.task('sass-prod', function() {
//   return gulp.src('./sass/*.scss')
//   .pipe(sass({
//     includePaths: './node_modules/bootstrap-sass/assets/stylesheets'
//   }))
//   .pipe(autoprefixer())
//   .pipe(rename('style.css'))
//   .pipe(gulp.dest('./dist'))
// });
//
// // moving files to dist folder
//
// gulp.task('dist-php-files', function(){
//   return gulp.src('./*')
//   .pipe(gulp.dest('./dist'))
// })
//
// gulp.task('dist-asset-files', function(){
//   return gulp.src('./assets/*.*')
//   .pipe(gulp.dest('./dist/content'))
// })
//
// gulp.task('dist-script-files', function() {
//   gulp.src('./js/*.js')
//   .pipe(gulp.dest('./dist/js'))
// });
//
// // gulp production build
//
// gulp.task('build', [
//   'sass-prod',
//   'dist-asset-files',
//   'dist-html-files',
//   'dist-script-files'
// ]);
