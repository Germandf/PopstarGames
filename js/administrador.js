"use strict"

document.addEventListener("DOMContentLoaded", function(e){
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

    function AgregarJuego(){
        let inputNombreJuego = document.querySelector("#inputNombreJuego").value;
        let inputFechaJuego = document.querySelector("#inputFechaJuego").value;
        let inputPrecioJuego = parseInt(document.querySelector("#inputPrecioJuego").value) || 0;
        let textoError = document.querySelector(".textoError");
        if(inputNombreJuego !== "" && inputFechaJuego !== "" && inputPrecioJuego !== 0){
            let juego = {
                "nombre": inputNombreJuego,
                "fecha": inputFechaJuego,
                "precio": inputPrecioJuego,
            }
            arrayJuegos.push(juego);
            textoError.innerHTML = "";
            ActualizarTabla();
        }
        else{
            textoError.innerHTML = "*Asegúrese de poner un valor correcto en todos los campos";
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
});