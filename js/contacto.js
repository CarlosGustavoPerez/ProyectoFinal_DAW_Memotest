"use strict";

var btnEnviar;

btnEnviar = document.getElementById(
    "btn-enviar-contacto"
);

btnEnviar.addEventListener(
    "click",
    enviarFormulario
);

function enviarFormulario() {

    var nombre;
    var email;
    var mensaje;
    var contenedorError;

    nombre = document
        .getElementById("contacto-nombre")
        .value
        .trim();

    email = document
        .getElementById("contacto-email")
        .value
        .trim();

    mensaje = document
        .getElementById("contacto-mensaje")
        .value
        .trim();

    contenedorError =
        document.getElementById(
            "mensaje-contacto"
        );

    contenedorError.textContent = "";

    if (!validarNombre(nombre)) {

        contenedorError.textContent =
            "Ingresá un nombre válido.";

        return;
    }

    if (!validarEmail(email)) {

        contenedorError.textContent =
            "Ingresá un email válido.";

        return;
    }

    if (mensaje.length <= 5) {

        contenedorError.textContent =
            "El mensaje debe tener más de 5 caracteres.";

        return;
    }

    abrirClienteCorreo(
        nombre,
        email,
        mensaje
    );
}

function validarNombre(nombre) {

    var expresion;

    expresion = /^[a-zA-ZÀ-ÿ0-9 ]+$/;

    return (
        nombre.length >= 3 &&
        expresion.test(nombre)
    );
}

function validarEmail(email) {

    var expresion;

    expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(email);
}

function abrirClienteCorreo(
    nombre,
    email,
    mensaje
) {

    var asunto;
    var cuerpo;
    var mailto;

    asunto =
        "Contacto desde Memotest Retro Toons";

    cuerpo =
        "Nombre: " + nombre +
        "%0D%0A" +
        "Email: " + email +
        "%0D%0A%0D%0A" +
        mensaje;

    mailto =
        "mailto:tucorreo@ejemplo.com" +
        "?subject=" +
        asunto +
        "&body=" +
        cuerpo;

    window.location.href = mailto;
}