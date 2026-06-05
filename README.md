# Casa Azul · Landing

Landing tipo blog para la **Residencia Artística Casa Azul**: una experiencia
multimedia y multidisciplinar presentada con estética de **trazo de pizarra /
blueprint** en azul profundo con acentos amarillos, inspirada en la identidad
de la Casa.

## Estructura

- `index.html` — estructura de la página (hero, experiencia, bitácora/blog, galería, agenda, contacto).
- `styles.css` — estilo "tiza sobre pizarra": cuadrícula blueprint, tipografía manuscrita, bordes dibujados a mano.
- `script.js` — animaciones de aparición al hacer scroll y navegación activa.

## Cómo verla

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Personalizar

- **Fotos:** crea una carpeta `/img` y reemplaza los marcos `.frame` de la galería por tus imágenes.
- **Textos del blog:** edita las `<article class="post">` en `index.html`.
- **Colores:** ajusta las variables `--blue-deep`, `--yellow`, etc. al inicio de `styles.css`.
- **Agenda:** actualiza la lista `.agenda-list`.

Las tipografías manuscritas (Caveat / Architects Daughter) se cargan desde Google Fonts.
