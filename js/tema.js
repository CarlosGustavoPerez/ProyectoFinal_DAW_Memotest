"use strict";

var btnTema = document.getElementById("btn-tema");

btnTema.addEventListener("click",cambiarTema);
cargarTemaGuardado();

function cambiarTema() {
    document.body.classList.toggle("tema-claro");
    guardarTema();
    actualizarTextoBoton();
}

function guardarTema() {
    var tema;
    tema = document.body.classList.contains("tema-claro") ? "claro" : "oscuro";
    localStorage.setItem("tema",tema);
}

function cargarTemaGuardado() {
    var tema;
    tema = localStorage.getItem("tema");
    if (tema === "claro") {
        document.body.classList.add("tema-claro");
    }
    actualizarTextoBoton();
}

function actualizarTextoBoton() {
    if (
        document.body.classList.contains("tema-claro")
    ) {
        btnTema.textContent ="☀ Modo Oscuro";
    } else {
        btnTema.textContent ="🌙 Modo Claro";
    }
}