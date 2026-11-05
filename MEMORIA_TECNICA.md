# Memoria técnica de StarWarsPedia

Enciclopedia de Star Wars en HTML, CSS y JavaScript sin frameworks ni dependencias. Los datos vienen de SWAPI (`https://swapi.dev/api/`) y las imágenes de `https://starwarsgallery.netlify.app/assets/{categoría}/{id}.jpg`.

## Cómo abrirlo

Los scripts son módulos ES (`type="module"`), así que hay que servir la carpeta por HTTP:

- VS Code: **Open with Live Server** sobre `index.html`.
- Terminal, desde la carpeta: `python3 -m http.server 8000` y abrir `http://localhost:8000/`.

Abrir `index.html` con doble clic (`file://`) no carga los módulos. Hace falta Internet para SWAPI y las imágenes.

## API (`js/functions.js`)

- `callApiByCategory(apiUrl, category, filtro)`: si `apiUrl` es `null`, pide `https://swapi.dev/api/{category}`; si no, pide la URL recibida (la de Previous/Next). Si hay `filtro`, añade `?search=`. Devuelve el JSON o, si falla, escribe el error en consola.
- `callApiByElement(category, id)`: pide `https://swapi.dev/api/{category}/{id}`.
- `buildElementList` y `buildElementDetails` copian los datos de SWAPI en las clases de `js/class/class.js` (`People`, `Planets`, `Species`, `Starships`, `Vehicles` y `elementList`, que guarda `previous`, `next` y la lista).

## Páginas

- **Portada (`index.html`)**: cinco enlaces a `html/detailsList.html?category=` con `planets`, `species`, `people`, `starships` y `vehicles`.
- **Lista (`html/detailsList.html` + `js/detailsList.js`)**: lee `category` (y `search`, si viene en la URL), llama a la API y crea las tarjetas con `createListElementCard`. Cada tarjeta lleva imagen, nombre, enlace a la ficha y botón Like/Unlike. Previous/Next se activan según `previous`/`next` de SWAPI y cargan esa página.
- **Ficha (`html/details.html` + `js/details.js`)**: lee `category` e `id`, llama a la API y crea una tarjeta con imagen, nombre y, bajo «Details:», algunos campos según la categoría (por ejemplo, en personajes: altura, masa, año de nacimiento, género y especie). Se muestran los valores sin etiqueta.
- **Favoritos (`html/favorites.html` + `js/favorites.js`)**: lista los favoritos guardados con la misma tarjeta.

## Favoritos (`js/localStorage.js`)

- Se guardan como JSON en `localStorage`, clave `favorites`. Cada favorito es el objeto de la tarjeta (`name` y `url`).
- Se identifican por `name`. `toggleFavorite` añade o quita y devuelve `true` si queda como favorito.
- El botón muestra **Like** o **Unlike** (con clase `favorite`).
- Los favoritos dependen del origen: con otro servidor o puerto no se ven los guardados antes.

## Filtro de favoritos (`js/favorites.js`)

- Formulario con **Search** (nombre), **Category** (selector) y botón **Filter**.
- El selector empieza con `all` y añade las categorías presentes en los favoritos al cargar la página (sacadas de la `url`, por ejemplo `people`).
- `loadFavorites(search, type)` filtra por nombre (sin distinguir mayúsculas y sin espacios al principio ni al final) y por categoría, limpia la lista y la vuelve a pintar.
- Se aplica al escribir en Search (tras 500 ms), al cambiar Category y al pulsar Filter.
- Al pulsar **Unlike** en favoritos, la lista se vuelve a pintar con la búsqueda y la categoría actuales, así que la tarjeta desaparece.

## Estilos

- `css/styles.css` importa `css/variables.css`.
- Diseño para móvil primero, con `@media` a partir de 768 px y 1024 px: la portada pasa a 3 columnas y las listas a 2 y 3 columnas.

## Limitaciones vistas en el código

- `html/detailsList.html` abre la sección de paginación con `<sectio id="pagination">` y la cierra con `</section>`; `styles.css` usa también el selector `sectio#pagination`.
- En `callApiByElement`, el `catch` usa una variable `link` que no existe, y la opción `wookiee` llamaría a `searchParams` sobre un texto. Con las llamadas actuales (sin `wookiee`) solo afecta al mensaje de error.
- No hay imagen de reserva si falla la imagen remota.
- La ficha no tiene botón Like/Unlike.
