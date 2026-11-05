# Diagramas de StarWarsPedia

## Estructura del proyecto

```text
StarWarsPedia (Copiar 2)/
├── index.html              Portada con las 5 categorías
├── README.md
├── DIAGRAMAS.md
├── MEMORIA_TECNICA.md
├── assets/images/          Imágenes locales (fondo)
├── css/
│   ├── styles.css          Estilos (importa variables.css)
│   └── variables.css
├── html/
│   ├── detailsList.html    Lista de una categoría + Previous/Next
│   ├── details.html        Ficha de un elemento
│   └── favorites.html      Favoritos + búsqueda + filtro por categoría
└── js/
    ├── detailsList.js      Carga la lista de una categoría
    ├── details.js          Carga la ficha de un elemento
    ├── favorites.js        Carga y filtra los favoritos
    ├── functions.js        Llamadas a SWAPI y creación de tarjetas
    ├── localStorage.js     Guardar y leer favoritos
    └── class/class.js      Clases de datos (People, Planets, ...)
```

