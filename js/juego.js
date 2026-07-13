"use strict";

var tablero = document.getElementById("tablero");
var panelJuego = document.getElementById("panel-juego");
var zonaJuego = document.getElementById("zona-juego")
var panelConfiguracion = document.getElementById("configuracion-partida");
var modalRetro = document.getElementById("modal-retro");
var modalFinal = document.getElementById("modal-final");
var modalRanking = document.getElementById("modal-ranking");
var mensajeError = document.getElementById("mensaje-error");
var btnIniciar = document.getElementById("btn-iniciar");
var btnReiniciar = document.getElementById("btn-reiniciar");
var btnConfiguracion = document.getElementById("btn-configuracion")
var btnSonido = document.getElementById("btn-sonido");
var btnCerrarModalFinal = document.getElementById("cerrar-modal-final");
var btnCerrarModalRetro = document.getElementById("cerrar-modal-retro");
var btnTema = document.getElementById("btn-tema");
var modalNivel = document.getElementById("modal-nivel");
var btnSiguienteNivel = document.getElementById("btn-siguiente-nivel");
var chkModoProgresivo = document.getElementById("modo-progresivo");
var radiosDificultad = document.getElementsByName("dificultad");

var nombreJugador = "";
var dificultadSeleccionada = "";
var sonidoActivo = localStorage.getItem("sonido") !== "off";
var modoProgresivo = false;
var nivelesProgresivos = ["facil", "medio", "dificil"];
var indiceNivelActual = 0;
var cartasSeleccionadas = [];
var bloqueoTablero = false;
var partidaFinalizada = false;
var paresEncontrados = 0;
var intentos = 0;
var errores = 0;
var puntaje = 0;
var puntajeBase = 0;
var tiempoSegundos = 0;
var temporizador = null;
var timeoutComparacion = null;
var juegoIniciado = false;
var sonidoCarta = new Audio("assets/sounds/carta.mp3");
var sonidoAcierto = new Audio("assets/sounds/acierto.mp3");
var sonidoError = new Audio("assets/sounds/error.mp3");
var sonidoVictoria = new Audio("assets/sounds/victoria.mp3");
var rachaAciertos = 0;
var rachaErrores = 0;
var bonusRacha = 0;
var bonusVelocidad = 0;
var bonusEficiencia = 0;

btnConfiguracion.classList.add("oculto");
btnIniciar.addEventListener("click", iniciarPartida);
btnReiniciar.addEventListener("click", reiniciarPartida);
btnConfiguracion.addEventListener("click", alternarConfiguracion);
btnCerrarModalFinal.addEventListener("click", cerrarModalFinal);
btnCerrarModalRetro.addEventListener("click", cerrarModalRetro);
btnSonido.addEventListener("click", cambiarEstadoSonido);
btnSiguienteNivel.addEventListener("click", avanzarNivel);
chkModoProgresivo.addEventListener("change", manejarModoProgresivo);
for (var i = 0; i < radiosDificultad.length; i++) {
    radiosDificultad[i].addEventListener("change", manejarDificultad);
}

