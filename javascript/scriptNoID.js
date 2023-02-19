const DEBUG = false;

//Almacena la posicion de los diferentes elementos de ARRAY_VALORES
let arrayNumerico = 
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 
    29, 30, 31, 32, 33, 34, 35, 36, 37, 
    38, 39, 40, 41, 42, 43, 44, 45];

//Valor real de cara caracter
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

//Variable que lleva la cuenta de los caracteres restantes
let contador = 46;


document.addEventListener("DOMContentLoaded", main);

function main() {

    //Generamos el primer caracter
    generaImagen();

    formEntrada.addEventListener('submit', e => { e.preventDefault() });

    tbRespuesta.addEventListener('keyup', e => {
        if (e.code === "Enter") comprobarCaracter();
    });

    btnEnviar.addEventListener("click", comprobarCaracter);

}

function comprobarCaracter() {

    if (contador >= 0) {
        //Extraemos el numero de la imagen actual para encontrar su equivalente en letra
        let numImagen = imgCaracter.src.split('/').pop().split('.')[0];

        //Comprobamos el valor introducido
        if (tbRespuesta.value.toLowerCase() === ARRAY_VALORES[numImagen]) numAciertos.textContent = parseInt(numAciertos.textContent) + 1;
        else numFallos.textContent = parseInt(numFallos.textContent) + 1;

        generaImagen();
        
    } else alert("Ya se han introducido todos los caracteres");

    //Vaciamos el textbox y le damos el foco
    tbRespuesta.value = "";
    tbRespuesta.focus();
}


// Esta funcion genera un numero aleatorio y elimina dicha imagen del array imagenes
function generaImagen() {
    
    //Generamos un numero aleatorio de 0 al ultimo elemento del array numerico.
    let numAleatorio = Math.floor(Math.random() * arrayNumerico.length);

    //Nos quedamos con el numero que la posicion del array representa
    let valorNumerico = arrayNumerico[numAleatorio];

    // Reducimos el contador para evitar cambiar la imagen cuando no queden elementos.
    numRestantes.textContent = contador--;

    //Actualizamos la imagen mientras queden caracteres y vamos vaciando el array.
    if (contador) {
        imgCaracter.src = `img/${valorNumerico}.svg`;
        arrayNumerico = arrayNumerico.filter(item => item != valorNumerico);
    }
}