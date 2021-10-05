/* ************************************* TABLA CLIENT ************************************************/

function consultarCliente() {
    $.ajax({
        url: 'https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        // data : {id : 123},
        type: 'GET',
        datatype: 'json',
        success: function (respuesta) {
            $("#resultado").empty();
            console.log(respuesta);
            pintarRespuesta(respuesta.items);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Informacion traida de la bd, ' + xhr.status);
        }
    });
}

function pintarRespuesta(items) {
    let myTable = "<table border='1',colspan='2'><tr><th>ID<th>NAME<th>EMAIL<th>AGE</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "<td> <button onclick='itemIdClient(" + items[i].id + ")'>Editar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").append(myTable);
}

function itemIdClient(idItem) {
    $.ajax({
        dataType: 'json',
        url: "https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/" + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);
            let item = response.items[0];
            $("#id").append('prop("readonly",false)');
            $("#id") + "disabled";
            $("#id").val(item.id);
            $("#name").val(item.name);
            $("#email").val(item.email);
            $("#age").val(item.age);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function guardarCliente() {
    $.ajax({
        url: 'https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        data: {
            id: $("#id").val(),
            name: $("#name").val(),
            email: $("#email").val(),
            age: $("#age").val(),
        },
        type: 'POST',
        datatype: 'json',
        success: function (respuesta, textStatus, xhr) {
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            consultarCliente();
            console.log(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Registro guardado, ' + xhr.status);
        }
    });
}

function actualizarClient() {
    let myData = {
        id: $("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            consultarCliente();
            //alert("se ha actualizado la tabla mensaje")
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Registro actualizado, ' + xhr.status);
        }
    });
}
/******************************************************************************************************/

/* ************************************* TABLA MESSAGE ************************************************/

function consultarMensaje() {
    $.ajax({
        url: 'https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',

        // data : {id : 123},
        type: 'GET',
        datatype: 'json',
        success: function (respuesta) {
            $("#resultado").empty();
            console.log(respuesta);
            pintarRespuestaMensaje(respuesta.items);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Informacion traida de la bd, ' + xhr.status);
        }
    });
}

function pintarRespuestaMensaje(items) {
    let myTable = "<table border='1',colspan='2'><tr><th>ID</th><th>MENSAJE</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].messagetext + "</td>";
        myTable += "<td> <button onclick='borrarMensaje(" + items[i].id + ")'>Borrar</button>";
        myTable += "<td> <button onclick='itemIdMessage(" + items[i].id + ")'>Editar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").append(myTable);
}

function itemIdMessage(idItem) {
    $.ajax({
        dataType: 'json',
        url: "https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/" + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);
            let item = response.items[0];
            $("#id").val(item.id);
            $("#message").val(item.messagetext);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function guardarMensaje() {
    $.ajax({
        url: 'https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
        data: {
            id: $("#id").val(),
            messagetext: $("#message").val()
        },
        type: 'POST',
        datatype: 'json',
        success: function (respuesta, textStatus, xhr) {
            $("#resultado").empty();
            $("#id").val("");
            $("#message").val("");
            consultarMensaje();
            console.log(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Registro guardado, ' + xhr.status);
        }
    });
}

function borrarMensaje(idElemento) {
    let elemento = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(elemento);
    //JSON= JavaScript Object Notation
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: 'DELETE',
        contentType: 'application/json',
        success: function (respuesta) {
            $("#resultado").empty();
            consultarMensaje()
            console.log(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Registro borrado, ' + xhr.status);

        }
    });
}

function actualizarMessage() {
    let myData = {
        id: $("#id").val(),
        messagetext: $("#message").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#message").val("");
            consultarMensaje();
            //alert("se ha actualizado la tabla mensaje")
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Registro actualizado, ' + xhr.status);
        }
    });
}
/***************************************************************************************************/

/* ************************************* TABLA ROOM ************************************************/

function consultarRoom() {
    $.ajax({
        url: 'https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room',
        // data : {id : 123},
        type: 'GET',
        datatype: 'json',
        success: function (respuesta) {
            $("#resultado").empty();
            console.log(respuesta);
            pintarRespuestaRoom(respuesta.items);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Informacion traida de la bd, ' + xhr.status);
        }
    });
}

function pintarRespuestaRoom(items) {
    let myTable = "<table border='1',colspan='2'><tr><th>ID<th>ROOM<th>STARS<th>CATEGORY_ID<th>DESCRIPTION</tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td>" + items[i].room + "</td>";
        myTable += "<td>" + items[i].stars + "</td>";
        myTable += "<td>" + items[i].category_id + "</td>";
        myTable += "<td>" + items[i].description + "</td>";
        myTable += "<td> <button onclick='borrarRoom(" + items[i].id + ")'>Borrar</button>";
        myTable += "<td> <button onclick='itemIdRoom(" + items[i].id + ")'>Editar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado").append(myTable);
}

function itemIdRoom(idItem) {
    
    $.ajax({
        dataType: 'json',
        url: "https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room/" + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);
            let item = response.items[0];
            
            $("#id").prop(readonly="readonly");
            $("#id").val(item.id);
            $("#room").val(item.room);
            $("#stars").val(item.stars);
            $("#category_id").val(item.category_id);
            $("#description").val(item.description);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function borrarRoom(idElemento) {
    let elemento = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(elemento);
    //JSON= JavaScript Object Notation
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
        type: 'DELETE',
        contentType: 'application/json',
        success: function (respuesta) {
            $("#resultado").empty();
            consultarRoom()
            console.log(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Registro borrado, ' + xhr.status);
        }
    });
}

function guardarRoom() {
    $.ajax({
        url: 'https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room',
        data: {
            id: $("#id").val(),
            room: $("#room").val(),
            stars: $("#stars").val(),
            category_id: $("#category_id").val(),
            description: $("#description").val()
        },
        type: 'POST',
        datatype: 'json',
        success: function (respuesta, textStatus, xhr) {
            $("#resultado").empty();
            $("#id").val("");
            $("#room").val("");
            $("#stars").val("");
            $("#category_id").val("");
            $("#description").val("");
            consultarRoom();
            console.log(respuesta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Registro guardado, ' + xhr.status);
        }
    });
}

function actualizarRoom() {
    let myData = {
        id: $("#id").val(),
        room: $("#room").val(),
        stars: $("#stars").val(),
        category_id: $("#category_id").val(),
        description: $("#description").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g61dff592192815-reservabd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#room").val("");
            $("#stars").val("");
            $("#category_id").val("");
            $("#description").val("");
            consultarRoom();
            //alert("se ha actualizado la tabla mensaje")
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Registro actualizado, ' + xhr.status);
        }
    });
}
/****************************************************************************************************/

function soloLectura() {
    $("#id").prop("readonly", false);
}