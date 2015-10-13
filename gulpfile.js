var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    copy = require('gulp-copy'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    environments = require('gulp-environments'),
    development = environments.development,
    production = environments.production,
    paths = {
        scripts: [
            "*js/libs/jquery-1.9.1.min.js",
            "*js/libs/bootstrap.min.js",
            "*js/jquery.easing.1.3.min.js",
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
            '*css/bootstrap.min.css',
            '*css/font-awesome.min.css',
            '*css/flexslider.css',
            '*css/meflat-light-green.css',
            '*css/overrides.css'
        ],
        jade: [
            'jade/index.jade'
        ],
        extras: [
            'contact.php',
            '*fonts/*',
            'assets/imac.png',
            'assets/loader.gif',
            'assets/placeholder-450x270.jpg',
            'assets/robots.txt',
            'assets/sitemap.xml',
            'js/libs/modernizr.min.js',
            production() ? 'assets/.htaccess' : 'none'
        ],
        dist: './dist/'
    };

var config = {
    gravatar: "//gravatar.com/avatar/18272084a145b66c6b118b38a2fe7c23",
    trustpilot: {
        enabled: false, // Disabled until I have some reviews.
        script: "//widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js",
        templateId: "5419b6a8b0d04a076446a9ad",
        businessId: "560a7f0d0000ff000583d56a",
        url: "https://uk.trustpilot.com/review/jamesking56.uk"
    },
    ga: {
        enabled: production(),
        code: "UA-3000159-38"
    }
};

console.log(production(), development());

gulp.task('clean', function() {
    'use strict';

    return gulp.src([])
        .pipe(clean({ force: true }));
});

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
        .pipe(production(minifyCss()))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('jade', function() {
    'use strict';

    return gulp.src(paths.jade)
        .pipe(jade({
            pretty: development(),
            locals: config
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy', function() {
    'use strict';

    return gulp.src(paths.extras)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['clean', 'copy', 'scripts', 'styles', 'jade']);