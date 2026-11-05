
import {callApiByCategory, buildElementList, createListElementCard} from "./functions.js";

const params = new URL(document.location.href).searchParams;
const category = params.get('category');
const filtro = params.get("search");

// Función que engloba el proceso de carga de información en la página de listado de elementos por categoría.
async function buildElementListByApi(apiUrl){
    // TODO: quitar esta apiUrl, ya no la estoy usando y me da error
    if (apiUrl === "null" || apiUrl === "undefined") {
        apiUrl = null;
    }

    const response = await callApiByCategory(apiUrl, category, filtro);

    const classList = buildElementList(category, response);

    // Al cargar la página no llamamos al onClick normal, lo cambiamos para que use nuestro buildElementListByApi otra vez.
    return createListElementCard(category, classList, () => {}, buildElementListByApi);
    
}

buildElementListByApi();


