let gulp = require("gulp");
let browserify = require("browserify");
let source = require('vinyl-source-stream');
let gutil = require("gulp-util");
let es = require('event-stream');

// paths
var app_dist = "dist"
var paths = {
    pages: ['pages/*.html', 'css/*.css'],
    styles: ['css/*.css'],
    scripts: ["test/test.js"]
};

//common functions
function bundle(ified, bundleName, bundleDist) {
    return ified
        .bundle()
        .on("error", gutil.log)
        .pipe(source(bundleName))
        .pipe(gulp.dest(bundleDist));
}
var browserifyStream = browserify(paths.scripts);

gulp.task("copy-html-for-app", function () {
    let pages = gulp.src(paths.pages)
        .pipe(gulp.dest(app_dist));
    let styles = gulp.src(paths.styles)
        .pipe(gulp.dest("dist/css"));
    return es.concat([pages, styles]);
});

function bundleMain() {
    return bundle(browserifyStream, 'bundle.js', app_dist);
}

gulp.task("web-app", ["copy-html-for-app"], bundleMain);
gulp.task("default", ["web-app"]);