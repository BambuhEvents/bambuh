# Bambüh — web

Web informativa estática (HTML + CSS + JS, sin dependencias ni build).

```
index.html        Portada
404.html          Página de error (GitHub Pages la sirve en cualquier URL inexistente; rutas absolutas)
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
- **Fotos**: sesión real de producto. Los originales en alta resolución están en `fotos-originales/` (ignorada por git: pesan ~70 MB y no deben publicarse). En `assets/img/` hay recortes optimizados en dos o tres anchos cada uno (`nombre-ANCHO.jpg`, servidos con `srcset`). Los nombres llevan palabras clave para Google Imágenes: **no renombrarlos** una vez indexados:

  | Archivo web | Original | Dónde se usa |
  |---|---|---|
  | `chill-out-boda-jardin-*` | `bambuh-19-conjunto-completo-jardin` | Portada |
  | `og.jpg` | `bambuh-19-conjunto-completo-jardin` | Vista previa al compartir (1200×630) |
  | `butaca-bambu-boda-*` | `bambuh-30-butaca-mesa-sofa` | Nosotros |
  | `sofa-bambu-chill-out-boda-*` | `bambuh-43-sofa-mesa-luz-tarde` | Servicio Chill outs |
  | `cojin-sofa-bambu-*` | `bambuh-22-cojin-mesa-detalle` | Galería (ancha) |
  | `butaca-bambu-jardin-*` | `bambuh-26-butaca-jardin-desenfocado` | Galería (vertical) |
  | `cojin-algodon-butaca-bambu-*` | `bambuh-12-cojin-brazo-bambu` | Galería |
  | `mesa-bambu-bambuh-*` | `bambuh-38-movil-bambuh-en-mano` | Galería |
  | `sofa-bambu-palmera-jardin-*` | `bambuh-06-sofa-mesa-palmera` (recorte) | Fondo de la frase |

  Sin usar de momento: `bambuh-40-movil-bambuh-en-sofa` (muy parecida a la 38). Las imágenes fuente de la marca (`favicon.jpg`, `identidad.jpg`, `logo.jpg`) están en `fotos-originales/marca/`.
- **Formulario**: se envía directamente con [Web3Forms](https://web3forms.com) (plan gratuito, 250 envíos/mes) al correo con el que se generó la access key (`WEB3FORMS_KEY` en `js/main.js`; es pública por diseño, no hace falta ocultarla). Lleva honeypot antispam y, si falla el envío, ofrece el `mailto` como alternativa.

## Publicar en GitHub Pages

1. Crear un repositorio y subir el contenido de esta carpeta (el `.nojekyll` ya está incluido).
2. En *Settings → Pages*, elegir la rama `main` y la carpeta `/ (root)`.
3. Opcional: dominio propio (`bambuh.es`) añadiendo un fichero `CNAME`.
