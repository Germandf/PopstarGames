"use strict"

document.addEventListener("DOMContentLoaded", function(e){
    // Declaro variables
    let recuperarMail = document.querySelector("#recuperarMail");
    let formRecuperarPassword = document.querySelector("#formRecuperarPassword");
    formRecuperarPassword.addEventListener("submit", function(event){
        event.preventDefault();
        RecuperarContraseña();
    });

    // Declaro funciones
    function RecuperarContraseña(){
        if(recuperarMail.value.length!=0){
            document.location.href = "index.html";
        }
        else{
            let textoError = document.querySelector(".textoError");
            textoError.innerHTML = "*Asegurese de completar su email";
        }
    }
})