"use strict"

export default initIngreso;
import initRecuperarPassword from "./recuperarpassword.js";
import initRegistro from "./registro.js";

function initIngreso(){
    // Declaro variables
    let emailIngreso = document.querySelector("#emailIngreso");
    let passwordIngreso = document.querySelector("#passwordIngreso");
    let formIngreso = document.querySelector("#formIngreso");
    formIngreso.addEventListener("submit", function(event){
        event.preventDefault();
        IniciarSesion();
    });
    let linkRecuperarPassword = document.querySelector("#linkRecuperarPassword");
    linkRecuperarPassword.addEventListener("click", PartialRecuperarPassword);
    let linkRegistro = document.querySelector("#linkRegistro");
    linkRegistro.addEventListener("click", PartialRegistro);
    let pagActualAJAX = document.querySelector("#pagActualAJAX");

    // Declaro funciones
    function IniciarSesion(){
        if(emailIngreso.value.length!=0 && passwordIngreso.value.length!=0){
            PartialIndex();
        }
        else{
            let textoError = document.querySelector(".textoError");
            textoError.innerHTML = "*Asegurese de llenar todos los datos";
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
    function PartialRecuperarPassword(){
        fetch("recuperarpassword.html")
        .then(response => {
            response.text().then(text =>{
                pagActualAJAX.innerHTML = text;
                initRecuperarPassword();

            });
        })
    }
    function PartialRegistro(){
        fetch("registro.html")
        .then(response => {
            response.text().then(text =>{
                pagActualAJAX.innerHTML = text;
                initRegistro();
            });
        })
    }
}