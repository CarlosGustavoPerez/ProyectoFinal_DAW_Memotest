"use strict";

var btnRanking = document.getElementById("btn-ranking");
var btnLimpiarRanking = document.getElementById("btn-limpiar-ranking");
btnRanking.addEventListener("click", mostrarRanking);
btnLimpiarRanking.addEventListener("click", limpiarRanking);

document.getElementById("cerrar-modal-ranking").addEventListener("click", cerrarRanking);

function guardarPartidaRanking(partida) {
    var ranking;
    ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.push(partida);
    localStorage.setItem("ranking", JSON.stringify(ranking));
}
function obtenerRanking() {
    return JSON.parse(localStorage.getItem("ranking")) || [];
}
function cerrarRanking() {
    document.getElementById("modal-ranking").classList.add("oculto");
}
function mostrarRanking() {

    var ranking;
    var contenido;

    ranking = obtenerRanking();

    if (ranking.length === 0) {

        contenido =
            "<p>📭 No hay partidas registradas.</p>";

    } else {

        contenido =
            "<div id='ranking-columnas'>";

        contenido += generarBloqueDificultad(
            ranking,
            "facil",
            "FÁCIL"
        );

        contenido += generarBloqueDificultad(
            ranking,
            "medio",
            "MEDIO"
        );

        contenido += generarBloqueDificultad(
            ranking,
            "dificil",
            "DIFÍCIL"
        );

        contenido += "</div>";
    }

    document.getElementById(
        "contenido-ranking"
    ).innerHTML = contenido;

    document.getElementById(
        "modal-ranking"
    ).classList.remove("oculto");
}
function generarBloqueDificultad(ranking, dificultad, titulo) {
    var resultados;
    var contenido;
    var i;
    resultados = ranking.filter(function (partida) {
        return partida.dificultad === dificultad;
    }
    );
    resultados.sort(function (a, b) {
        return b.puntaje - a.puntaje;
    }
    );
    contenido = "<div class='columna-ranking'>" + "<h3>" + titulo + "</h3>" + "<p>Top 10</p>";
    for (i = 0; i < resultados.length && i < 10; i++) {
        var posicion;
        if (i === 0) {
            posicion = "🥇 ";
        } else if (i === 1) {
            posicion = "🥈 ";
        } else if (i === 2) {
            posicion = "🥉 ";
        } else {
            posicion = (i + 1) + ". ";
        }
        contenido +=
            "<div class='registro-ranking'>" +
            "<div class='ranking-nombre'>" +
            posicion +
            resultados[i].nombre +
            "</div>" +
            "<div class='ranking-puntaje'>" +
            "Puntaje: " +
            resultados[i].puntaje +
            "</div>" +
            "<div class='ranking-tiempo'>" +
            "Tiempo: " +
            resultados[i].tiempo +
            "</div>" +
            "</div>";
    }
    contenido += "</div>";
    return contenido;
}
function limpiarRanking() {
    localStorage.removeItem("ranking");
    mostrarRanking();
}
