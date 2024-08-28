const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Importación dinámica de del, gulp-imagemin y sus plugins
async function getDependencies() {
    const { deleteAsync } = await import('del');
    const imagemin = (await import('gulp-imagemin')).default;
    const mozjpeg = (await import('imagemin-mozjpeg')).default;
    const optipng = (await import('imagemin-optipng')).default;
    return { deleteAsync, imagemin, mozjpeg, optipng };
}

// Tarea para limpiar la carpeta dist
gulp.task('clean', async function() {
    const { deleteAsync } = await getDependencies();
    return deleteAsync(['dist']);
});

// Tarea para minificar y agrupar JavaScript
gulp.task('scripts', function() {
    return gulp.src('js/**/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// Tarea para minificar y agrupar CSS
gulp.task('styles', function() {
    return gulp.src('css/**/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Tarea para optimizar imágenes
gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('dist/images'));
});

// Tarea para mover archivos HTML a la carpeta dist
gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
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

// Definir la tarea `build` para correr todas las tareas anteriores
gulp.task('build', gulp.series('clean', gulp.parallel('scripts', 'styles', 'images', 'html')));
