import * as classCode from './class/class.js'; 

//Function: llamamos a la api y construimos nuestra clase con la información
export async function getApiInfoClass(category){
    category = "planets";
    const filtro = "";
    const response = await callApiByCategory(category, filtro);

    const classList = buildResponseClass(category, response);
    return buildIndexPlanetList(classList);
}

// Función de llamada a la API en función de su categoría y con función de search mediante un filtro
async function callApiByCategory(category, filtro){

    try {
        let apiUrl = `https://swapi.dev/api/${category}/3`;
        let url = new URL(apiUrl);

        if(filtro !== "none" && filtro.length>0){
            //TODO: arreglar paginador, esta de ejemplo pero no va.
            if(filtro === "page"){
                url.searchParams.set("page", "2");
            }
            url.searchParams.set("search",filtro);
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


// Función para recoger los datos de la api y guardarlos en mi clase con cierto orden.
function buildResponseClass(category, data){
    const dataList = [];
    dataList.push(data);
    const classList = [];

    const dataResult = data.results;

    dataList.forEach(element => {
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
                classList.push(classCreated);
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
                classList.push(classCreated);
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
                classList.push(classCreated);
                break;

            case "starships":
                classCreated = new classCode.Starships();
                classCreated.name = element.name;
                classCreated.model = element.model;
                classCreated.manufacturer = element.manufacturer;
                classCreated.cost_in_credits = element.cost_in_credits;
                classCreated.starship_class = element.starship_class;
                classCreated.pilots = element.pilots;
                classList.push(classCreated);
                break;
            
            case "vehicles":
                classCreated = new classCode.Vehicles();
                classCreated.name = element.name;
                classCreated.model = element.model;
                classCreated.manufacturer = element.manufacturer;
                classCreated.cost_in_credits = element.cost_in_credits;
                classCreated.vehicle_class = element.vehicle_class;
                classCreated.pilots = element.pilots;
                classList.push(classCreated);
                break;
        
            default:
                break;
        }
        return classList;
        
    });
}


//functión par aconstruir el selector de planetas en función de lo que devuelva la API.
function buildIndexPlanetList(planetList){
    let count = 0;
    let ul = document.GetElementByID("ul-planets");

    planetList.forEach(element => {
        count++;
        let li = document.CreateElement("li");
        let p = document.CreateElement("p");
        let img = document.CreateElement("img");
        
        li.setAttribute("id", `li${count}`);
        p.setAttribute("id", `p${count}`);
        img.setAttribute("id",`img${count}`);
        img.setAttribute("src", `${element.name}.webp`);
        
    });
}

getApiInfoClass();

// {
//     "people": "https://swapi.dev/api/people/", 
//     "planets": "https://swapi.dev/api/planets/", 
//     "films": "https://swapi.dev/api/films/", 
//     "species": "https://swapi.dev/api/species/", 
//     "vehicles": "https://swapi.dev/api/vehicles/", 
//     "starships": "https://swapi.dev/api/starships/"
// }


// function buildSpeciesList(){
//     try {
//         let speciesUrl = "https://swapi.dev/api/species/";
//         let url = new URL(apiUrl);
//         if(speciesCache.size > 0) return speciesCache;

//         const res = await fetch(url);
//         if(!res.ok){
//             throw new Error(res.json());
//         }
//         cont data = await re.json();
//         speciesCache = data;

//         return data;

//     } catch (error) {
//         console.error("Error en la llamada a las species: ", error)
//     }
// }

// function buildVehiclesList(){
//     try {
//         let vehiclesUrl = "https://swapi.dev/api/vehicles/";
//         let url = new URL(apiUrl);
//         if(vehiclesCache.size > 0) return vehiclesCache;

//         const res = await fetch(url);
//         if(!res.ok){
//             throw new Error(res.json());
//         }
//         cont data = await re.json();
//         vehiclesCache = data;

//         return data;

//     } catch (error) {
//         console.error("Error en la llamada a los vehicles: ", error)
//     }
// }

// function buildStarshipsList(){
//     try {
//         let starshipsUrl = "https://swapi.dev/api/starships/";
//         let url = new URL(apiUrl);
//         if(starshipsCache.size > 0) return starshipsCache;

//         const res = await fetch(url);
//         if(!res.ok){
//             throw new Error(res.json());
//         }
//         cont data = await re.json();
//         starshipsCache = data;

//         return data;

//     } catch (error) {
//         console.error("Error en la llamada a los starships: ", error)
//     }
// }