
import { getElements, getElementData, buildElementCard } from "./functions.js";

const limit = 10;
let page = 1;
let totalPages = 1;
function getOffsetFromPage(page, limit) {
    return (page - 1) * limit;
}

function getPageQuantity(totalCount, limit) {
    console.log(totalCount, limit)
    const totalPages = Math.ceil(totalCount / limit);
    return totalPages;
}

function setText(elementID, text) {
    const element = document.getElementById(elementID);
    element.textContent = text;
}

function createPageListeners() {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    prevButton.addEventListener("click", () => {
        if (page > 1) {
            page--;
            setText("current-page", page);
            nextButton.disabled = false;
            if (page === 1) {
                prevButton.disabled = true;
            }
            loadPage(page, limit);
        }
    })
    nextButton.addEventListener("click", () => {
        if (page < totalPages) {
            page++;
            setText("current-page", page)
            prevButton.disabled = false;
            if (page === totalPages) {
                nextButton.disabled = true;
            }
            loadPage(page, limit);
        }
    })
}

async function loadPage(page, limit) {
    // conseguir sección donde se muestran
    const elementListSection = document.getElementById("element-list");
    elementListSection.replaceChildren(); // vacía la sección

    const offset = getOffsetFromPage(page, limit)
    const elements = await getElements(limit, offset);

    totalPages = getPageQuantity(elements.count, limit);
    setText("total-pages", totalPages);

    const results = elements.results.map(element => getElementData(element.name));

    const datos = await Promise.all(results);
    datos.forEach(element => {
        const card = createElementCard(element);
        elementListSection.append(card);
    })

    console.log(datos);
}


createPageListeners();
loadPage(page, limit);


