interface BaseEntity {
  created: Date
  edited: Date
  films: string[]
  id?: string
  name: string
  url: string
}

export interface Person extends BaseEntity {
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  species: string[]
  vehicles: string[]
  starships: string[]
}

export interface Planet extends BaseEntity {
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
}

export interface Starship extends BaseEntity {
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: string[]
}

export interface APIResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type Entity = Person | Planet | Starship
