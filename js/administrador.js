"use strict"

export default initAdministrador;

function initAdministrador(){
    //JS PARA TABLA CON ARRAY

    let arrayJuegos = [];
    let formAdministrador = document.querySelector("#formAdministrador");
    formAdministrador.addEventListener("submit", function(event){
        event.preventDefault();
        AgregarJuego();
    });
    let botonAgregarTres = document.querySelector("#botonAgregarTres");
    botonAgregarTres.addEventListener("click", AgregarTres);
    let botonVaciarTabla = document.querySelector("#botonVaciarTabla");
    botonVaciarTabla.addEventListener("click", VaciarTabla);

    AgregarTres();

    function AgregarJuego(){
        let inputNombreJuego = document.querySelector("#inputNombreJuego").value;
        let inputFechaJuego = document.querySelector("#inputFechaJuego").value;
        let inputPrecioJuego = parseInt(document.querySelector("#inputPrecioJuego").value) || 0;
        let textoErrorLanzamientos = document.querySelector("#textoErrorLanzamientos");
        if(inputNombreJuego !== "" && inputFechaJuego !== "" && inputPrecioJuego !== 0){
            let juego = {
                "nombre": inputNombreJuego,
                "fecha": inputFechaJuego,
                "precio": inputPrecioJuego,
            }
            arrayJuegos.push(juego);
            textoErrorLanzamientos.innerHTML = "";
            ActualizarTabla();
        }
        else{
            textoErrorLanzamientos.innerHTML = "*Asegúrese de poner un valor correcto en todos los campos";
        }
    }
    function AgregarTres(){
        let juego1 = {
            "nombre": "ACV 6",
            "fecha": "1/13",
            "precio": "Free in Epic Store",
        }
        let juego2 = {
            "nombre": "Red Red Y Eddy",
            "fecha": "29/2",
            "precio": "$5",
        }
        let juego3 = {
            "nombre": "Max Swain",
            "fecha": "25/12",
            "precio": "$100",
        }
        arrayJuegos.push(juego1);
        arrayJuegos.push(juego2);
        arrayJuegos.push(juego3);
        ActualizarTabla();
    }
    function VaciarTabla(){
        arrayJuegos = [];
        ActualizarTabla();
    }
    function ActualizarTabla(){
        let tablaBodyAdministrador = document.querySelector("#tablaBodyAdministrador");
        tablaBodyAdministrador.innerHTML = "";
        for(let i = 0; i<arrayJuegos.length; i++){
            tablaBodyAdministrador.innerHTML += "<tr>" + "<td>" + arrayJuegos[i].nombre + "</td>" + "<td>" + arrayJuegos[i].fecha + "</td>" + "<td>" + arrayJuegos[i].precio + "</td>" + "</tr>";
        }
    }

    //JS PARA TABLA CON REST

    const baseUrl = 'https://web-unicen.herokuapp.com/api/groups';
    const groupID = 'grupo923'
    const collectionID = 'clientes';
    let minimoCopias = 0;
    let minimoTotal = 0;
    let inputNombreCliente = document.querySelector("#inputNombreCliente");
    let inputCantidadCopias = document.querySelector("#inputCantidadCopias");
    let inputPrecioCopias = document.querySelector("#inputPrecioCopias");
    let tablaBodyVentas = document.querySelector("#tablaBodyVentas");
    let divEditarVentas = document.querySelector("#divEditarVentas");
    let botonGuardar = document.querySelector("#botonGuardar");
    botonGuardar.addEventListener("click", function(event){
        event.preventDefault();
        let textoErrorVentas = document.querySelector("#textoErrorVentas");
        if(inputNombreCliente.value !== "" && inputCantidadCopias.value !== "" && inputPrecioCopias.value !== ""){
            let cliente = {
                "nombre": inputNombreCliente.value,
                "copias": inputCantidadCopias.value,
                "precio": inputPrecioCopias.value,
            }
            textoErrorVentas.innerHTML = "";
            Guardar(cliente);
        }
        else{
            textoErrorVentas.innerHTML = "*Asegúrese de poner un valor correcto en todos los campos";
        }
    });
    let botonCargarTres = document.querySelector("#botonCargarTres");
    botonCargarTres.addEventListener("click", function(event){
        event.preventDefault();
        CargarTres();
    });
    let botonCancelar = document.querySelector("#botonCancelar");
    botonCancelar.addEventListener("click", function(event){
        event.preventDefault();
        let textoErrorEditar = document.querySelector("#textoErrorEditar");
        textoErrorEditar.innerHTML = "";
        divEditarVentas.classList.toggle("divOculto");
    })
    let botonConfirmar = document.querySelector("#botonConfirmar");
    botonConfirmar.addEventListener("click", function(event){
        event.preventDefault();
        let inputNuevoNombreCliente = document.querySelector("#inputNuevoNombreCliente");
        let inputNuevaCantidadCopias = document.querySelector("#inputNuevaCantidadCopias");
        let inputNuevoPrecioCopias = document.querySelector("#inputNuevoPrecioCopias");
        let textoErrorEditar = document.querySelector("#textoErrorEditar");
        if(inputNuevoNombreCliente.value !== "" && inputNuevaCantidadCopias.value !== "" && inputNuevoPrecioCopias.value !== ""){
            textoErrorEditar.innerHTML = "";
            Editar(botonConfirmar.idActual, inputNuevoNombreCliente, inputNuevaCantidadCopias, inputNuevoPrecioCopias);
        }
        else{
            textoErrorEditar.innerHTML = "*Asegúrese de poner un valor correcto en todos los campos";
        }
        
    });
    let botonAplicarFiltro = document.querySelector("#botonAplicarFiltro");
    botonAplicarFiltro.addEventListener("click", function(event){
        event.preventDefault();
        minimoCopias = document.querySelector("#inputMinimoCopias").value;
        if(minimoCopias.length === 0){
            minimoCopias = 0;
        }
        minimoTotal = document.querySelector("#inputMinimoTotal").value;
        if(minimoTotal.length === 0){
            minimoTotal = 0;
        }
        ObtenerTodos(minimoCopias, minimoTotal);
    });
    let botonQuitarFiltro = document.querySelector("#botonQuitarFiltro");
    botonQuitarFiltro.addEventListener("click", function(event){
        event.preventDefault();
        minimoCopias = 0;
        minimoTotal = 0;
        ObtenerTodos(minimoCopias, minimoTotal);
    });
    
    ObtenerTodos(minimoCopias, minimoTotal);
    setInterval(function(e){
        ObtenerTodos(minimoCopias, minimoTotal);
    }, 2000);

    function AgregarFila(cliente){
        let row = document.createElement('tr');
        let columnaNombre = document.createElement('td');
        let columnaCopias = document.createElement('td');
        let columnaPrecio = document.createElement('td');
        let columnaAcciones = document.createElement('td');
        columnaNombre.innerHTML = cliente.thing.nombre;
        columnaCopias.innerHTML = cliente.thing.copias;
        columnaPrecio.innerHTML = cliente.thing.precio;

        let botonEditar = document.createElement('button');
        botonEditar.innerHTML = 'Editar';
        botonEditar.classList.add("tablaButton");
        botonEditar.addEventListener('click', (e)=>{
            divEditarVentas.classList.toggle("divOculto");
            botonConfirmar.idActual = cliente._id;
        });
        let botonEliminar = document.createElement('button');
        botonEliminar.innerHTML = 'Eliminar';
        botonEliminar.classList.add("tablaButton");
        botonEliminar.addEventListener('click', (e)=>{
            Eliminar(cliente._id);
        });

        columnaAcciones.appendChild(botonEditar);
        columnaAcciones.appendChild(botonEliminar);
        row.appendChild(columnaNombre);
        row.appendChild(columnaCopias);
        row.appendChild(columnaPrecio);
        row.appendChild(columnaAcciones);
        tablaBodyVentas.appendChild(row);
    }

    function Guardar(cliente){
        let data = {
            "thing": cliente,
        }
        fetch(baseUrl + "/" + groupID + "/" + collectionID, {
            'method': 'POST',
            'headers': {
                'content-type': 'application/json',
            },
            'body': JSON.stringify(data),
        }).then((r) => {
            return r.json();
        }).then((json) => {
            if (json.status === 'OK'){
                ObtenerTodos(minimoCopias, minimoTotal);
            }
        })
    }

    function CargarTres(){
        let cliente1 = {
            "nombre": "John Doe",
            "copias": "100",
            "precio": "4000",
        }
        let cliente2 = {
            "nombre": "Juan Carlos Bodoke",
            "copias": "1",
            "precio": "15",
        }
        let cliente3 = {
            "nombre": "Porky",
            "copias": "20",
            "precio": "500",
        }
        Guardar(cliente1);
        Guardar(cliente2);
        Guardar(cliente3);
        ObtenerTodos(minimoCopias, minimoTotal);
    }

    function ObtenerTodos(inputMinimoCopias, inputMinimoTotal){
        fetch(baseUrl + "/" + groupID + "/" + collectionID, {
            'method': 'GET',
        }).then((r) => {
            return r.json();
        }).then((json) => {
            MostrarDatos(json.clientes, inputMinimoCopias, inputMinimoTotal);
        })
    }

    function MostrarDatos(clientes, inputMinimoCopias, inputMinimoTotal){
        tablaBodyVentas.innerHTML = '';
        clientes.forEach(cliente=>{
            if(parseInt(cliente.thing.copias) >= inputMinimoCopias && parseInt(cliente.thing.precio) >= inputMinimoTotal){
                AgregarFila(cliente);
            }
        })
    }

    function Editar(id, inputNuevoNombreCliente, inputNuevaCantidadCopias, inputNuevoPrecioCopias){
        let data = {
            "thing": {
                "nombre": inputNuevoNombreCliente.value,
                "copias": inputNuevaCantidadCopias.value,
                "precio": inputNuevoPrecioCopias.value,
            }
        }
        fetch(baseUrl + "/" + groupID + "/" + collectionID + "/" + id, {
            'method': 'PUT',
            'headers': {
                'content-type': 'application/json',
            },
            'body': JSON.stringify(data),
        }).then((r) => {
            return r.json();
        }).then((json) => {
            if (json.status === 'OK'){
                ObtenerTodos(minimoCopias, minimoTotal);
            }
        });
        divEditarVentas.classList.toggle("divOculto");
    }

    function Eliminar(id){
        fetch(baseUrl + "/" + groupID + "/" + collectionID + "/" + id, {
            'method': 'DELETE',
        }).then((r) => {
            return r.json();
        }).then((json) => {
            ObtenerTodos(minimoCopias, minimoTotal);
        })
    }
}