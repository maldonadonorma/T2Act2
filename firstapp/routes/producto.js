var express = require('express');
var router = express.Router();


////////Variables
let miCarrito = [];
let cantidad = 0;
let total = 0;

//definir catalogo
let Catalogo = {
    listaProductos: [],
    imprimir: function () {
        console.table(this.listaProductos);
    },
    tieneRegistros: function () {
        if (this.listaProductos.length > 0) {
            return true;
        }
        return false;
    },
    obtenerNumeroRegistros: function () {
        return this.listaProductos.length;
    },
    main: function () {
        console.log("Total productos: " + this.listaProductos.length);
    },
    limpiar: function () {
        console.clear();
    }
}

///////Metodos
router.get('/', function (req, res) {
    let datosProductos = Catalogo.listaProductos;

    rowTabla = "<h1>Listado de productos</h1>";
    rowTabla += '<a href="/producto/agregar">Agregar</a>';
    rowTabla += "<table>";
    datosProductos.forEach(element => {
        rowTabla += "<tr><td>" + element.nombre + "</td>";
        rowTabla += "<td>" + element.descripcion + "</td>";
        rowTabla += "<td>" + element.precio + "</td>";
        rowTabla += '<td><a href="/producto/editar/' + element.id + '">Editar</a> |';
        rowTabla += '<div onclick="borrardatos(' + element.id + ')">Borrar</div></td>';
        rowTabla += "</tr>";
    });

    rowTabla += "</table>";
    rowTabla += agregarJs();
    res.send('<br>' + rowTabla);

});


router.get('/agregar', function (req, res) {
    res.render('registroproducto.ejs');
});


router.get('/editar/:id', function (req, res) {
    let id = req.params.id;
    res.render('editarproducto.ejs', { idProducto: id });
});

router.get('/data/:id', function (req, res) {
    let id = req.params.id;
    let datosProductos = Catalogo.listaProductos;
    let producto = null;
    datosProductos.forEach((element, i) => {
        if (element.id == id) {
            producto = element;
            console.table(producto);
        }
    });
    res.send(JSON.stringify(producto));
});


router.post('/', function (req, res) {
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;

    console.log(req.body);
    let id = Catalogo.listaProductos.length;

    let Producto = {
        id: id + 1,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    }

    Catalogo.listaProductos.push(Producto);
    let datosProductos = Catalogo.listaProductos;
    rowTabla = '<a href="/producto">listado</a>';
    rowTabla += "<table>";
    datosProductos.forEach(element => {
        rowTabla += "<tr><td>" + element.nombre + "</td>";
        rowTabla += "<td>" + element.descripcion + "</td>";
        rowTabla += "<td>" + element.precio + "</td>";
        rowTabla += '<td><a href="/producto/editar/' + element.id + '">Editar</a> |';
        rowTabla += '<div onclick="borrardatos(' + element.id + ')">Borrar</div></td>';
        rowTabla += "</tr>";
    });

    rowTabla += "</table>";
    rowTabla += agregarJs();
    res.send('<br>' + rowTabla);
});


router.put('/:id', function (req, res) {
    let idrq = req.params.id;
    /*let id = req.body.id;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;*/

    let datosr = convertJsonToObject(req.body);
    let id = datosr[0];
    let nombre = datosr[1];
    let descripcion = datosr[2];
    let precio = datosr[3];

    console.log(nombre);
    let datosProductos = Catalogo.listaProductos;
    datosProductos.forEach((element, i) => {
        if (element.id == id) {
            console.table(element);
            Catalogo.listaProductos[i].nombre = nombre;
            Catalogo.listaProductos[i].descripcion = descripcion;
            Catalogo.listaProductos[i].precio = precio;
        }
    });

    Catalogo.imprimir();
    rowTabla = '<a href="/producto">listado</a>';
    rowTabla += "Registro actualizado";
    rowTabla += "<table>";
    datosProductos.forEach(element => {
        rowTabla += "<tr><td>" + element.nombre + "</td>";
        rowTabla += "<td>" + element.descripcion + "</td>";
        rowTabla += "<td>" + element.precio + "</td>";
        rowTabla += '<td><a href="/producto/editar/' + element.id + '">Editar</a> |';
        rowTabla += '<div onclick="borrardatos(' + element.id + ')">Borrar</div></td>';
        rowTabla += "</tr>";
    });

    rowTabla += "</table>";
    rowTabla += agregarJs();
    res.send(' ' + rowTabla);
});



router.delete('/:id', function (req, res) {
    let id = req.params.id;
    let datosProductos = Catalogo.listaProductos;
    datosProductos.forEach((element, i) => {
        if (element.id == id) {
            Catalogo.listaProductos.splice(i, 1);
        }
    });
    res.send('Se ha borrado ' + id);
});


var agregarJs = function () {
    return '<script src="javascripts/general.js"></script>';
}


var convertJsonToObject = function (datos) {
    let result = Object.keys(datos).map(function (e) {
        Object.keys(datos[e]).forEach(function (k) {
            if (typeof datos[e][k] == "object") {
                datos[e][k] = Object.keys(datos[e][k]).map(function (l) {
                    return datos[e][k][l];
                });
            }//fin if
        });
        return datos[e];
    });
    return result;
}//fin convertJsonToObject

//EXportar modulo
module.exports = router;