import * as classCode from './class/class.js';
import { addToFavorites, isInFavorites, toggleFavorite } from "./localStorage.js";

//#region apiCalls

// Función de llamada a la API en función de su categoría y con función de search mediante un filtro para recibir los elementos por categoría
async function callApiByCategory(apiUrl, category, filtro, wookiee = false) {

    try {
        if (apiUrl == null) {
            apiUrl = `https://swapi.dev/api/${category}`;
        }

        let url = new URL(apiUrl);

        if (filtro != null) {
            if (filtro !== "none" && filtro.length > 0) {

                url.searchParams.set("search", filtro);
            }
        }
        if (wookiee) {
            url.searchParams.set("format", "wookiee");
        }

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(res.json());
        }
        const data = await res.json();

        return data;


    } catch (error) {
        console.error(`Error en la llamada a ${category}: `, error);
    }
}

// Función de llamada a la API para recibir la infomación de un elemento.
async function callApiByElement(category, id, wookiee = false) {
    try {

        const url = `https://swapi.dev/api/${category}/${id}`;

        if (wookiee) {
            url.searchParams.set("format", "wookiee");
        }
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(res.json());
        }
        const data = await res.json();

        return data;

    } catch (error) {
        console.error(`Error en la llamada a ${link}: `, error);
    }
}


// Función para recoger los datos de la api y guardarlos en mi clase con cierto orden (Lista de elementos).
function buildElementList(category, data) {
    const dataList = [];
    dataList.push(data);
    const classList = new classCode.elementList(dataList[0].previous, dataList[0].next, []);

    const dataResult = data.results;

    dataResult.forEach(element => {
        let classCreated = undefined;
        switch (category) {
            case "people":
                classCreated = new classCode.People();
                classCreated.name = element.name;
                classCreated.url = element.url;
                classList.elementAbreviatedList.push(classCreated);
                break;

            case "planets":
                classCreated = new classCode.Planets();
                classCreated.name = element.name;
                classCreated.url = element.url;
                classList.elementAbreviatedList.push(classCreated);
                break;

            case "species":
                classCreated = new classCode.Species();
                classCreated.name = element.name;
                classCreated.url = element.url;
                classList.elementAbreviatedList.push(classCreated);
                break;

            case "starships":
                classCreated = new classCode.Starships();
                classCreated.name = element.name;
                classCreated.url = element.url;
                classList.elementAbreviatedList.push(classCreated);
                break;

            case "vehicles":
                classCreated = new classCode.Vehicles();
                classCreated.name = element.name;
                classCreated.url = element.url;
                classList.elementAbreviatedList.push(classCreated);
                break;

            default:
                break;
        }
    });
    return classList;
}


