"use strict";

// Declaro variables

let logoNav = document.querySelector(".logoNav");
logoNav.addEventListener("click", IrAInicio);

let recuperarMail = document.querySelector("#recuperarMail");
let recuperarButton = document.querySelector(".recuperarButton");

let emailIngreso = document.querySelector("#emailIngreso");
let passwordIngreso = document.querySelector("#passwordIngreso");
let ingresarButton = document.querySelector(".ingresarButton");

let nombreRegistro = document.querySelector("#nombreRegistro");
let apellidoRegistro = document.querySelector("#apellidoRegistro");
let emailRegistro = document.querySelector("#emailRegistro");
let passwordRegistro = document.querySelector("#passwordRegistro");
let password2Registro = document.querySelector("#password2Registro");

let captchaScreen = document.querySelector(".numeroRandomCaptcha");
let captchaEscrito = document.querySelector(".escribirCaptcha");
let recargarCaptchaButton = document.querySelector("#recargarCaptchaButton");
let enviarCaptchaButton = document.querySelector("#enviarCaptchaButton");
let validarCaptcha = document.querySelector(".validadoCaptcha");
let registrarButton = document.querySelector(".registrarButton");

// Agrego eventos a sus paginas correspondientes

let paginaRecuperar = document.querySelector("#paginaRecuperar");
if(paginaRecuperar!==null){
    recuperarButton.addEventListener("click", RecuperarContraseña);
}

let paginaIngreso = document.querySelector("#paginaIngreso");
if(paginaIngreso!==null){
    ingresarButton.addEventListener("click", IniciarSesion);
}

let paginaRegistro = document.querySelector("#paginaRegistro");
if(paginaRegistro!==null){
    recargarCaptchaButton.addEventListener("click", NuevoNumeroCaptcha);
    enviarCaptchaButton.addEventListener("click", CompararCaptcha);
    registrarButton.addEventListener("click", Registrarse);
}

// Seteo datos al cargar/recargar la pagina (solo para paginaRegistro)

NuevoNumeroCaptcha();
validarCaptcha.value = false;

// Declaro funciones

function NuevoNumeroCaptcha(){
    let numeroCaptcha = Math.floor(Math.random()*1000000);
    captchaScreen.value = numeroCaptcha;
}

function CompararCaptcha(){
    if (captchaScreen.value == captchaEscrito.value){
        validarCaptcha.innerHTML = "Validado";
    }
    else{
        alert("El numero introducido no coincide con el mostrado en pantalla, intentelo de nuevo o cargue otro numero");
        validarCaptcha.innerHTML = "No validado";
    }
}

function Registrarse(){
    if(nombreRegistro.value.length!=0 && apellidoRegistro.value.length!=0 && emailRegistro.value.length!=0 && passwordRegistro.value.length!=0 && password2Registro.value.length!=0 && validarCaptcha.innerHTML == "Validado"){
        document.location.href = "registroCompletado.html";
    }
    else{
        alert("Asegurese de llenar todos los datos y resolver el captcha");
    }
    
}

function IniciarSesion(){
    if(emailIngreso.value.length!=0 && passwordIngreso.value.length!=0){
        document.location.href = "index.html";
    }
    else{
        alert("Asegurese de llenar todos los datos");
    }
}

function RecuperarContraseña(){
    if(recuperarMail.value.length!=0){
        document.location.href = "index.html";
    }
    else{
        alert("Asegurese de completar su email");
    }
}

function IrAInicio(){
    document.location.href = "index.html";
}