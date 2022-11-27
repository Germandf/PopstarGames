"use strict";

export default initRegistro;

function initRegistro(){
    // Declaro variables form
    let nombreRegistro = document.querySelector("#nombreRegistro");
    let apellidoRegistro = document.querySelector("#apellidoRegistro");
    let emailRegistro = document.querySelector("#emailRegistro");
    let passwordRegistro = document.querySelector("#passwordRegistro");
    let password2Registro = document.querySelector("#password2Registro");

    // Declaro variables captcha
    let captchaScreen = document.querySelector(".numeroRandomCaptcha");
    let captchaEscrito = document.querySelector(".escribirCaptcha");
    let validarCaptcha = document.querySelector(".validadoCaptcha");
    let recargarCaptchaButton = document.querySelector("#recargarCaptchaButton");
    recargarCaptchaButton.addEventListener("click", NuevoNumeroCaptcha);
    let enviarCaptchaButton = document.querySelector("#enviarCaptchaButton");
    enviarCaptchaButton.addEventListener("click", CompararCaptcha);

    let formRegistro = document.querySelector("#formRegistro");
    formRegistro.addEventListener("submit", function(event){
        event.preventDefault();
        Registrarse();
    });

    // Llamo funcion e inicializo validarCaptcha en false
    NuevoNumeroCaptcha();
    validarCaptcha.value = false;

    // Declaro funciones
    function NuevoNumeroCaptcha(){
        let numeroCaptcha = Math.floor(Math.random()*1000000);
        captchaScreen.value = numeroCaptcha;
    }
    function CompararCaptcha(){
        let textoError = document.querySelector(".textoError");
        if (captchaScreen.value === captchaEscrito.value){
            textoError.innerHTML = "";
            validarCaptcha.innerHTML = "Validado";
        }
        else{
            textoError.innerHTML = "*El numero introducido no coincide con el mostrado en pantalla";
            validarCaptcha.innerHTML = "No validado";
        }
    }
    function Registrarse(){
        if(nombreRegistro.value.length!=0 && apellidoRegistro.value.length!=0 && emailRegistro.value.length!=0 && passwordRegistro.value.length!=0 && password2Registro.value.length!=0 && validarCaptcha.innerHTML == "Validado"){
            PartialIndex();
        }
        else{
            let textoErrorRegistro = document.querySelector(".textoErrorRegistro");
            textoErrorRegistro.innerHTML = "*Asegurese de llenar todos los datos y resolver el captcha";
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