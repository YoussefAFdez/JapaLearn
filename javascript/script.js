const DEBUG = true;

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
let contador = 47;


document.addEventListener("DOMContentLoaded", main);

function main() {

    // Recogemos los diversos elementos del DOM
    let numRestantes = document.getElementById("numRestantes");
    let lblAcierto = document.getElementById("lblAcierto");
    let lblError = document.getElementById("lblError");
    let numAciertos = document.getElementById("numAciertos");
    let numFallos = document.getElementById("numFallos");
    let imgCaracter = document.getElementById("imgCaracter");
    let formEntrada = document.getElementById("formEntrada");
    let tbRespuesta = document.getElementById("tbRespuesta");
    let btnEnviar = document.getElementById("btnEnviar");
    let btnHiragana = document.getElementById("btnHiragana");
    let btnKatakana = document.getElementById("btnKatakana");
    let nodoFlotante = document.getElementById("flotante");

    

    //Seleccionamos modo de juego
    let modo;

    btnHiragana.addEventListener("click", () => {
        modo = 0;
        nodoFlotante.classList.add("oculto");
        //Generamos el primer caracter
        generarImagen(imgCaracter, numRestantes, btnEnviar, numAciertos, numFallos, modo);
    });

    btnKatakana.addEventListener("click", () => {
        modo = 1;
        nodoFlotante.classList.add("oculto");
        //Generamos el primer caracter
        generarImagen(imgCaracter, numRestantes, btnEnviar, numAciertos, numFallos, modo);
    });
    

    //Comprobamos la existencia de todos los elementos
    if (numRestantes && lblAcierto && lblError && numAciertos && numFallos && imgCaracter && formEntrada && tbRespuesta && btnEnviar) {

        //Cancelamos el submit al pulsar enter
        formEntrada.addEventListener('submit', e => { e.preventDefault() });

        //Detectamos cuando pulsamos enter en el textbox
        tbRespuesta.addEventListener('keyup', e => {
            if (e.code === "Enter") comprobarCaracter(tbRespuesta, imgCaracter, numAciertos, numFallos, numRestantes, btnEnviar, modo);
        });

        //Compobamos caracter al pulsar el boton o recargamos la pagina al final
        btnEnviar.addEventListener("click", () => {
            if (contador) comprobarCaracter(tbRespuesta, imgCaracter, numAciertos, numFallos, numRestantes, btnEnviar, modo);
            else location.reload();
        });

        

    }

}

//
function comprobarCaracter(nodoEntrada, nodoImagen, nodoAciertos, nodoFallos, nodoRestantes, nodoBtnEnviar, modo) {

    if (contador) {
        //Extraemos el numero de la imagen actual para encontrar su equivalente en letra
        let numImagen = nodoImagen.src.split('/').pop().split('.')[0];

        //Comprobamos el valor introducido
        if (nodoEntrada.value.toLowerCase() === ARRAY_VALORES[numImagen]) nodoAciertos.textContent = parseInt(nodoAciertos.textContent) + 1;
        else nodoFallos.textContent = parseInt(nodoFallos.textContent) + 1;

        generarImagen(nodoImagen, nodoRestantes, nodoBtnEnviar, nodoAciertos, nodoFallos, modo);

    } else alert("Ya se han introducido todos los caracteres");

    //Actualizamos el texbox dejandolo en blanco y cargando el foco
    nodoEntrada.focus();
    nodoEntrada.value = "";
}


// Esta funcion genera un numero aleatorio y elimina dicha imagen del array imagenes
function generarImagen(nodoImagen, nodoRestantes, nodoBtnEnviar, nodoAciertos, nodoFallos, modo) {
    
    //Generamos un numero aleatorio de 0 al ultimo elemento del array numerico.
    let numAleatorio = Math.floor(Math.random() * arrayNumerico.length);

    //Nos quedamos con el numero que la posicion del array representa
    let valorNumerico = arrayNumerico[numAleatorio];

    // Reducimos el contador para evitar cambiar la imagen cuando no queden elementos.
    nodoRestantes.textContent = --contador;

    //Actualizamos la imagen mientras queden caracteres y vamos vaciando el array.
    if (contador) {
        nodoImagen.src = `img/${!modo ? "Hiragana" : "Katakana"}/${valorNumerico}.svg`;
        arrayNumerico = arrayNumerico.filter(item => item != valorNumerico);
    } else {
        //Actualizamos 
        nodoBtnEnviar.textContent = "Recargar";
        alert(`Has terminado con todos los caracteres. Has tenido ${nodoAciertos.textContent} aciertos y ${nodoFallos.textContent} errores`);
    }
}