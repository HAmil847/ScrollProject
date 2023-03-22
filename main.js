// Seleccionar el elemento que contiene el contenido de la página
const content = document.querySelector(".contenido");
const body = document.body;
const main = document.getElementById("unityContainer");




//esperar antes de inciar


// Establecer una variable para almacenar la posición actual del scroll
let currentScrollPos = 0;

//numero de puntos en el scroll
//este valor es relativo, es necesario calcular dividiendo el alto/el numero de las vistas

let scrollView = body.scrollHeight/4;
// Obtener todos los elementos de sección por su clase
var secciones = document.querySelectorAll(".section");
// Agregar un listener de eventos de scroll al objeto "window"
window.addEventListener("scroll", function() {
  // Obtener la posición de desplazamiento actual de la página
  let scrollPosition = window.pageYOffset;

  // Iterar sobre los elementos de sección y comprobar su posición
  let ultimaPagina = 1;

  for (let i = 1; i < secciones.length; i++) {
    let seccion = secciones[i];

    if (scrollPosition < seccion.offsetTop) {
      //asignar la pagina para el indice
      ultimaPagina = i;
      console.log("La última página activa es la sección " + (ultimaPagina) + ".");

      //se envia el indice
      //aqui llamar a unity
      sendToUnity("ASCENSORx v2", "setModel", ultimaPagina);
      //fin de la llamada a unity
      break;
    }
  }
  
});


//envia un mensaje a unity
function sendToUnity(object, method, value) {
  //enviar a unity el valor del scroll
  unityInstance.SendMessage(object, method, value);
}


var unityTemp = UnityLoader.instantiate("unityContainer", "Build/Final.json", {onProgress: UnityProgress});
function UnityProgress(unityInstance, progress) {
    console.log("Progreso de carga: " + progress);
    if(progress ==1 ){
      main.style.animationName = "carga";
      main.style.animationDuration = "5s";
      main.style.animationIterationCount = "1";
      main.style.animationFillMode = "forwards";
      main.style.animationTimingFunction = "cubic-bezier(1,0,1,0)";
    }
}
