import { createListElementCard } from "./functions.js";
import { getFavoritesFromLocalStorage } from "./localStorage.js";


function loadFavorites(search="",type="all") {
    const elements = getFavoritesFromLocalStorage();
    const filteredElements = elements.filter(element =>{
        if(search){
            // !(A | B) == !A & !B
            if(!element.name.includes(search)){
                return false;
            }
        }
        //TODO: adaptar esto para funcionar con las categorias
        // if(type !== "all"){
        //     if(!element.types.includes(type)){
        //         return false;
        //     }
        // }

        return true;
    })
    const section = document.getElementById("element-list");
    section.replaceChildren();
    const card = createListElementCard(null, filteredElements);
    // filteredElements.forEach(element => {
    //     // const card = createListElementCard(null, element, (p, isFavorite) => {
    //     //     if (!isFavorite) {
    //     //         //card.remove();
    //     //         const card = document.querySelector(`.element-card[data-name='${element.name}']`);
    //     //         if (card) {
    //     //             card.remove();
    //     //         }
    //     //     }
    //     // });
    //     section.append(card);
    // })
    section.append(card);
}

//TODO: adaptar esto para funcionar con las categorias
// function getTypes() {
//     const elements = getFavoritesFromLocalStorage();
//     const typesSet = new Set();
//     elements.forEach(element => {
//         element.types.forEach(type => {
//             typesSet.add(type);
//         })
//     })
//     const types = Array.from(typesSet);
//     return types;

// }

// function setTypesOptions() {
//     const types = getTypes();
//     const selector = document.getElementById("type-select");
//     const options = types.map(tp => {
//         const option = document.createElement("option");
//         option.value = tp;
//         option.textContent = tp;
//         return option;
//     })
//     selector.append(...options);
// }

function setSearchForm(){
    const form = document.getElementById("filter-form");
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get("search").toLowerCase().trim();
        // const type = formData.get("type");
        loadFavorites(search/*,type*/);

    })
}

function controlSearchQuery(){
    const searchInput = document.getElementById("search-input");
    // const typeSelector = document.getElementById("type-select");
    let timeout = null;
    searchInput.addEventListener("input",(e)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            const search  = e.target.value;
            // const type = typeSelector.value;
            loadFavorites(search/*,type*/);
        },500)
    })
}
controlSearchQuery();
// setTypesOptions();
setSearchForm();
loadFavorites();