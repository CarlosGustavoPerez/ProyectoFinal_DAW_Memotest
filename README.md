# 🎮 Memotest Retro Toons

Memotest Retro Toons es un juego de memoria desarrollado como Proyecto Final de Desarrollo y Arquitecturas Web (DAW).

El objetivo es encontrar todas las parejas de personajes animados clásicos de los años 80 y 90 utilizando la menor cantidad posible de intentos y en el menor tiempo.

---

## 🎨 Temática

El proyecto está inspirado en dibujos animados clásicos emitidos principalmente durante las décadas de 1980 y 1990.

Los personajes fueron seleccionados de series emblemáticas como:

- Tom y Jerry
- Scooby-Doo
- Looney Tunes
- Pinky y Cerebro
- Bob Esponja
- Thundercats
- Halcones Galácticos
- He-Man
- Tortugas Ninja
- Transformers
- Dragon Ball Z

La propuesta combina entretenimiento con contenido cultural mediante la sección de Datos Retro.

---

## ✨ Características

- ✅ Tres niveles de dificultad.
- ✅ Sistema de puntajes.
- ✅ Temporizador de partida.
- ✅ Ranking persistente mediante LocalStorage.
- ✅ Datos Retro al descubrir parejas.
- ✅ Modo Claro / Oscuro.
- ✅ Sonido configurable.
- ✅ Formulario de contacto.
- ✅ Persistencia de preferencias de usuario.
- ✅ Diseño responsive.

---

## 📖 Reglas del juego

- Ingresá tu nombre y seleccioná una dificultad.
- Descubrí las cartas para encontrar las parejas correctas.
- Las parejas están formadas por personajes relacionados de una misma serie animada.
- Las parejas no necesariamente son personajes iguales (por ejemplo: Tom y Jerry).
- Cada pareja encontrada suma puntos.
- Los errores descuentan puntaje según la dificultad elegida.
- Al encontrar una pareja se mostrará un Dato Retro sobre la serie.
- Completá todas las parejas para ganar la partida.
- Intentá obtener el mejor puntaje y aparecer en el ranking.

---

## 📊 Niveles de dificultad

### Fácil
- 16 cartas
- 8 parejas

### Medio
- 20 cartas
- 10 parejas

### Difícil
- 36 cartas
- 18 parejas

---

## 🏆 Sistema de puntaje

### Pareja correcta

+100 puntos

### Bonus de victoria

+300 puntos

### Penalización por error

| Dificultad | Penalización |
|------------|-------------|
| Fácil | -10 |
| Medio | -20 |
| Difícil | -30 |

---

## 📈 Ranking

El sistema almacena automáticamente las partidas utilizando LocalStorage.

El ranking se organiza por dificultad:

- 🥇 Primer puesto
- 🥈 Segundo puesto
- 🥉 Tercer puesto

Mostrando:

- Nombre del jugador
- Puntaje
- Tiempo

---

## 🎨 Personalización

### Temas

- 🌙 Tema Oscuro
- ☀ Tema Claro

### Sonido

- 🔊 Sonido activo
- 🔇 Sonido desactivado

Las preferencias quedan almacenadas localmente.

---

## 📚 Datos Retro

Al descubrir una pareja correctamente se muestra información relacionada:

- Personajes encontrados.
- Serie animada.
- Año de estreno.
- Creadores.
- País de origen.
- Curiosidades históricas.

Esta funcionalidad busca reforzar la temática retro del proyecto.

---

## ✅ Funcionalidades implementadas

- Generación dinámica del tablero según dificultad.
- Validación de nombre y dificultad.
- Comparación automática de parejas.
- Sistema de puntaje.
- Temporizador de partida.
- Ranking persistente con LocalStorage.
- Configuración colapsable.
- Modo claro y oscuro.
- Sonido configurable.
- Datos Retro con información histórica.
- Modal de resultado final.
- Página de contacto.

---

## 💻 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- LocalStorage

---

## 📁 Estructura del proyecto

```text
ProyectoFinal_DAW_Memotest
│
├── index.html
├── contacto.html
│
├── css
│   ├── reset.css
│   └── estilos.css
│
├── js
│   ├── datos.js
│   ├── juego.js
│   ├── ranking.js
│   ├── tema.js
│   └── contacto.js
│
├── assets
│   ├── images
│   └── sounds
│
└── README.md
```

---

## 🚀 Ejecución

1. Clonar el repositorio.

```bash
git clone https://github.com/CarlosGustavoPerez/ProyectoFinal_DAW_Memotest.git
```

2. Abrir:

```text
index.html
```

en cualquier navegador moderno.

---

## 🔗 Repositorio

https://github.com/CarlosGustavoPerez/ProyectoFinal_DAW_Memotest

---

## 🌐 GitHub Pages

Pendiente de publicación.

---

## 👨‍💻 Autor

Carlos Gustavo Pérez

Proyecto Final – Desarrollo y Arquitecturas Web (DAW)