exports = module.exports = gulp => {
    return () => {
        gulp.watch(["src/**/*.{css,sass,scss}"], ["build-css", "minify-css"]);
        gulp.watch(["src/**/*.{js}"], ["build-js", "minify-js"]);
        gulp.watch(["src/**/*.{html,md}"], ["create-pattern-library"]);
    };
};
