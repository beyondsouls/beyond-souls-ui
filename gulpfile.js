const fs = require("fs");
const path = require("path");
const dot = require("dot");
const gulp = require("gulp");
const marked = require("marked");
const minifyCSS = require("gulp-clean-css");
const plugins = require("gulp-load-plugins")();
const pkg = require("./package.json");
const config = require("./build");
const comment = `/**
 * Beyond Souls UI v${pkg.version}
 * Copyright 2017 Beyond Souls Records KLG
 * Released under the Apache License 2.0
 */\r\n`;

const globalUIStreams = config.globals.map(asset => `./src/${asset}.{scss,css}`);
const componentUIStreams = config.components.map(
    component => `./src/${component}/${component}.{scss,css}`
);

gulp.task("build", () => {
    return gulp
        .src(globalUIStreams.concat(componentUIStreams))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on("error", plugins.sass.logError))
        .pipe(plugins.concat(`${pkg.build.name}.css`))
        .pipe(plugins.header(comment + "\n"))
        .pipe(plugins.sourcemaps.write("."))
        .pipe(plugins.size())
        .pipe(gulp.dest(`${pkg.build.target}`))
        .pipe(gulp.dest(`${pkg.docs.target}`));
});

gulp.task("minify", ["build"], () => {
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

gulp.task("watch", () => {
    gulp.watch(["src/**/*.{css,sass,scss}"], ["build-ui"]);
    gulp.watch(["src/**/*.{html,md}"], ["create-pattern-library"]);
});

const patternLibraryTemplate = fs.readFileSync("./utils/pattern-library-template.html", "utf8");
const patternLibraryStreams = config.components.map(component => ({
    path: `./src/${component}/${component}.html`,
    docs: `./src/${component}/README.md`,
    name: component
}));

gulp.task("create-pattern-library", ["build-ui"], done => {
    let contents = [];

    fs
        .createReadStream(`${pkg.build.target}/${pkg.build.name}.css`)
        .pipe(fs.createWriteStream(`${pkg.docs.target}/${pkg.build.name}.css`));

    patternLibraryStreams.forEach(pattern => {
        let fileContents;
        let docContents;

        try {
            if (fs.existsSync(pattern.path)) {
                fileContents = fs.readFileSync(pattern.path, "utf8");
            }
            if (fs.existsSync(pattern.docs)) {
                docContents = fs.readFileSync(pattern.docs, "utf8");
            }
        } catch (e) {
            plugins.util.log(`Failed reading pattern ${pattern.path}: ${e.stack || e}`);
        }

        let optionalMarkdownDocs = "";

        try {
            optionalMarkdownDocs = marked(docContents || "");
        } catch (e) {
            plugins.util.log(`Failed transpiling docs for ${pattern.name}: ${e.stack || e}`);
        }

        contents.push({
            name: pattern.name,
            docs: optionalMarkdownDocs,
            example: fileContents ? fileContents.toString("utf8") : ""
        });
    });

    const compileView = dot.template(patternLibraryTemplate);

    fs.writeFile(
        `${pkg.docs.target}/pattern-library.html`,
        compileView({
            version: pkg.version,
            patterns: contents,
            uiAsset: `${pkg.build.name}.css`
        }),
        "utf8",
        err => {
            plugins.util.log(`Create pattern library for ${contents.length} patterns`);
            done(err);
        }
    );
});

gulp.task("build-ui", ["build", "minify"]);
gulp.task("default", ["build-ui", "create-pattern-library"]);
