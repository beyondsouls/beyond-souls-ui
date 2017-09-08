const path = require("path");
const ncp = require("ncp");

exports = module.exports = (gulp, plugins, pkg, config) => {
    return done => {
        ncp(
            path.join(__dirname, "..", "assets/beyond-souls-icons/fonts"),
            path.join(__dirname, "..", pkg.build.target, "fonts"),
            done
        );
    };
};
