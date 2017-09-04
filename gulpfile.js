const gulp = require("gulp");
const minifyCSS = require("gulp-clean-css");
const plugins = require("gulp-load-plugins")();
const pkg = require("./package.json");
const contents = require("./build.json");
const comment = `/**
 * Beyond Souls UI v${pkg.version}
 * Copyright 2017 Beyond Souls Records KLG
 * Released under the Apache License 2.0
 */\r\n`;

const streamedContents = contents.map(path => `./src/${path}.{scss,css}`);

gulp.task("build", function() {
    return gulp
        .src(streamedContents)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on("error", plugins.sass.logError))
        .pipe(plugins.concat(`${pkg.build.name}.css`))
        .pipe(plugins.header(comment + "\n"))
        .pipe(plugins.sourcemaps.write("."))
        .pipe(plugins.size())
        .pipe(gulp.dest(`${pkg.build.target}`));
});

gulp.task("minify", ["build"], function() {
    return gulp
        .src([`${pkg.build.target}/${pkg.build.name}.css`])
        .pipe(minifyCSS())
        .pipe(plugins.header(comment))
        .pipe(plugins.size())
        .pipe(
            plugins.size({
                gzip: true
            })
        )
        .pipe(plugins.concat(`${pkg.build.name}.min.css`))
        .pipe(gulp.dest(`${pkg.build.target}`));
});

gulp.task("watch", function() {
    gulp.watch(["src/*.{css,sass,scss}"], ["default"]);
});

gulp.task("default", ["build", "minify"]);