// Función para crear las tarjetas de los elementos que se mostrarán en el listado por categorías.
function createListElementCard(category, elements, onFavorite = () => { }, onPageLoad = null) {
    try {
        const elementListSection = document.getElementById("element-list");
        if (elementListSection) {
            elementListSection.replaceChildren();
        }
        let elementList = undefined;
        if (category != null) {
            const prevButton = document.getElementById("prev-button");
            const nextButton = document.getElementById("next-button");
            if (prevButton && nextButton) {
                prevButton.disabled = !elements.previous;
                nextButton.disabled = !elements.next;
                prevButton.onclick = (elements.previous && typeof onPageLoad === "function")
                    ? () => onPageLoad(elements.previous)
                    : null;
                nextButton.onclick = (elements.next && typeof onPageLoad === "function")
                    ? () => onPageLoad(elements.next)
                    : null;
            }
            elementList = elements.elementAbreviatedList;
        }else{
            elementList = elements;
        }

        // Si favoritos está vacío evitamos el error saliendo.
        if (!elementList || !elementList.length) {
            return;
        }

        elementList.forEach(element => {

            const article = document.createElement("article");
            article.classList.add("element-card");
            article.dataset.id = element.name;

            const id = element.url.split('/')[5];
            const elementCategory = category ?? element.url.split('/')[4];

            const a = document.createElement("a");
            a.setAttribute("href", new URL(`../html/details.html?category=${elementCategory}&id=${id}`, import.meta.url).href);
            const title = document.createElement("h3");

            title.append(element.name);

            const image = document.createElement("img");
            const str = element.url.replace("https://swapi.dev/api/", "https://starwarsgallery.netlify.app/assets/")
            const imageUrl = `${str.substring(0, str.length - 1)}.jpg`;
            image.src = imageUrl;
            image.setAttribute("alt", element.name);


            const favoriteButton = document.createElement("button");
            const isFavorite = isInFavorites(element);
            if (isFavorite) {
                favoriteButton.classList.add("favorite");
                favoriteButton.textContent = "Unlike";
            } else {
                favoriteButton.textContent = "Like";
            }

            favoriteButton.addEventListener("click", () => {
                const isFavorite = toggleFavorite(element);
                if (isFavorite) {
                    favoriteButton.classList.add("favorite");
                    favoriteButton.textContent = "Unlike";
                    onFavorite(element, true);
                } else {
                    favoriteButton.classList.remove("favorite");
                    favoriteButton.textContent = "Like";
                    onFavorite(element, false);
                }
            })

            a.append(image, title);
            article.append(a, favoriteButton);
            elementListSection.append(article);
        });

    } catch (error) {
        console.error(`Error en la función para crear las tarjetas de los elementos: `, error);
    }


}

// Función para recoger los datos de la api y guardarlos en mi clase con cierto orden (Detalles de elemento).
function buildElementDetails(category, element) {
    let classCreated = undefined;
    switch (category) {
        case "people":
            classCreated = new classCode.People();
            classCreated.name = element.name;
            classCreated.height = element.height;
            classCreated.mass = element.mass;
            classCreated.birth_year = element.birth_year;
            classCreated.gender = element.gender;
            classCreated.homeworld = element.homeworld;
            classCreated.species = element.species;
            classCreated.vehicles = element.vehicles;
            classCreated.starships = element.starships;
            break;

        case "planets":
            classCreated = new classCode.Planets();
            classCreated.name = element.name;
            classCreated.diameter = element.diameter;
            classCreated.climate = element.climate;
            classCreated.gravity = element.gravity;
            classCreated.terrain = element.terrain;
            classCreated.surface_water = element.surface_water;
            classCreated.population = element.population;
            classCreated.residents = element.residents;
            break;

        case "species":
            classCreated = new classCode.Species();
            classCreated.name = element.name;
            classCreated.classification = element.classification;
            classCreated.designation = element.designation;
            classCreated.average_height = element.average_height;
            classCreated.average_lifespan = element.average_lifespan;
            classCreated.homeworld = element.homeworld;
            classCreated.language = element.language;
            classCreated.people = element.people;
            break;

        case "starships":
            classCreated = new classCode.Starships();
            classCreated.name = element.name;
            classCreated.model = element.model;
            classCreated.manufacturer = element.manufacturer;
            classCreated.cost_in_credits = element.cost_in_credits;
            classCreated.starship_class = element.starship_class;
            classCreated.pilots = element.pilots;
            break;

        case "vehicles":
            classCreated = new classCode.Vehicles();
            classCreated.name = element.name;
            classCreated.model = element.model;
            classCreated.manufacturer = element.manufacturer;
            classCreated.cost_in_credits = element.cost_in_credits;
            classCreated.vehicle_class = element.vehicle_class;
            classCreated.pilots = element.pilots;
            break;

        default:
            break;
    }
    return classCreated;
}

