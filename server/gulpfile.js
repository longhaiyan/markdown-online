const gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    lint = require('gulp-eslint'),
    nodemon = require('gulp-nodemon');

function lintFiles(files) {
    return gulp.src(files)
        .pipe(lint())
        .pipe(lint.format());
        // .pipe(lint.failAfterError())
}

gulp.task('eslint', () => {return lintFiles(['**/*.js', '!node_modules/**']);});


gulp.task('eslint_nodemon', ['eslint'], () => {
    return nodemon({
        script: './app/server.js',
        tasks(changedFiles) {
            lintFiles(changedFiles);
            return [];
        },
        ignore: ['build/**', 'dist/**', '.git', 'node_modules/**']
    });
});

gulp.task('default', ['eslint_nodemon']);

gulp.task('script', () => {
    gulp.src(['src/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', ['script']);
});

gulp.task('default', ['script'], () => {
    gulp.start('watch');
});

gulp.task('build', ['script']);
