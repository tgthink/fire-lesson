var gulp = require("gulp"); 	//本地安装gulp所用到的地方
var autoprefixer = require("gulp-autoprefixer"); 	//自动处理浏览器前缀
var less = require("gulp-less");
var clean = require("gulp-clean");
var paths = {
	src_html: 				"src/**/*.html",
	src_less: 				"src/**/*.less",
	dist_url: 				"dist",
	dist_css: 				"dist/css",
};
gulp.task("style", function() {
	gulp.src([paths.src_less])
	.pipe(less())
	.pipe(autoprefixer('> 1%', 'IE 8'))
	.pipe(gulp.dest(paths.dist_url));
});
gulp.task("html", function() {
	gulp.src([paths.src_html])
	.pipe(gulp.dest(paths.dist_url));
});
gulp.task("default", ["clean"], function() {
	gulp.start(['html', 'style']);
});
gulp.task("clean", function() {
	return gulp.src([
		paths.dist_url
	], {read: false})
	.pipe(clean());
});
gulp.task("watch", function() {
	gulp.watch([paths.src_less], ['style']);
});

















