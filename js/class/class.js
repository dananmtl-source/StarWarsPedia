export class People {
    constructor(name, height, mass, birth_year, gender, homeworld, species, vehicles, starships) {
            this.name = name,
            this.height = height,
            this.mass = mass,
            this.birth_year = birth_year,
            this.gender = gender,
            this.homeworld = homeworld,
            this.species = species,
            this.vehicles = vehicles,
            this.starships = starships,
            this.region = region
    }
}

export class Planets {
    constructor(name, diameter, climate, gravity, terrain, surface_water, population, residents) {
        this.name = name,
        this.diameter = diameter,
        this.climate = climate,
        this.gravity = gravity,
        this.terrain = terrain,
        this.surface_water = surface_water,
        this.population = population,
        this.residents = residents
    }
}

export class Species {
    constructor(name, classification, designation, average_height, average_lifespan, homeworld, language, people) {
        this.name = name,
        this.classification = classification,
        this.designation = designation,
        this.average_height = average_height,
        this.average_lifespan = average_lifespan,
        this.homeworld = homeworld,
        this.language = language,
        this.people = people
    }
}

export class Starships {
    constructor(name, model, manufacturer, cost_in_credits, starship_class, pilots) {
        this.name = name,
        this.model = model,
        this.manufacturer = manufacturer,
        this.cost_in_credits = cost_in_credits,
        this.starship_class = starship_class,
        this.pilots = pilots
    }
}

export class Vehicles {
    constructor(name, model, manufacturer, cost_in_credits, vehicle_class, pilots) {
        this.name = name,
        this.model = model,
        this.manufacturer = manufacturer,
        this.cost_in_credits = cost_in_credits,
        this.vehicle_class = vehicle_class,
        this.pilots = pilots
    }
}