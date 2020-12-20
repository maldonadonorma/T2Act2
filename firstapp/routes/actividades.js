var express = require('express');
var router = express.Router();

let actividadesHombre = [];
let actividadesMujer = [];

let actividadesLista = ["Cuidar a los niños","Planchar","Cocinar","Arreglar casa","Lavar"];
let nHombre = 0;
let nMujer = 0;

router.get('/', function (request, response) {
  //res.send();
  let actividades = [];
  actividades.push(request.query.r1);
  actividades.push(request.query.r2);
  actividades.push(request.query.r3);
  actividades.push(request.query.r4);
  actividades.push(request.query.r5);

  actividades.forEach((element,i) =>{
    if(element == "mujer"){
      actividadesMujer.push(actividadesLista[i]);
    }else if(element == "hombre"){
      actividadesHombre.push(actividadesLista[i]);
    }else{
      //
    }
  });

  let cadenaM =  getData(actividadesMujer);

  let cadenaH = getData(actividadesHombre);
  let actividadMayorHombre = getMoreElement(actividadesHombre);
  let actividadMayorMujer = getMoreElement(actividadesMujer);

  let mensaje = '<div>';
  mensaje += '<br>Mujeres: '+actividadesMujer.length;
  mensaje += '<br> '+cadenaM;
  mensaje += '<br> Actividad más repetida:<span style="font-weight:bold;"> '+actividadMayorMujer+'</span>';
  mensaje += '<br>Hombres: '+actividadesHombre.length;
  mensaje += '<br> '+cadenaH;
  mensaje += '<br> Actividad más repetida:<span style="font-weight:bold;"> '+actividadMayorHombre+'</span>';
  mensaje += '</div>';
  response.send(mensaje);
});

router.post('/', function (request, response) {
  let actividades = [];
  actividades.push(request.body.r1);
  actividades.push(request.body.r2);
  actividades.push(request.body.r3);
  actividades.push(request.body.r4);
  actividades.push(request.body.r5);

  actividades.forEach((element,i) =>{
    if(element == "mujer"){
      actividadesMujer.push(actividadesLista[i]);
    }else if(element == "hombre"){
      actividadesHombre.push(actividadesLista[i]);
    }else{
      //
    }
  });

  let cadenaM = getData(actividadesMujer);
  
  let cadenaH = getData(actividadesHombre);
  let actividadMayorHombre = getMoreElement(actividadesHombre);
  let actividadMayorMujer = getMoreElement(actividadesMujer);

  let mensaje = '<div>';
  mensaje += '<br>Mujeres: '+actividadesMujer.length;
  mensaje += '<br> '+cadenaM;
  mensaje += '<br> Actividad más repetida:<span style="font-weight:bold;"> '+actividadMayorMujer+'</span>';
  mensaje += '<br>Hombres: '+actividadesHombre.length;
  mensaje += '<br> '+cadenaH;
  mensaje += '<br> Actividad más repetida:<span style="font-weight:bold;"> '+actividadMayorHombre+'</span>';
  mensaje += '</div>';
  response.send(mensaje);

});



router.put('/', function (req, res) {
  res.send('Got a PUT request at /actividades');
});



router.delete('/', function (req, res) {
  res.send('Got a DELETE request at /actividades');
});




//Funciones generales
var getData = function (datos) {
  let respuesta = "";
  datos.forEach((element) =>{
    respuesta+= element+", ";
  });
  return respuesta;
}

var getMoreElement = function(datos){
  let mayor = "";
  let cMayor = 0;
  datos.forEach((element,i) =>{
    let contador = 0;
    for(let j=0; j<datos.length; j++){
      if(element == datos[j]){
        contador++;
      }
    }
    if(contador > cMayor){
      mayor = element;
      cMayor = contador;
    }
  });
  return mayor;
}


//EXportar modulo
module.exports = router;