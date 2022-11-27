"use strict";

import initAdministrador from "./administrador.js";
import initIngreso from "./ingreso.js";

document.addEventListener("DOMContentLoaded", function(e){
    let navIndex = document.querySelector("#navIndex");
    navIndex.addEventListener("click", PartialIndex);
    let navJuegos = document.querySelector("#navJuegos");
    navJuegos.addEventListener("click", PartialJuegos);
    let navIngreso = document.querySelector("#navIngreso");
    navIngreso.addEventListener("click", PartialIngreso);
    let navAdministrador = document.querySelector("#navAdministrador");
    navAdministrador.addEventListener("click", PartialAdministrador);
    let pagActualAJAX = document.querySelector("#pagActualAJAX");

    PartialIndex();

    function PartialIndex(){
        fetch("indexcontent.html")
        .then(response => {
            response.text().then(text =>{
                pagActualAJAX.innerHTML = text;
            });
        })
    }

    function PartialJuegos(){
        fetch("juegos.html")
        .then(response => {
            response.text().then(text =>{
                pagActualAJAX.innerHTML = text;
            });
        })
    }

    function PartialIngreso(){
        fetch("ingreso.html")
        .then(response => {
            response.text().then(text =>{
                pagActualAJAX.innerHTML = text;
                initIngreso();
            });
        })
    }

    function PartialAdministrador(){
        fetch("administrador.html")
        .then(response => {
            response.text().then(text =>{
                pagActualAJAX.innerHTML = text;
                initAdministrador();
            });
        })
    }
});