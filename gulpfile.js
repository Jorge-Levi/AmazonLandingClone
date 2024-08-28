const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Tarea para minificar y agrupar JavaScript
gulp.task('scripts', function() {
    return gulp.src('js/**/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());  // Recargar navegador
});

// Tarea para minificar y agrupar CSS
gulp.task('styles', function() {
    return gulp.src('css/**/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());  // Recargar navegador
});

// Tarea para servir el proyecto con BrowserSync
gulp.task('serve', function() {
    browserSync.init({
        server: "./", // Carpeta raíz para servir el proyecto
    });

    // Observa cambios en archivos CSS, JS y HTML
    gulp.watch('css/**/*.css', gulp.series('styles'));
    gulp.watch('js/**/*.js', gulp.series('scripts'));
    gulp.watch("*.html").on('change', browserSync.reload); // Recarga el navegador si cambia un archivo HTML
});

// Tarea predeterminada que se ejecuta al correr "gulp"
gulp.task('default', gulp.series('styles', 'scripts', 'serve'));
