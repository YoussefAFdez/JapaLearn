const DEBUG = false

let ARRAY_NUMERICO = 
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

let contador = 46;


document.addEventListener("DOMContentLoaded", main);

function main() {

    //Recogemos los diversos elementos del DOM
    let numRestantes = document.getElementById("numRestantes");
    let lblAcierto = document.getElementById("lblAcierto");
    let lblError = document.getElementById("lblError");
    let numAciertos = document.getElementById("numAciertos");
    let numFallos = document.getElementById("numFallos");
    let imgCaracter = document.getElementById("imgCaracter");
    let formEntrada = document.getElementById("formEntrada");
    let tbRespuesta = document.getElementById("tbRespuesta");
    let btnEnviar = document.getElementById("btnEnviar");

    //Generamos numero aleatorio
    let numAleatorio = Math.floor(Math.random() * ARRAY_NUMERICO.length);

    //Eliminamos numero del array
    ARRAY_NUMERICO =  ARRAY_NUMERICO.filter(item => item != ARRAY_NUMERICO[numAleatorio]);
    if (numRestantes) numRestantes.textContent = contador;


    if (imgCaracter) imgCaracter.src = `img/${numAleatorio}.png`;


    if (lblAcierto && lblError && numAciertos && numFallos && imgCaracter && tbRespuesta && btnEnviar) {

        formEntrada.addEventListener('submit', e => { e.preventDefault() });

        tbRespuesta.addEventListener('keyup', e => {
            if (e.code === "Enter") {
                comprobarCaracter();
                tbRespuesta.value = "";
            };
        });

        btnEnviar.addEventListener("click", () => {
            comprobarCaracter();
            tbRespuesta.focus();
            tbRespuesta.value = "";
        });

    }

}

function comprobarCaracter() {

    if (contador) {
        let numImagen = imgCaracter.src.split('/').pop().split('.')[0];

        //Comprobamos el valor introducido
        if (tbRespuesta.value.toLowerCase() === ARRAY_VALORES[numImagen]) numAciertos.textContent = parseInt(numAciertos.textContent) + 1;
        else numFallos.textContent = parseInt(numFallos.textContent) + 1;

        //Generamos un valor aleatorio para mostrar la imagen
        let numAleatorio = Math.floor(Math.random() * ARRAY_NUMERICO.length);
        imgCaracter.src = `img/${numAleatorio}.png`;

        //Eliminamos numero del array
        ARRAY_NUMERICO =  ARRAY_NUMERICO.filter(item => item != ARRAY_NUMERICO[numAleatorio]);
        numRestantes.textContent = --contador;
    } else alert("Ya se han introducido todos los caracteres");
}