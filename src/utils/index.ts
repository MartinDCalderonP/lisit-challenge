import { Person, Planet, Starship, Entity } from '../types/api'

export const isPersonArray = (data: Entity[]): data is Person[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) => 'name' in item && 'birth_year' in item && 'url' in item
    )
  )
}

export const isPlanetArray = (data: Entity[]): data is Planet[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        'name' in item &&
        'diameter' in item &&
        'climate' in item &&
        'url' in item
    )
  )
}

export const isStarshipArray = (data: Entity[]): data is Starship[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        'name' in item &&
        'model' in item &&
        'manufacturer' in item &&
        'url' in item
    )
  )
}
