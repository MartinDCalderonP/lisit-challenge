import { Person, Planet, Starship, Entity } from '../types/api'

export const isPersonItem = (item: Entity): item is Person => {
  return 'name' in item && 'birth_year' in item && 'url' in item
}

export const isPlanetItem = (item: Entity): item is Planet => {
  return (
    'name' in item && 'diameter' in item && 'climate' in item && 'url' in item
  )
}

export const isStarshipItem = (item: Entity): item is Starship => {
  return (
    'name' in item && 'model' in item && 'manufacturer' in item && 'url' in item
  )
}

export const toMeters = (value: number) => (value / 100).toFixed(2)
