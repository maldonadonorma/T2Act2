function enviar(){
    document.getElementById("primero").submit();
    document.getElementById("segundo").submit();
}

function obtenerdatos(valorId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            document.getElementById("id").value=respuesta.id;
            document.getElementById("nombre").value=respuesta.nombre;
            document.getElementById("descripcion").value=respuesta.descripcion;
            document.getElementById("precio").value=respuesta.precio;
            //document.getElementById("demo").innerHTML = this.responseText;
            //window.location="/producto";
        }
    };
    xhttp.open("GET", "/producto/data/"+valorId, true);
    xhttp.send();
}

function editardatos(){
    var xhttp = new XMLHttpRequest();
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = document.getElementById("precio").value;

    var data = {};
    data.id = id;
    data.nombre  = nombre;
    data.descripcion = descripcion;
    data.precio  = precio;

    var json = JSON.stringify(data);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("demo").innerHTML = this.responseText;
            window.location="/producto";
        }
    };
    xhttp.open("PUT", "/producto/"+id, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8'); 
    xhttp.send(json);
}

function borrardatos(valorId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("demo").innerHTML = this.responseText;
            window.location="/producto";
        }
    };
    xhttp.open("DELETE", "/producto/"+valorId, true);
    xhttp.send();
}

