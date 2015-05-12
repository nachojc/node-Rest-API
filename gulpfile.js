(function () {

    var gulp = require('gulp'),
        map = require("map-stream"),
        args = require('yargs').argv,
        isProduction,
        plugins = require('gulp-load-plugins')(); // load plugins from package.json

    global.errorMessage = '';
    isProduction = args.env === 'production';
    // functions

// Does pretty printing of sass errors
    function checkErrors(obj) {
        function checkErrors(file, callback) {
            if (file.path.indexOf('.scss') != -1) {
                file.contents = new Buffer("\
					body * { white-space:pre; }\
					body * { display: none!important; }\
					body:before {\
						white-space:pre;\
						content: '" + global.errorMessage.replace(/(\\)/gm, "/").replace(/(\r\n|\n|\r)/gm, "\\A") + "';\
					}\
					html{background:#ccf!important; }\
				");
            }
            callback(null, file);
        }

        return map(checkErrors);
    }


    // Lint Task
    gulp.task('lint', function () {
        return gulp.src('js/*.js')
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'));
    });

    // Compile Our Sass
    gulp.task('sass', function () {
        return gulp.src('scss/*.scss')
            .pipe(plugins.sass())
            .pipe(checkErrors())
            .pipe(gulp.dest('css'));
    });

// Concatenate & Minify JS
    gulp.task('scripts', function () {
        return gulp.src('js/*.js')
            .pipe(plugins.if(isProduction, plugins.concat('all.js')))
            .pipe(gulp.dest('dist'))
            .pipe(plugins.rename('all.min.js'))
            .pipe(plugins.if(isProduction, plugins.uglify()))
            .pipe(gulp.dest('dist'));
    });
    gulp.task('server', function () {
        //console.log("Enviroment: " +(isProduction ? 'production':args.env ));


        plugins.express.run(['./express/app.js']);
//    gulp.watch(path.js, ['js-min']);

    });
// Watch Files For Changes
    gulp.task('watch', function () {
        gulp.watch('js/*.js', ['lint', 'scripts']);
        gulp.watch('scss/*.scss', ['sass']);
    });

// Default Task
    gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'server']);
    gulp.task('serv', [ 'server']);

}());

