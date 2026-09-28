# Almara — web

Web informativa estática (HTML + CSS + JS, sin dependencias ni build).

```
index.html        Página única
css/styles.css    Estilos y tokens de marca (colores, tipografía, movimiento)
js/main.js        Animaciones de scroll, cabecera, menú móvil y formulario (mailto)
assets/img/       Logos, monograma, favicon e imágenes
```

## Ver en local

```bash
python -m http.server 8080
# abrir http://localhost:8080
```

## Cosas a revisar antes de publicar

- **Email e Instagram**: `hola@almara.es` y `@almara.eventos` (sacados del board de identidad). El email está en `index.html` y en `MAIL_TO` de `js/main.js`.
- **Fotos**: las actuales son recortes del board de identidad (baja resolución). Sustituir por fotos reales en `assets/img/` manteniendo los nombres.
- **Formulario**: abre el cliente de correo del visitante con el mensaje ya redactado. Si más adelante se quiere envío directo, se puede conectar a Formspree o similar sin cambiar el diseño.

## Publicar en GitHub Pages

1. Crear un repositorio y subir el contenido de esta carpeta (el `.nojekyll` ya está incluido).
2. En *Settings → Pages*, elegir la rama `main` y la carpeta `/ (root)`.
3. Opcional: dominio propio (`almara.es`) añadiendo un fichero `CNAME`.
