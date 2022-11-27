"use strict"

document.addEventListener("DOMContentLoaded", function(e){
    // Declaro variables
    let emailIngreso = document.querySelector("#emailIngreso");
    let passwordIngreso = document.querySelector("#passwordIngreso");
    let formIngreso = document.querySelector("#formIngreso");
    formIngreso.addEventListener("submit", function(event){
        event.preventDefault();
        IniciarSesion();
    });

    // Declaro funciones
    function IniciarSesion(){
        if(emailIngreso.value.length!=0 && passwordIngreso.value.length!=0){
            document.location.href = "index.html";
        }
        else{
            let textoError = document.querySelector(".textoError");
            textoError.innerHTML = "*Asegurese de llenar todos los datos";
        }
    }
});