// Función para completar con información la página de detalles y crear su listado de características. 
function createElementDetailsCard(category, id, element, onFavorite = () => { }) {


    const article = document.createElement("article");
    article.classList.add("element-card");
    article.dataset.id = element.name;

    const title = document.createElement("h1");
    title.append(element.name);

    const image = document.createElement("img");
    const imageUrl = `https://starwarsgallery.netlify.app/assets/${category}/${id}.jpg`;
    image.src = imageUrl;
    image.setAttribute("alt", element.name);

    const div = document.createElement("div");

    const details = document.createElement("h2");
    details.append("Details:");
    div.append(details);

    switch (category) {
        case "people":
            const height = document.createElement("p");
            height.append(`Height: ${element.height}`);
            const mass = document.createElement("p");
            mass.append(`Mass: ${element.mass}`);
            const birth_year = document.createElement("p");
            birth_year.append(`Birth Year: ${element.birth_year}`);
            const gender = document.createElement("p");
            gender.append(`Gender: ${element.gender}`);
            // const homeworld = document.createElement("p");
            // homeworld.append(element.homeworld);
            // const species = document.createElement("p");
            // species.append(`Species: ${element.species}`);
            // const vehicles = document.createElement("p");
            // vehicles.append(element.vehicles);
            // const starships = document.createElement("p");
            // starships.append(element.starships);
            div.append(height, mass, birth_year, gender);
            break;

        case "planets":
            const diameter = document.createElement("p");
            diameter.append(`Diameter: ${element.diameter}`);
            const climate = document.createElement("p");
            climate.append(`Climate: ${element.climate}`);
            const gravity = document.createElement("p");
            gravity.append(`Gravity: ${element.gravity}`);
            const terrain = document.createElement("p");
            terrain.append(`Terrain: ${element.terrain}`);
            const surface_water = document.createElement("p");
            surface_water.append(`Surface water: ${element.surface_water}`);
            // const population = document.createElement("p");
            // population.append(element.population);
            // const residents = document.createElement("p");
            // residents.append(element.residents);
            div.append(diameter, climate, gravity, terrain, surface_water);
            break;

        case "species":
            const classification = document.createElement("p");
            classification.append(`Classification: ${element.classification}`);
            const designation = document.createElement("p");
            designation.append(`Designation: ${element.designation}`);
            const average_height = document.createElement("p");
            average_height.append(`Average haight: ${element.average_height}`);
            const average_lifespan = document.createElement("p");
            average_lifespan.append(`Average lifespan: ${element.average_lifespan}`);
            // const home_world = document.createElement("p");
            // home_world.append(element.homeworld);
            const language = document.createElement("p");
            language.append(`Language: ${element.language}`);
            // const people = document.createElement("p");
            // people.append(element.people);
            div.append(classification, designation, average_height, average_lifespan, language);
            break;

        case "starships":
            const model = document.createElement("p");
            model.append(`Model: ${element.model}`);
            const manufacturer = document.createElement("p");
            manufacturer.append(`Manufacturer: ${element.manufacturer}`);
            const cost_in_credits = document.createElement("p");
            cost_in_credits.append(`Cost in credits: ${element.cost_in_credits}`);
            const starship_class = document.createElement("p");
            starship_class.append(`Starship class: ${element.starship_class}`);
            // const pilots = document.createElement("p");
            // pilots.append(element.pilots);
            div.append(model, manufacturer, cost_in_credits, starship_class);
            break;

        case "vehicles":
            const modelV = document.createElement("p");
            modelV.append(`Model: ${element.model}`);
            const manufacturerV = document.createElement("p");
            manufacturerV.append(`Manufacturer: ${element.manufacturer}`);
            const cost_in_creditsV = document.createElement("p");
            cost_in_creditsV.append(`Cost in credits: ${element.cost_in_credits}`);
            const vehicle_class = document.createElement("p");
            vehicle_class.append(`Vehicle class: ${element.vehicle_class}`);
            // const pilots = document.createElement("p");
            // pilots.append(element.pilots);
            div.append(modelV, manufacturerV, cost_in_creditsV, vehicle_class);
            break;

        default:
            break;
    }


    const headSection = document.getElementById("detail-head");

    article.append(image, title, div);
    headSection.append(article);

}

export {
    callApiByCategory,
    callApiByElement,
    buildElementList,
    createListElementCard,
    buildElementDetails,
    createElementDetailsCard,

}

//#endregion



