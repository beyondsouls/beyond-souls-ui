const path = require("path");
const rollup = require("rollup-stream");
const babel = require("rollup-plugin-babel");
const source = require("vinyl-source-stream");
const sourcemaps = require("rollup-plugin-sourcemaps");

exports = module.exports = (gulp, plugins, pkg) => {
    return () => {
        const config = {
            format: "umd",
            sourceMap: true,
            entry: path.join(__dirname, "../src/index.js"),
            plugins: [sourcemaps(), babel()]
        };

        return rollup(config)
            .pipe(source(`${pkg.build.name}.js`))
            .pipe(gulp.dest(path.join(__dirname, `../${pkg.build.target}`)));
    };
};