function iniciarPartida() {
    nombreJugador = document.getElementById("nombre-jugador").value.trim();
    dificultadSeleccionada = obtenerDificultadSeleccionada();
    modoProgresivo = document.getElementById("modo-progresivo").checked;
    if (modoProgresivo) {
        indiceNivelActual = 0;
        dificultadSeleccionada = nivelesProgresivos[indiceNivelActual];
    }
    if (!validarDatosInicio()) {
        return;
    }
    mensajeError.textContent = "";
    zonaJuego.classList.remove("oculto");
    panelConfiguracion.classList.add("configuracion-colapsada");
    btnConfiguracion.classList.remove("oculto");
    limpiarEstadoJuego();
    reiniciarEstadisticas();
    reiniciarTemporizador();
    actualizarInformacionModo();
    generarTablero();
}
function obtenerDificultadSeleccionada() {
    var opciones;
    var i;
    opciones = document.getElementsByName("dificultad");
    for (i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            return opciones[i].value;
        }
    }
    return "";
}
function mostrarModalNivel() {
    document.getElementById("mensaje-nivel").innerHTML =
        "<p><strong>Progreso:</strong> " + (indiceNivelActual + 1) + " de " + nivelesProgresivos.length + "</p>" +
        "<p><strong>Nivel:</strong> " + obtenerNombreNivel() + "</p>" +
        "<p><strong>Intentos:</strong> " + intentos + "</p>" +
        "<p><strong>Errores:</strong> " + errores + "</p>" +
        "<p><strong>Aciertos:</strong> " + calcularPorcentajeAciertos() + "%</p>" +
        "<p><strong>Puntaje acumulado:</strong> " + puntaje + "</p>";
    modalNivel.classList.remove("oculto");
}
function avanzarNivel() {
    modalNivel.classList.add("oculto");
    indiceNivelActual++;
    dificultadSeleccionada = nivelesProgresivos[indiceNivelActual];
    actualizarInformacionModo();
    cartasSeleccionadas = [];
    bloqueoTablero = false;
    paresEncontrados = 0;
    tablero.innerHTML = "";
    generarTablero();
    actualizarEstadisticas();
}
function manejarModoProgresivo() {
    var i;
    if (!chkModoProgresivo.checked) {
        return;
    }
    for (i = 0; i < radiosDificultad.length; i++) {
        radiosDificultad[i].checked = false;
    }
}
function manejarDificultad() {
    chkModoProgresivo.checked = false;
}
function actualizarInformacionModo() {
    var textoModo;
    var textoNivel;
    if (modoProgresivo) {
        textoModo = "Progresivo";
    } else {
        textoModo = "Normal";
    }
    if (dificultadSeleccionada === "") {
        textoNivel = "-";
    } else {
        textoNivel = obtenerNombreNivel();
    }
    document.getElementById("modo-actual").textContent = textoModo;
    document.getElementById("nivel-actual").textContent = textoNivel;
}
function obtenerNombreNivel() {
    if (dificultadSeleccionada === "facil") {
        return "Fácil";
    }
    if (dificultadSeleccionada === "medio") {
        return "Medio";
    }
    return "Difícil";
}
function alternarConfiguracion() {
    panelConfiguracion.classList.toggle("configuracion-colapsada");
    if (
        panelConfiguracion.classList.contains("configuracion-colapsada")
    ) {
        btnConfiguracion.textContent = "▶ Configuración";
    } else {
        btnConfiguracion.textContent = "▼ Configuración";
    }
}
function actualizarTextoBoton() {
    if (
        document.body.classList.contains(
            "tema-claro"
        )
    ) {
        btnTema.textContent =
            "☀ Modo Oscuro";

    } else {
        btnTema.textContent =
            "🌙 Modo Claro";
    }
}
function actualizarBotonSonido() {
    if (sonidoActivo) {
        btnSonido.textContent = "🔊 Sonido ON";
    } else {
        btnSonido.textContent = "🔇 Sonido OFF";
    }
}
function validarDatosInicio() {
    if (nombreJugador.length < 3) {
        mensajeError.textContent = "El nombre debe tener al menos 3 caracteres.";
        return false;
    }
    if (!modoProgresivo && dificultadSeleccionada === "") {
        mensajeError.textContent = "Debés seleccionar una dificultad.";
        return false;
    }
    return true;
}
function generarTablero() {
    var cartasNivel;
    var cartasMezcladas;
    var i;
    var carta;
    var elementoCarta;

    tablero.innerHTML = "";
    cartasNivel = obtenerCartasPorNivel();
    cartasMezcladas = mezclarCartas(cartasNivel);
    for (i = 0; i < cartasMezcladas.length; i++) {
        carta = cartasMezcladas[i];
        elementoCarta = document.createElement("div");
        elementoCarta.className = "carta carta-tapada";
        elementoCarta.setAttribute("data-id", carta.id);
        elementoCarta.setAttribute("data-numero", i + 1);
        elementoCarta.innerHTML =
            '<img src="' + carta.imagen + '" alt="' + carta.nombre + '">' + '<div class="carta-nombre">' + carta.nombre + '</div>' + '</div>' +
            '<div class="carta-serie">' + carta.serie + '</div>';
        elementoCarta.addEventListener("click", manejarClickCarta);
        tablero.appendChild(elementoCarta);
    }
}
function obtenerCartasPorNivel() {
    if (dificultadSeleccionada === "facil") {
        return CARTAS.slice(0, 16);
    }
    if (dificultadSeleccionada === "medio") {
        return CARTAS.slice(0, 20);
    }
    return CARTAS.slice(0, 36);
}
function mezclarCartas(cartas) {
    var copia;
    var i;
    var j;
    var temporal;

    copia = cartas.slice();
    for (i = copia.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temporal = copia[i];
        copia[i] = copia[j];
        copia[j] = temporal;
    }
    return copia;
}
function manejarClickCarta(evento) {
    var carta;
    carta = evento.currentTarget;
    if (bloqueoTablero) {
        return;
    }
    if (!carta.classList.contains("carta-tapada")) {
        return;
    }
    iniciarTemporizador();
    carta.classList.remove("carta-tapada");
    reproducirSonido(sonidoCarta);
    cartasSeleccionadas.push(carta);
    if (cartasSeleccionadas.length === 2) {
        bloqueoTablero = true;
        timeoutComparacion = setTimeout(
            verificarPareja,
            1000
        );
    }
}
function verificarPareja() {
    var cartaUno;
    var cartaDos;
    var idUno;
    var idDos;
    cartaUno = cartasSeleccionadas[0];
    cartaDos = cartasSeleccionadas[1];
    idUno = parseInt(cartaUno.getAttribute("data-id"), 10);
    idDos = parseInt(cartaDos.getAttribute("data-id"), 10);
    intentos++;
    if (sonPareja(idUno, idDos)) {
        cartaUno.classList.add("carta-correcta");
        cartaDos.classList.add("carta-correcta");
        paresEncontrados++;
        puntaje += 100;
        puntajeBase += 100;

        rachaAciertos++;
        rachaErrores = 0;

        if (rachaAciertos >= 2) {

            bonusRacha +=
                (rachaAciertos - 1) * 20;
        }
        if (paresEncontrados === obtenerCantidadParesNivel()) {
            partidaFinalizada = true;
        }
        reproducirSonido(sonidoAcierto);
        mostrarDatoRetro(idUno, idDos);
    } else {
        errores++;
        rachaErrores++;
        rachaAciertos = 0;
        reproducirSonido(sonidoError);
        puntaje -= obtenerPenalizacion() * rachaErrores;
        cartaUno.classList.add("carta-error");
        cartaDos.classList.add("carta-error");
        setTimeout(function () {
            cartaUno.classList.remove("carta-error");
            cartaDos.classList.remove("carta-error");
            cartaUno.classList.add("carta-tapada");
            cartaDos.classList.add("carta-tapada");
            bloqueoTablero = false;
        }, 500);
    }
    actualizarEstadisticas();
    cartasSeleccionadas = [];

}
function sonPareja(idUno, idDos) {
    var i;
    for (i = 0; i < CARTAS.length; i++) {
        if (CARTAS[i].id === idUno) {
            return CARTAS[i].parejaId === idDos;
        }
    }
    return false;
}
function calcularBonusVelocidad() {
    if (tiempoSegundos <= 120) {
        return 300;
    }
    if (tiempoSegundos <= 240) {
        return 150;
    }
    return 0;
}
function calcularBonusEficiencia() {
    var porcentaje;
    porcentaje =
        calcularPorcentajeAciertos();
    if (porcentaje >= 90) {
        return 300;
    }
    if (porcentaje >= 75) {
        return 150;
    }
    return 0;
}
function reiniciarEstadisticas() {
    intentos = 0;
    errores = 0;
    paresEncontrados = 0;
    puntaje = 0;
    rachaAciertos = 0;
    rachaErrores = 0;

    bonusRacha = 0;
    bonusVelocidad = 0;
    bonusEficiencia = 0;

    puntajeBase = 0;
    actualizarEstadisticas();
}
function reiniciarTemporizador() {

    tiempoSegundos = 0;
    juegoIniciado = false;

    if (temporizador !== null) {
        clearInterval(temporizador);
    }

    temporizador = null;

    actualizarTemporizador();
}
function actualizarEstadisticas() {
    document.getElementById("intentos").textContent = intentos;
    document.getElementById("errores").textContent = errores;
    document.getElementById("pares-encontrados").textContent = paresEncontrados;
    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("porcentaje-aciertos").textContent = calcularPorcentajeAciertos() + "%";
}
function actualizarTemporizador() {

    var minutos;
    var segundos;
    var texto;

    minutos = Math.floor(tiempoSegundos / 60);
    segundos = tiempoSegundos % 60;

    texto =
        agregarCero(minutos) +
        ":" +
        agregarCero(segundos);

    document.getElementById("temporizador").textContent =
        texto;
}
function agregarCero(numero) {

    if (numero < 10) {
        return "0" + numero;
    }

    return numero;
}
function iniciarTemporizador() {

    if (juegoIniciado) {
        return;
    }

    juegoIniciado = true;

    temporizador = setInterval(
        actualizarTiempo,
        1000
    );
}
function actualizarTiempo() {

    tiempoSegundos++;

    actualizarTemporizador();
}
function pausarTemporizador() {

    if (temporizador !== null) {
        clearInterval(temporizador);
        temporizador = null;
    }
}
function obtenerPenalizacion() {
    if (dificultadSeleccionada === "facil") {
        return 10;
    }
    if (dificultadSeleccionada === "medio") {
        return 20;
    }
    return 30;
}
function obtenerCantidadParesNivel() {

    if (dificultadSeleccionada === "facil") {
        return 8;
    }

    if (dificultadSeleccionada === "medio") {
        return 10;
    }

    return 18;
}
function finalizarPartida() {
    bonusVelocidad = calcularBonusVelocidad();
    bonusEficiencia = calcularBonusEficiencia();
    puntaje += bonusRacha;
    puntaje += bonusVelocidad;
    puntaje += bonusEficiencia;
    reproducirSonido(sonidoVictoria);
    clearInterval(temporizador);
    actualizarEstadisticas();
    guardarResultadoRanking();
    mostrarResultadoFinal();
}
function calcularPorcentajeAciertos() {
    if (intentos === 0) {
        return 0;
    }
    return Math.round(((intentos - errores) / intentos) * 100);
}
function mostrarResultadoFinal() {
    var resultado;
    resultado =
        "<p><strong>Jugador:</strong> " + nombreJugador + "</p>" +
        "<p><strong>Dificultad:</strong> " + dificultadSeleccionada + "</p>" +
        "<p><strong>Intentos:</strong> " + intentos + "</p>" +
        "<p><strong>Errores:</strong> " + errores + "</p>" +
        "<p><strong>Aciertos:</strong> " + calcularPorcentajeAciertos() + "%</p>" +
        "<p><strong>Pares encontrados:</strong> " + paresEncontrados + "</p>" +
        "<p><strong>Tiempo:</strong> " + document.getElementById("temporizador").textContent + "</p>" +
        "<p><strong>Puntaje Base:</strong> " + puntajeBase + "</p>" +
        "<p><strong>Bonus Racha:</strong> +" + bonusRacha + "</p>" +
        "<p><strong>Bonus Velocidad:</strong> +" + bonusVelocidad + "</p>" +
        "<p><strong>Bonus Eficiencia:</strong> +" + bonusEficiencia + "</p>" +
        "<p><strong>Puntaje Final:</strong> " + puntaje + "</p>";
    document.getElementById("resultado-final").innerHTML = resultado;
    document.getElementById("modal-final").classList.remove("oculto");
}
function cerrarModalFinal() {

    document
        .getElementById("modal-final")
        .classList.add("oculto");
}
function reiniciarPartida() {
    if (modoProgresivo) {
        indiceNivelActual = 0;
        dificultadSeleccionada =nivelesProgresivos[indiceNivelActual];
        actualizarInformacionModo();
    }
    limpiarEstadoJuego();
    reiniciarEstadisticas();
    reiniciarTemporizador();
    generarTablero();
}
function mostrarDatoRetro(idUno, idDos) {
    var personajeUno;
    var personajeDos;
    personajeUno = obtenerCartaPorId(idUno);
    personajeDos = obtenerCartaPorId(idDos);
    if (personajeUno === null || personajeDos === null) {
        return;
    }
    document.getElementById("contenido-retro").innerHTML =
        "<div class='pareja-retro'>" +
        "<div class='personaje-retro'>" +
        "<img src='" + personajeUno.imagen + "' alt='" + personajeUno.nombre + "'>" +
        "<h3>" + personajeUno.nombre + "</h3>" +
        "</div>" +
        "<div class='personaje-retro'>" +
        "<img src='" + personajeDos.imagen + "' alt='" + personajeDos.nombre + "'>" +
        "<h3>" + personajeDos.nombre + "</h3>" +
        "</div>" +
        "</div>" +
        "<p><strong>Serie:</strong> " + personajeUno.serie + "</p>" +
        "<p><strong>Año:</strong> " + personajeUno.anio + "</p>" +
        "<p><strong>Creador:</strong> " + personajeUno.creador + "</p>" +
        "<p><strong>País:</strong> " + personajeUno.pais + "</p>" +
        "<p><strong>Curiosidad:</strong> " + personajeUno.curiosidad + "</p>";
    pausarTemporizador();
    modalRetro.classList.remove("oculto");
}
function obtenerCartaPorId(idBuscado) {
    var i;
    for (i = 0; i < CARTAS.length; i++) {
        if (CARTAS[i].id === idBuscado) {
            return CARTAS[i];
        }
    }
    return null;
}
function cerrarModalRetro() {
    modalRetro.classList.add("oculto");
    if (partidaFinalizada) {
        partidaFinalizada = false;
        if (modoProgresivo && indiceNivelActual < nivelesProgresivos.length - 1
        ) {
            mostrarModalNivel();
        } else {
            finalizarPartida();
        }
        return;
    }
    bloqueoTablero = false;
    if (juegoIniciado && temporizador === null) {
        temporizador = setInterval(
            actualizarTiempo,
            1000
        );
    }
}
function guardarResultadoRanking() {
    var partida;
    partida = {
        nombre: nombreJugador,
        dificultad: dificultadSeleccionada,
        intentos: intentos,
        errores: errores,
        tiempo: document.getElementById("temporizador").textContent,
        puntaje: puntaje,
        fecha: new Date().toLocaleString()
    };
    guardarPartidaRanking(partida);
}
function reproducirSonido(audio) {
    if (!sonidoActivo) {
        return;
    }
    audio.currentTime = 0;
    audio.play();
}
function cambiarEstadoSonido() {
    sonidoActivo = !sonidoActivo;
    actualizarBotonSonido();
    localStorage.setItem("sonido", sonidoActivo ? "on" : "off");
}
function limpiarEstadoJuego() {
    if (timeoutComparacion !== null) {
        clearTimeout(timeoutComparacion);
        timeoutComparacion = null;
    }
    cartasSeleccionadas = [];
    bloqueoTablero = false;
    modalRetro.classList.add("oculto");
    modalFinal.classList.add("oculto");
}
