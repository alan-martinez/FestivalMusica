const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Javascript
const terser = require('gulp-terser-js');

function css(done){

    src('src/SCSS/**/*.scss')//Identificar el archivo SASS
        .pipe(sourcemaps.init())//Iniciar sourcemaps
        .pipe(plumber())//Para que no se detenga el proceso si hay un error
        .pipe(sass())//Compilarlo el archivo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )//Aplicar autoprefixer y cssnano
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));//Almacenar en disco duro

    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'));
    done();
}

function versionWebp( done ){
    
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function versionAvif( done ){
    
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function javascript( done ){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    
        done();
}

function dev(done){
    watch('src/SCSS/**/*.scss', css);
    watch('src/js/**/*.scss', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel ( imagenes, versionWebp, versionAvif, javascript, dev);