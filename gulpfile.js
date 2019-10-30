var gulp = require('gulp'),
    concat = require('gulp-concat'),
    pug = require('gulp-pug'),
    copy = require('gulp-copy'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    environments = require('gulp-environments'),
    development = environments.development,
    production = environments.production,
    paths = {
        scripts: [
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/bootstrap/dist/js/bootstrap.js",
            "node_modules/jquery.easing/jquery.easing.min.js",
            "*js/jquery.scrollto.js",
            "*js/jquery.fittext.js",
            "*js/jquery.flexslider.min.js",
            "*js/jquery.masonry.js",
            "*js/waypoints.min.js",
            "*js/jquery.label_better.min.js",
            "*js/contact.js",
            "*js/meflat.js"
        ],
        styles: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            '*css/font-awesome.min.css',
            '*css/flexslider.css',
            '*css/meflat-light-green.css',
            '*css/overrides.css'
        ],
        pug: [
            'pug/index.pug'
        ],
        extras: [
            '*fonts/*',
            'assets/imac.png',
            'assets/loader.gif',
            'assets/placeholder-450x270.jpg',
            'assets/robots.txt',
            'assets/sitemap.xml',
            'js/libs/modernizr.min.js'
        ],
        dist: './dist/'
    };

if (production()) {
    paths.extras.push('assets/.htaccess');
}

var config = {
    gravatar: "https://gravatar.com/avatar/18272084a145b66c6b118b38a2fe7c23"
};

gulp.task('scripts', function() {
    'use strict';

    return gulp.src(paths.scripts)
        .pipe(concat('app.min.js'))
        .pipe(production(uglify()))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('styles', function() {
    'use strict';

    return gulp.src(paths.styles)
        .pipe(concat('app.min.css'))
        .pipe(production(cleanCss()))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('pug', function() {
    'use strict';

    return gulp.src(paths.pug)
        .pipe(pug({
            pretty: development(),
            locals: config
        }))
        .pipe(gulp.dest(paths.dist));
})

gulp.task('copy', function() {
    'use strict';

    return gulp.src(paths.extras)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('default', gulp.series(['copy', 'scripts', 'styles', 'pug']));