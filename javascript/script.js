const DEBUG = true

const ARRAY_NUMERICO = 
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 
    29, 30, 31, 32, 33, 34, 35, 36, 37, 
    38, 39, 40, 41, 42, 43, 44, 45];

const ARRAY_VALORES = [
    'a', 'i', 'u', 'e', 'o',
    'ka', 'ki', 'ku', 'ke', 'ko',
    'sa', 'shi', 'su', 'se', 'so',
    'ta', 'chi', 'tsu', 'te', 'to',
    'na', 'ni', 'nu', 'ne', 'no',
    'ha', 'hi', 'fu', 'he', 'ho',
    'ma', 'mi', 'mu', 'me', 'mo',
    'ya', 'yu', 'yo',
    'ra', 'ri', 'ru', 're', 'ro',
    'wa', 'n', 'wo'
    ];


document.addEventListener("DOMContentLoaded", main);

function main() {
    if (DEBUG) console.log("Hello World!");

    //Recogemos los diversos elementos del DOM
    let lblAcierto = document.getElementById("lblAcierto");
    let lblError = document.getElementById("lblError");
    let imgCaracter = document.getElementById("imgCaracter");
    let tbRespuesta = document.getElementById("tbRespuesta");
    let btnEnviar = document.getElementById("btnEnviar");


    if (lblAcierto && lblError && imgCaracter && tbRespuesta && btnEnviar) {

        if (DEBUG) console.log("correcto");

        btnEnviar.addEventListener("click", () => {

            let numImagen = imgCaracter.src.split('/').pop().split('.')[0];

            if (DEBUG) console.log(numImagen);
            if (DEBUG) console.log(ARRAY_VALORES[numImagen]);
        })

    } else console.log ("Error");

}