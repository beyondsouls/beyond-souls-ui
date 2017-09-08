const gulp = require("gulp");
const tasks = require("./tasks");

gulp.task("build-css", tasks.load("build-css"));
gulp.task("build-js", tasks.load("build-js"));
gulp.task("minify-css", ["build-css"], tasks.load("minify-css"));
gulp.task("minify-js", ["build-js"], tasks.load("minify-js"));
gulp.task("copy-assets", tasks.load("copy-assets"));
gulp.task("build", ["copy-assets", "minify-css", "minify-js"]);

gulp.task("create-pattern-library", ["build"], tasks.load("create-pattern-library"));
gulp.task("watch", tasks.load("watch"));

gulp.task("default", ["build", "create-pattern-library"]);
