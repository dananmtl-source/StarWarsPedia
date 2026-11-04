
import {callApiByCategory, buildElementList, createListElementCard} from "./functions.js";

const category = document.location.searchParams.get("category");
const filtro = document.location.searchParams.get("search");

// Función que engloba el proceso de carga de información en la página de listado de elementos por categoría.
export async function buildElementListByApi(){
    
    const response = await callApiByCategory(category, filtro);

    const classList = buildElementList(category, response);

    return createListElementCard(classList);
    
}

buildElementListByApi();


