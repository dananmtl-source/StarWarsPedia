# StarWarsPedia

Enciclopedia sencilla de Star Wars hecha con HTML, CSS y JavaScript. Los datos se obtienen de la API pública [SWAPI](https://swapi.dev/), las imágenes las sacamos de starwarsgallery.netlify.app.

## Cómo abrirlo

El proyecto usa módulos ES (`<script type="module">`), así que no funciona bien abriendo `index.html` con doble clic (`file://`). Hay que usar un servidor local:

- **VS Code:** abre la carpeta del proyecto, haz clic derecho en `index.html` y elige **Open with Live Server**.
- **Python:** desde la carpeta del proyecto, ejecuta `python3 -m http.server 8000` y abre <http://localhost:8000/>.

Necesita conexión a Internet para cargar SWAPI y las imágenes.

## Secciones

- **Portada (`index.html`):** tarjetas de Planetas, Especies, Personajes, Naves y Vehículos.
- **Listas (`html/detailsList.html`):** elementos de la categoría elegida, con imagen y botones Previous/Next.
- **Fichas (`html/details.html`):** detalles del elemento elegido.
- **Favoritos (`html/favorites.html`):** elementos guardados como favoritos.

## Favoritos

- **Like** guarda un elemento en favoritos y **Unlike** lo quita.
- Los favoritos se guardan en el `localStorage` del navegador.
- En la página de favoritos se puede filtrar por tipo (categoría) y buscar por nombre.

## Prueba rápida

1. Abre la portada con un servidor local.
2. Entra en una categoría y abre la ficha de un elemento.
3. Pulsa **Like** en elementos de dos categorías distintas.
4. Ve a **Favoritos** y prueba el filtro por tipo, la búsqueda y **Unlike**.
