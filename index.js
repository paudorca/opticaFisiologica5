const canvas = document.getElementById('centro');
const ctx = canvas.getContext('2d');

const canvas2 = document.getElementById('derecha');
const ctx2 = canvas2.getContext('2d');
var count = 0;  

let respuestas = [[],[],[],[],[],[],[],[],[]]; 

const uno = 31.372549019607842; 
const dos = 43.92156862745098; 
const tres = 52.94117647058824; 
const cuatro = 60.3921568627451; 
const cinco = 66.66666666666666; 
const seis = 72.15686274509804; 
const siete = 77.25490196078432; 
const ocho = 81.96078431372548; 
const nueve = 86.66666666666667; 
let actual; 
let agotados = [];
let items = [1,2,3,4,5,6,7,8,9]; 

function chivato () {
    console.log("el valor del array 1 es: " + respuestas[0]); 
    console.log("el valor del array 2 es: " + respuestas[1]); 
    console.log("el valor del array 3 es: " + respuestas[2]); 
    console.log("el valor del array 4 es: " + respuestas[3]); 
    console.log("el valor del array 5 es: " + respuestas[4]); 
    console.log("el valor del array 6 es: " + respuestas[5]); 
    console.log("el valor del array 7 es: " + respuestas[6]); 
    console.log("el valor del array 8 es: " + respuestas[7]); 
    console.log("el valor del array 9 es: " + respuestas[8]); 
    console.log(items); 
}

window.onload = function() {
    ctx.fillStyle = 'white';
    actual = items[Math.floor(Math.random()*items.length)];
    console.log("el numero actual es: " + actual); 
    var num2 = getNumero(actual); 
    ctx.filter = `brightness(${num2}%)`;
    ctx.fillRect(0, 0, 337, 305);

    ctx2.strokeStyle = '#000000';
    ctx2.strokeRect(0, 0, 337, 305);
};

function contesta(numero) {
    respuestas[actual-1].push(numero);
    if (respuestas[actual-1].length == 10) {
        eliminaElemento(parseInt(actual));  
    }
    chivato(); 
    ++count; 
    let contador = document.getElementById('contador'); 
    contador.innerHTML = count + "/90";
    if (count == 90) abrirVentana(); 
    actual = items[Math.floor(Math.random()*items.length)]; 
    aux = getNumero(actual); 
    ctx.filter = `brightness(${aux}%)`;
    ctx.fillRect(0, 0, 337, 305);
    console.log("El numero actual es " + actual); 
}

function getNumero(val) {
    switch(val) {
        case 1: return uno; 
        case 2: return dos; 
        case 3: return tres; 
        case 4: return cuatro; 
        case 5: return cinco; 
        case 6: return seis; 
        case 7: return siete; 
        case 8: return ocho; 
        case 9: return nueve; 
    }
}

function abrirVentana() {
    localStorage.setItem('respuestas',respuestas); 
    var url = 'results.html'; 
    window.open(url,'_blank');
}

function eliminaElemento(elemento) {
    for (let i = 0; i < items.length;++i) {
        if (items[i] == elemento && i == 0) {
            items.shift(); 
            //items.splice(i-1,1);
        }
        else if (items[i] == elemento) {
            items.splice(i,1);
        }
    }
}

document.addEventListener('keydown', (event) => {
    var keyValue = event.key;

    if (keyValue == '1') {
        contesta(keyValue); 
    }
    else if (keyValue == '2') {
        contesta(keyValue);  
    }
    else if (keyValue == '3') {
        contesta(keyValue);  
    }
    else if (keyValue == '4') {
        contesta(keyValue);  
    }
    else if (keyValue == '5') {
        contesta(keyValue);     
    }
    else if (keyValue == '6') {
        contesta(keyValue);  
    }
    else if (keyValue == '7') {
        contesta(keyValue);  
    }
    else if (keyValue == '8') {
        contesta(keyValue);   
    }
    else if (keyValue == '9') {
        contesta(keyValue); 
    } 
  }, false);