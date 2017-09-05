const gulp = require("gulp");
const tasks = require("./tasks");

gulp.task("build-css", tasks.load("build-css"));
gulp.task("build-js", tasks.load("build-js"));
gulp.task("minify-css", ["build-css"], tasks.load("minify-css"));
gulp.task("minify-js", ["build-js"], tasks.load("minify-js"));
gulp.task("build", ["minify-css", "minify-js"]);

gulp.task("create-pattern-library", ["build"], tasks.load("create-pattern-library"));
gulp.task("watch", tasks.load("watch"));

gulp.task("default", ["build-ui", "create-pattern-library"]);
