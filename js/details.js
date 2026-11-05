
import { callApiByElement, buildElementDetails, createElementDetailsCard } from "./functions.js";

const urlPath = new URL(document.location.href);
const params = urlPath.searchParams;
const category = params.get('category');
const id = params.get('id');


// Función que engloba el proceso de carga de información en la página de detalles de cada elemento.
async function buildElementDetailsByApi(){
    
    const response = await callApiByElement(category, id);
    
    const classDetails = buildElementDetails(category, response);

    return createElementDetailsCard(category, id, classDetails);

}


buildElementDetailsByApi();


