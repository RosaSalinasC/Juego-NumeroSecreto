let numeroSecreto = 0;    //creamos una variable que vinculamos a la funcion
let intentos = 0; // creamos una variable para contar los intentos que tarda el usuario en acertar
let listaNumeroSorteado = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) { //creamos una funcion que tiene como parametro elemento y texto de html
    let elementoHTML = document.querySelector(elemento);  //cambiamos el nombre de la funcion ya que no es el titulo si no se refiere a un elemento dentro de html
    elementoHTML.innerHTML = texto;              // cambiamos el h1 y el texto por los parametros (elemento y texto) despectivamente
    return;
} 

function verificarIntento() {                    //en esta funcion verificaremos si el intento de ingresar el numero del usuario sirve
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value); //creamos una variable para el numero que ingresara el usuario en el cuadro,usamos el elemento input de html, pero lo buscaremos por su id por eso usamos "document.getElementById()" en vez del "querySelector", luego ponemos un punto para que nos devuelva el valor de ello y le agregamos "parseInt" para que este sea un int en vez de un string
    
    if (numeroDeUsuario === numeroSecreto){   //creamos un if/else para mostar el mensaje de acertaste 
        asignarTextoElemento("p",`¡Felicidades, acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces"}!`); //usamos la funcion con los parametros, luego usamos operador ternario para cambiar vez por veces dependiendo del n de intentos
        document.getElementById("reiniciar").removeAttribute("disabled");
  
    //si el usuario no acerta:
   
    } else {
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento("p","El número secreto es menor");
        } else {
            asignarTextoElemento("p","El número secreto es mayor");
        }
        intentos++; //ponemos que cada vez que el usuario ingrese el numero se sume un intento
        limpiarCaja(); //llamos a la funcion
    } 
    return;
    
}

function limpiarCaja(){  //creamos una funcion que nos permita dejar en blanco la caja donde ponemos el numero cada que haga un nuevo intento
    let valorCaja = document.querySelector("#valorUsuario");  //creamos la variable de la caja y por document.querySelecctor llamamos al id del html para ello ponemos # antes del id
    valorCaja.value = ""; //indicamos que el valor sera nada
}

function condicionesIniciales(){  //creamos una función para guardar todas las condiciones iniciales de nuestro juego
    asignarTextoElemento('h1','¡Juego del número secreto!');  //llamamos a la funcion y le asignamos los parametros de html a las variables
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`); //se puede reutilizar mas veces y asi se ahorra lineas
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //limpiar la caja
    limpiarCaja();
    //Indicar mensaje de intervalo de numero 1 a 10
    //Generar el numero secreto aleatorio
    //reiniciar el numero de intentos
    condicionesIniciales();
    //Volver a desactivar el boton de "Nuevo juego"
    document.getElementById("reiniciar").setAttribute("disabled","true");

}

function generarNumeroSecreto () {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;      //retornamos solamente la operacion ya que nuestra variable esta vincualda a esta funcion
    console.log(numeroGenerado);
    console.log(listaNumeroSorteado);
    //Si ya sorteamos todos los numeros de la lista
    if(listaNumeroSorteado.length == numeroMaximo){
        asignarTextoElemento("p","Ya se sortearon todos los números posibles")
    } else{
        //Si el numero generado esta incluido en la lista
        if(listaNumeroSorteado.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumeroSorteado.push(numeroGenerado);
            return numeroGenerado;
    }
    }
} 
condicionesIniciales();  //llamamos a la función para que se active 