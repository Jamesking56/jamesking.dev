var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    copy = require('gulp-copy'),
    minifyCss = require('gulp-minify-css'),
    paths = {
        scripts: [
            'js/**/*.js'
        ],
        styles: [
            'css/meflat-grass.css'
        ],
        jade: [
            'jade/index.jade'
        ],
        extras: [

        ],
        dist: './dist/'
    },
    clean = require('gulp-clean');

gulp.task('clean', function() {
    'use strict';

    return gulp.src(paths.dist + "*")
        .pipe(clean({ force: true }));
});

gulp.task('scripts', function() {
    'use strict';

    return gulp.src(paths.scripts)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('styles', function() {
    'use strict';

    return gulp.src(paths.styles)
        .pipe(concat('app.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('jade', function() {
    'use strict';

    return gulp.src(paths.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy', function() {
    'use strict';

    return gulp.src(paths.extras)
        .pipe(copy(paths.dist));
});

gulp.task('watch', function() {
    'use strict';

    //gulp.watch()
});

gulp.task('default', ['clean', 'scripts', 'styles', 'jade', 'copy']);