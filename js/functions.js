import * as classCode from './class/class.js'; 

//Function: llamamos a la api y construimos nuestra clase con la información
export async function getApiInfoClass(){
    const category = document.location.searchParams.get("category");
    const filtro = "";
    const response = await callApiByCategory(category, filtro);

    const classList = buildElementList(category, response);
    return createElementCard(classList);
}

//#region apiCalls

// Función de llamada a la API en función de su categoría y con función de search mediante un filtro
async function callApiByCategory(category, filtro, wookiee = false){

    try {
        let apiUrl = `https://swapi.dev/api/${category}`;
        let url = new URL(apiUrl);

        if(filtro !== "none" && filtro.length>0){

            url.searchParams.set("search",filtro);
        }
        if(wookiee){
            url.searchParams.set("format", "wookiee");
        }

        //TODO: comprobamos si tenemos la información que se busca en caché (localStorage o lo que sea)
        
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(res.json());
        }
        const data = await res.json();

        return data;

    } catch (error) {
        console.error(`Error en la llamada a ${category}: `, error);
    }
}

async function callApiByElement(link, wookiee = false){
    try{
        let ulr = new URL(link);

        if(wookiee){
            url.searchParams.set("format", "wookiee");
        }
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(res.json());
        }
        const data = await res.json();

        return data;

    } catch (error) {
        console.error(`Error en la llamada a ${link}: `, error);
    }
}


// Función para recoger los datos de la api y guardarlos en mi clase con cierto orden.
function buildElementList(category, data){
    const dataList = [];
    dataList.push(data);
    const classList = new classCode.elementList(dataList[0].previous,dataList[0].next,[]);

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


function createElementCard(element,onFavorite=()=>{}) {
    const article = document.createElement("article");
    article.classList.add("element-card");
    article.dataset.id = element.name;

    const title = document.createElement("h3");

    title.append(element.name);

    //TODO:la imagen será dinamica en función del nombre cogiendola de una url
    const image = document.createElement("img");
    image.src = element.url.replace("https://swapi.dev/api/","https://starwarsgallery.netlify.app/assets/")+".jpg";
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
            onFavorite(element,true);
        } else {
            favoriteButton.classList.remove("favorite");
            favoriteButton.textContent = "Like";
            onFavorite(element,false);
        }
    })

    article.append(image, title, favoriteButton);
    return article;

}

function buildElementDetails(element){
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
                classList.elementAbreviatedList.push(classCreated);
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
                classList.elementAbreviatedList.push(classCreated);
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
                classList.elementAbreviatedList.push(classCreated);
                break;

            case "starships":
                classCreated = new classCode.Starships();
                classCreated.name = element.name;
                classCreated.model = element.model;
                classCreated.manufacturer = element.manufacturer;
                classCreated.cost_in_credits = element.cost_in_credits;
                classCreated.starship_class = element.starship_class;
                classCreated.pilots = element.pilots;
                classList.elementAbreviatedList.push(classCreated);
                break;
            
            case "vehicles":
                classCreated = new classCode.Vehicles();
                classCreated.name = element.name;
                classCreated.model = element.model;
                classCreated.manufacturer = element.manufacturer;
                classCreated.cost_in_credits = element.cost_in_credits;
                classCreated.vehicle_class = element.vehicle_class;
                classCreated.pilots = element.pilots;
                classList.elementAbreviatedList.push(classCreated);
                break;
        
            default:
                break;
        }
}

//#endregion


getApiInfoClass();

// {
//     "people": "https://swapi.dev/api/people/", 
//     "planets": "https://swapi.dev/api/planets/", 
//     "films": "https://swapi.dev/api/films/", 
//     "species": "https://swapi.dev/api/species/", 
//     "vehicles": "https://swapi.dev/api/vehicles/", 
//     "starships": "https://swapi.dev/api/starships/"
// }


