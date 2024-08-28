const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Importación dinámica de gulp-imagemin y del
async function getImagemin() {
    const imagemin = (await import('gulp-imagemin')).default;
    return imagemin;
}

async function getDel() {
    const { deleteAsync } = await import('del');
    return deleteAsync;
}

// Tarea para limpiar la carpeta dist
gulp.task('clean', async function() {
    const del = await getDel();
    return del(['dist']);
});

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

// Tarea para optimizar imágenes
gulp.task('images', async function() {
    const imagemin = await getImagemin();
    return gulp.src('images/**/*')
        .pipe(imagemin())
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
