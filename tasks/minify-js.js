const tasks = require("./index");

exports = module.exports = (gulp, plugins, pkg) => {
    return () => {
        return gulp
            .src([`${pkg.build.target}/${pkg.build.name}.js`])
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.cleanCSS())
            .pipe(plugins.header(tasks.generateHeader("Beyond Souls UI", pkg)))
            .pipe(plugins.size())
            .pipe(
                plugins.size({
                    gzip: true
                })
            )
            .pipe(plugins.concat(`${pkg.build.name}.min.js`))
            .pipe(plugins.sourcemaps.write("."))
            .pipe(gulp.dest(`${pkg.build.target}`));
    };
};
