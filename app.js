let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let intentosMaximos = 0;


function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(intentos)
    if ((numeroDeUsuario === numeroSecreto) && (intentos <= intentosMaximos)) {
        asignarTextoElemento('#info__juego',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#jugar').setAttribute('disabled','true');

    } else {
        //El usuario no acertó.
        if (intentosMaximos - intentos == 0) {
            asignarTextoElemento('#info__juego',`Se te acabaron los intentos!, ¿Deseas volver a jugar?`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.querySelector('#jugar').setAttribute('disabled','true');

        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('#info__juego',`El número secreto es menor, Tienes ${intentosMaximos - intentos} disponibles`);
            } else {
                asignarTextoElemento('#info__juego',`El número secreto es mayor, Tienes ${intentosMaximos - intentos} disponibles`);
            }
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('#info__juego','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}



function condicionesIniciales() {

    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('#p__seleccion', 'Elija la dificultad del juego');
    asignarTextoElemento('#intentos', 'Elija la cantidad de intentos máximos');
    // asignarTextoElemento('#info__juego',`Indica un número del 1 al ${numeroMaximo}`);
    // numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    // console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    document.getElementById('menu__seleccion__juego').removeAttribute('hidden');
    document.getElementById('menu__juego').setAttribute('hidden','true');
    limpiarCaja();
    asignarTextoElemento('#info__juego',"");

    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    document.getElementById('jugar').removeAttribute('disabled');

    
}

// Agregar cantidad de intentos

function agregarIntentos() {
    intentosMaximos = document.getElementById('intentos__select').value;
    console.log('si pasa');
    
    console.log(intentosMaximos);
    intentosMaximos = parseInt(intentosMaximos);
    document.getElementById('menu__seleccion__juego').setAttribute('hidden','true');
    document.getElementById('menu__juego').removeAttribute('hidden');
    asignarTextoElemento('#p__seleccion',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();

}

condicionesIniciales();