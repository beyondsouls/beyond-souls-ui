const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
plugins.cleanCSS = require("gulp-clean-css");
const pkg = require("../package.json");
const config = require("../build");

exports.load = task => {
    return require(`./${task}.js`)(gulp, plugins, pkg, config);
};

exports.generateHeader = (name, pkg) => {
    return `/**
    * ${name} v${pkg.version}
    * Copyright 2017 Beyond Souls Records KLG
    * Released under the Apache License 2.0
    */\r\n`;
};
