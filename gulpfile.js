let project_folder = 'dist';
let source_folder = "src";

let fs = require('fs');

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/scss/style.scss",
		js: source_folder + "/js/script.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/*.ttf",
	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
	},
	clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require('gulp-sass')(require('sass')),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	webphtml = require('gulp-webp-html'),
	webp = require('imagemin-webp'),
	webpcss = require("gulp-webpcss"),
	svgSprite = require('gulp-svg-sprite'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter'),
	newer = require('gulp-newer'),
	webpack = require('webpack-stream');

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/",
			serveStaticOptions: {
                extensions: ["html"]
            }
		},
		port: 3000,
		notify: false
	});
}
function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}
function css() {
	return src(path.src.css)
		.pipe(
			scss({ outputStyle: 'expanded' }).on('error', scss.logError)
		)
		/* .pipe(
			group_media()
		) */
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(webpcss(
			{
				webpClass: "._webp",
				noWebpClass: "._no-webp"
			}
		))
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
		.on("end", browsersync.reload);
}
function js() {
	return gulp.src("./src/js/main.js")
      .pipe(webpack({
          mode: 'development',
          output: {
			filename: 'script.js'
          },
          watch: false,
          devtool: "source-map",
          module: {
              rules: [
                {
                  test: /\.m?js$/,
                  exclude: /(node_modules|bower_components)/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [['@babel/preset-env', {
                          debug: true,
                          corejs: 3,
                          useBuiltIns: "usage"
                      }]]
                    }
                  }
                }
              ]
            }
      }))
      .pipe(gulp.dest(project_folder))
      .on("end", browsersync.reload);
}
function images() {
	return src(path.src.img)
		.pipe(newer(path.build.img))
		.pipe(
			imagemin([
				webp({
					quality: 75
				})
			])
		)
		.pipe(
			rename({
				extname: ".webp"
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(newer(path.build.img))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest(path.build.img));
}

function copyFiles() {
	return src(source_folder + "/css/**/*.css")
	.pipe(dest(path.build.css));
}

function copyMailer() {
	src(source_folder + "/mailer/phpmailer/**/*.**")
	.pipe(dest(project_folder + '/phpmailer/'));
	return src(source_folder + "/mailer/smart.php")
	.pipe(dest(project_folder + '/'));

}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
}
function fonts_otf() {
	return src('./' + source_folder + '/fonts/*.otf')
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(gulp.dest('./' + source_folder + '/fonts/'));
}
gulp.task('svgSprite', function () {
	return gulp.src([source_folder + '/iconsprite/*.svg'])
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../icons/icons.svg",  //sprite file name
					example: true
				}
			},
		}
		))
		.pipe(dest(path.build.img));
});
function fontstyle() {
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
		fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		});
	}
	return src(path.src.html).pipe(browsersync.stream());
}


function cb() {}


function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.css], copyFiles, copyMailer);
}
function clean(params) {
	return del(path.clean);
}
let fontsBuild = gulp.series(fonts_otf, fonts, fontstyle);
let buildDev = gulp.series(clean, gulp.parallel(fontsBuild, html, css, js, images, copyFiles, copyMailer));
let watch = gulp.series(buildDev, gulp.parallel(watchFiles, browserSync));

exports.fonts = fontsBuild;
exports.watch = watch;
exports.default = watch;