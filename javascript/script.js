const DEBUG = true;

//Almacena la posicion de los diferentes elementos de ARRAY_VALORES
const ARRAY_VALORES = [
  { silaba: "a", num: 0 },
  { silaba: "i", num: 1 },
  { silaba: "u", num: 2 },
  { silaba: "e", num: 3 },
  { silaba: "o", num: 4 },
  { silaba: "ka", num: 5 },
  { silaba: "ki", num: 6 },
  { silaba: "ku", num: 7 },
  { silaba: "ke", num: 8 },
  { silaba: "ko", num: 9 },
  { silaba: "sa", num: 10 },
  { silaba: "shi", num: 11 },
  { silaba: "su", num: 12 },
  { silaba: "se", num: 13 },
  { silaba: "so", num: 14 },
  { silaba: "ta", num: 15 },
  { silaba: "chi", num: 16 },
  { silaba: "tsu", num: 17 },
  { silaba: "te", num: 18 },
  { silaba: "to", num: 19 },
  { silaba: "na", num: 20 },
  { silaba: "ni", num: 21 },
  { silaba: "nu", num: 22 },
  { silaba: "ne", num: 23 },
  { silaba: "no", num: 24 },
  { silaba: "ha", num: 25 },
  { silaba: "hi", num: 26 },
  { silaba: "fu", num: 27 },
  { silaba: "he", num: 28 },
  { silaba: "ho", num: 29 },
  { silaba: "ma", num: 30 },
  { silaba: "mi", num: 31 },
  { silaba: "mu", num: 32 },
  { silaba: "me", num: 33 },
  { silaba: "mo", num: 34 },
  { silaba: "ya", num: 35 },
  { silaba: "yu", num: 36 },
  { silaba: "yo", num: 37 },
  { silaba: "ra", num: 38 },
  { silaba: "ri", num: 39 },
  { silaba: "ru", num: 40 },
  { silaba: "re", num: 41 },
  { silaba: "ro", num: 42 },
  { silaba: "wa", num: 43 },
  { silaba: "n", num: 44 },
  { silaba: "wo", num: 45 },
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
    generarImagen(
      imgCaracter,
      numRestantes,
      btnEnviar,
      numAciertos,
      numFallos,
      modo
    );
  });

  btnKatakana.addEventListener("click", () => {
    modo = 1;
    nodoFlotante.classList.add("oculto");
    //Generamos el primer caracter
    generarImagen(
      imgCaracter,
      numRestantes,
      btnEnviar,
      numAciertos,
      numFallos,
      modo
    );
  });

  //Comprobamos la existencia de todos los elementos
  if (
    numRestantes &&
    lblAcierto &&
    lblError &&
    numAciertos &&
    numFallos &&
    imgCaracter &&
    formEntrada &&
    tbRespuesta &&
    btnEnviar
  ) {
    //Cancelamos el submit al pulsar enter, comprobamos la entrada y generamos la siguiente imagen
    formEntrada.addEventListener("submit", (e) => {
      e.preventDefault();
      comprobarCaracter(tbRespuesta, imgCaracter, numAciertos, numFallos);
      if (ARRAY_VALORES.length) {
        generarImagen(imgCaracter, numRestantes, modo);
      } else {
        //Actualizamos
        alert(
          `Has terminado con todos los caracteres. Has tenido ${numAciertos.textContent} aciertos y ${numFallos.textContent} errores`
        );
        location.reload();
      }
    });
  }
}

//Comprueba el valor introducido y elimina el caracter.
function comprobarCaracter(nodoEntrada, nodoImagen, nodoAciertos, nodoFallos) {
  if (ARRAY_VALORES.length) {
    //Extraemos el numero de la imagen actual para encontrar su equivalente en letra
    let numImagen = Number(nodoImagen.src.split("/").pop().split(".")[0]);

    //Comprobamos el valor introducido
    if (
      nodoEntrada.value.toLowerCase() ===
      ARRAY_VALORES.find((obj) => obj.num === numImagen).silaba
    )
      nodoAciertos.textContent = parseInt(nodoAciertos.textContent) + 1;
    else nodoFallos.textContent = parseInt(nodoFallos.textContent) + 1;

    //Eliminamos el elemento del array
    ARRAY_VALORES.splice(
      ARRAY_VALORES.indexOf(ARRAY_VALORES.find((obj) => obj.num === numImagen)),
      1
    );

    //Actualizamos el texbox dejandolo en blanco y cargando el foco
    nodoEntrada.focus();
    nodoEntrada.value = "";
  }
}
// Esta funcion genera un numero aleatorio
function generarImagen(nodoImagen, nodoRestantes, modo) {
  //Generamos un numero aleatorio de 0 al ultimo elemento del array numerico.
  let numAleatorio = Math.floor(Math.random() * ARRAY_VALORES.length);
  let valorNumerico = ARRAY_VALORES[numAleatorio].num;

  //Nos quedamos con el numero que la posicion del array representa
  // Reducimos el contador para evitar cambiar la imagen cuando no queden elementos.
  nodoRestantes.textContent = ARRAY_VALORES.length;

  //Actualizamos la imagen mientras queden caracteres y vamos vaciando el array.
  if (ARRAY_VALORES.length) {
    nodoImagen.src = `img/${
      !modo ? "Hiragana" : "Katakana"
    }/${valorNumerico}.svg`;
    console.log(ARRAY_VALORES[numAleatorio].silaba);
  }
}
