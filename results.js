var arrayAux = localStorage.getItem('correct');
var correctAnswers = JSON.parse(arrayAux); 

var totalAnswersAux = localStorage.getItem("total"); 
var totalAnswers = JSON.parse(totalAnswersAux); 
var distance = localStorage.getItem('distanceInput'); 
var cambio = localStorage.getItem('cambio'); 
var cambio2 = JSON.parse(cambio); 

let respuestas = localStorage.getItem('respuestas'); 


function arrayObjToCsv(ar) {
	//comprobamos compatibilidad
	if(window.Blob && (window.URL || window.webkitURL)){
		var contenido = "",
			d = new Date(),
			blob,
			reader,
			save,
			clicEvent;
		//creamos contenido del archivo
		for (var i = 0; i < ar.length; i++) {
			//construimos cabecera del csv
			if (i == 0)
				contenido += Object.keys(ar[i]).join(";") + "\n";
			//resto del contenido
			contenido += Object.keys(ar[i]).map(function(key){
							return ar[i][key];
						}).join(";") + "\n";
		}
		//creamos el blob
		blob =  new Blob(["\ufeff", contenido], {type: 'text/csv'});
		//creamos el reader
		var reader = new FileReader();
		reader.onload = function (event) {
			//escuchamos su evento load y creamos un enlace en dom
			save = document.createElement('a');
			save.href = event.target.result;
			save.target = '_blank';
			//aquí le damos nombre al archivo
			save.download = "log_"+ d.getDate() + "_" + (d.getMonth()+1) + "_" + d.getFullYear() +".csv";
			try {
				//creamos un evento click
				clicEvent = new MouseEvent('click', {
					'view': window,
					'bubbles': true,
					'cancelable': true
				});
			} catch (e) {
				//si llega aquí es que probablemente implemente la forma antigua de crear un enlace
				clicEvent = document.createEvent("MouseEvent");
				clicEvent.initEvent('click', true, true);
			}
			//disparamos el evento
			save.dispatchEvent(clicEvent);
			//liberamos el objeto window.URL
			(window.URL || window.webkitURL).revokeObjectURL(save.href);
		}
		//leemos como url
		reader.readAsDataURL(blob);
	}else {
		//el navegador no admite esta opción
		alert("Su navegador no permite esta acción");
	}
};

function downloadFile() {
let myArray = []; 
for (let i = 1; i < 10; ++i) {
	myArray.push({"Luminancia (cd/m^2)":8*i,
    "Luminosidad media":calculaMedia(i),
    "Desviación estandar luminosidad":calculaDesviacion(i)});
}
arrayObjToCsv(myArray);
}

function toPercent(point){
	var percent = Number(point*100).toFixed(1);
	return percent;
}

function calculaMedia(u) {
	let inicio = 20*(u-1); 
	var sum = 0; 
	for (let i = 0; i < 10;++i) {
		sum += parseInt(respuestas[inicio+i*2],10); 
	}
	return sum/10;
}

function calculaDesviacion(u) {
	var media = calculaMedia(u); 
	console.log("la media es " + media); 
	var sum = 0; 
	let inicio = 20*(u-1); 
	//inicio bien
	for (var i = 0; i < 10;++i) {
		var num = (respuestas[inicio+i*2]-parseFloat(media));
		num = num.toFixed(2); 
		console.log("el num es " + parseFloat(num)); 
		sum += Math.pow(num,2);  
		console.log("el sum es " + parseFloat(sum)); 
	}
	var result = parseFloat(sum)/9; 
	result = result.toFixed(2); 
	console.log("el result es " + result); 
	return result; 
}