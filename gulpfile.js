const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const webp = require('gulp-webp');

function css(done){

    src('src/SCSS/**/*.scss')//Identificar el archivo SASS
        .pipe(plumber())//Para que no se detenga el proceso si hay un error
        .pipe(sass())//Compilarlo el archivo
        .pipe(dest("build/css"));//Almacenar en disco duro

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

function dev(done){
    watch('src/SCSS/**/*.scss', css);

    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel ( versionWebp, dev);