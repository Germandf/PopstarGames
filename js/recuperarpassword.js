"use strict"

export default initRecuperarPassword;

function initRecuperarPassword(){
    // Declaro variables
    let recuperarMail = document.querySelector("#recuperarMail");
    let formRecuperarPassword = document.querySelector("#formRecuperarPassword");
    formRecuperarPassword.addEventListener("submit", function(event){
        event.preventDefault();
        RecuperarContraseña();
    });
    let pagActualAJAX = document.querySelector("#pagActualAJAX");

    // Declaro funciones
    function RecuperarContraseña(){
        if(recuperarMail.value.length!=0){
            PartialIndex();
        }
        else{
            let textoError = document.querySelector(".textoError");
            textoError.innerHTML = "*Asegurese de completar su email";
        }
    }
    function PartialIndex(){
        fetch("indexcontent.html")
        .then(response => {
            response.text().then(text =>{
                pagActualAJAX.innerHTML = text;
            });
        })
    }
}