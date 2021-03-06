const fs = require("fs");
const path = require("path");
const dot = require("dot");
const ncp = require("ncp");
const marked = require("marked");
const config = require("../build");
const tasks = require("./index");
const patternLibraryTemplate = fs.readFileSync(
    path.join(__dirname, "../utils/pattern-library-template.html"),
    "utf8"
);
const patternLibraryStreams = config.components.map(component => ({
    base: path.join(__dirname, `../src/${component}`),
    path: path.join(__dirname, `../src/${component}/${component}.html`),
    docs: path.join(`../src/${component}/README.md`),
    name: component
}));

exports = module.exports = (gulp, plugins, pkg, config) => {
    return done => {
        let contents = [];

        ncp(
            path.join(__dirname, "..", pkg.build.target),
            path.join(__dirname, "..", pkg.docs.target, "assets"),
            err => {}
        );

        patternLibraryStreams.forEach(pattern => {
            let fileContents;
            let docContents;
            let docData = {};

            try {
                if (fs.existsSync(pattern.path)) {
                    fileContents = fs.readFileSync(pattern.path, "utf8");
                }
                if (fs.existsSync(pattern.docs)) {
                    docContents = fs.readFileSync(pattern.docs, "utf8");
                }
                if (fs.existsSync(`${pattern.base}/data.json`)) {
                    docData = require(`${pattern.base}/data.json`, "utf8");
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

            if (fileContents) {
                const optimisticTemplate = dot.template(fileContents);
                fileContents = optimisticTemplate(docData);
            }

            contents.push({
                name: pattern.name,
                docs: optionalMarkdownDocs,
                example: fileContents ? fileContents.toString("utf8") : ""
            });
        });

        const compileView = dot.template(patternLibraryTemplate);

        fs.writeFile(
            path.join(__dirname, "..", `${pkg.docs.target}/pattern-library.html`),
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
    };
};
