
var fileConfig = require('./config.js');//外部配置文件名为config.js

var gulp = require("gulp"); 	//本地安装gulp所用到的地方
var autoprefixer = require("gulp-autoprefixer"); 	//自动处理浏览器前缀
var less = require("gulp-less");
var clean = require("gulp-clean");

var argv = require('yargs').argv;	//用于获取启动参数，针对不同参数，切换任务执行过程时需要

var oEnvironment = fileConfig.oEnvironment;
var source = oEnvironment.source;

var targetDirectory = "";//目标目录
if ( argv.p ) {
	targetDirectory = oEnvironment.production;
} else if ( argv.t ) {
	targetDirectory = oEnvironment.test;
} else {
	targetDirectory = oEnvironment.develop;
}
var paths = {
	src_html: 				source + "/**/*.html",
	src_less: 				source + "/**/*.less",
	dist_url: 				targetDirectory,
	dist_css: 				targetDirectory + "/css",
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

// 说明
gulp.task('help', function () {
	console.log('	gulp build			文件打包');
	console.log('	gulp watch			文件监控打包');
	console.log('	gulp help			gulp参数说明');
	console.log('	gulp clean			清理生成目录');
	//console.log('	gulp server			测试server');
	console.log('	gulp -p				正式环境（正式发布环境）');
	console.log('	gulp -t				测试环境（测试发布环境）');
	console.log('	gulp -d				开发环境（默认开发环境）');
	//console.log('	gulp -m <module>		部分模块打包（默认全部打包）');
});















