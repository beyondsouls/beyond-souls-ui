const tasks = require("./index");
const config = require("../build");
const globalUIStreams = config.globals.map(asset => `./src/${asset}.{scss,css}`);
const componentUIStreams = config.components.map(
    component => `./src/${component}/${component}.{scss,css}`
);

exports = module.exports = (gulp, plugins, pkg) => {
    return () => {
        return gulp
            .src(globalUIStreams.concat(componentUIStreams))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass().on("error", plugins.sass.logError))
            .pipe(plugins.concat(`${pkg.build.name}.css`))
            .pipe(plugins.header(tasks.generateHeader("Beyond Souls UI", pkg)))
            .pipe(plugins.sourcemaps.write("."))
            .pipe(plugins.size())
            .pipe(gulp.dest(`${pkg.build.target}`));
    };
};
