
import { callApiByElement, buildElementDetails, createElementDetailsCard } from "./functions.js";


// Función que engloba el proceso de carga de información en la página de detalles de cada elemento.
export async function buildElementDetailsByApi(link){

    const category = link.split('/'[3]);

    const response = await callApiByElement(link);
    
    const classDetails = buildElementDetails(category, response);

    return createElementDetailsCard(classDetails);

}


createPageListeners();
loadPage(page, limit);


