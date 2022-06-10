const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(done){

    src('src/SCSS/**/*.scss')//Identificar el archivo SASS
        .pipe(plumber())//Para que no se detenga el proceso si hay un error
        .pipe(sass())//Compilarlo el archivo
        .pipe(dest("build/css"));//Almacenar en disco duro

    done();
}

function dev(done){
    watch('src/SCSS/**/*.scss', css);

    done();
}

exports.css = css;
exports.dev = dev;