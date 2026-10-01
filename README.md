# Bambüh — web

Web informativa estática (HTML + CSS + JS, sin dependencias ni build).

```
index.html        Página única
css/styles.css    Estilos y tokens de marca (colores, tipografía, movimiento)
js/main.js        Animaciones de scroll, cabecera, menú móvil y formulario (Web3Forms)
assets/img/       Logos, monograma, favicon e imágenes
```

## Ver en local

```bash
python -m http.server 8080
# abrir http://localhost:8080
```

## Cosas a revisar antes de publicar

- **Email e Instagram**: `hola@bambuh.es` y `@bambuh.eventos` (sacados del board de identidad). El email está en `index.html` y en `MAIL_TO` de `js/main.js`.
- **Fotos**: las actuales son recortes del board de identidad (baja resolución). Sustituir por fotos reales en `assets/img/` manteniendo los nombres.
- **Formulario**: se envía directamente con [Web3Forms](https://web3forms.com) (plan gratuito, 250 envíos/mes) al correo con el que se generó la access key (`WEB3FORMS_KEY` en `js/main.js`; es pública por diseño, no hace falta ocultarla). Lleva honeypot antispam y, si falla el envío, ofrece el `mailto` como alternativa.

## Publicar en GitHub Pages

1. Crear un repositorio y subir el contenido de esta carpeta (el `.nojekyll` ya está incluido).
2. En *Settings → Pages*, elegir la rama `main` y la carpeta `/ (root)`.
3. Opcional: dominio propio (`bambuh.es`) añadiendo un fichero `CNAME`.
