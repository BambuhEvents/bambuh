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

- **Email e Instagram**: `hola@bambuh.es` y `@bambuhevents` (sacados del board de identidad). El email está en `index.html` y en `MAIL_TO` de `js/main.js`.
- **Fotos**: sesión real de producto. Los originales en alta resolución están en `fotos-originales/` (ignorada por git: pesan ~70 MB y no deben publicarse). En `assets/img/` hay recortes optimizados en dos o tres anchos cada uno (`nombre-ANCHO.jpg`, servidos con `srcset`):

  | Archivo web | Original | Dónde se usa |
  |---|---|---|
  | `hero-*` | `bambuh-19-conjunto-completo-jardin` | Portada |
  | `og.jpg` | `bambuh-19-conjunto-completo-jardin` | Vista previa al compartir (1200×630) |
  | `nosotros-*` | `bambuh-30-butaca-mesa-sofa` | Nosotros |
  | `chillout-*` | `bambuh-43-sofa-mesa-luz-tarde` | Servicio Chill outs |
  | `materiales-*` | `bambuh-22-cojin-mesa-detalle` | Galería (ancha) |
  | `bambu-*` | `bambuh-26-butaca-jardin-desenfocado` | Galería (vertical) |
  | `textiles-*` | `bambuh-12-cojin-brazo-bambu` | Galería |
  | `identidad-*` | `bambuh-38-movil-bambuh-en-mano` | Galería |
  | `jardin-*` | `bambuh-06-sofa-mesa-palmera` (recorte) | Fondo de la frase |

  Sin usar de momento: `bambuh-40-movil-bambuh-en-sofa` (muy parecida a la 38).
- **Formulario**: se envía directamente con [Web3Forms](https://web3forms.com) (plan gratuito, 250 envíos/mes) al correo con el que se generó la access key (`WEB3FORMS_KEY` en `js/main.js`; es pública por diseño, no hace falta ocultarla). Lleva honeypot antispam y, si falla el envío, ofrece el `mailto` como alternativa.

## Publicar en GitHub Pages

1. Crear un repositorio y subir el contenido de esta carpeta (el `.nojekyll` ya está incluido).
2. En *Settings → Pages*, elegir la rama `main` y la carpeta `/ (root)`.
3. Opcional: dominio propio (`bambuh.es`) añadiendo un fichero `CNAME`.
