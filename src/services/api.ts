import axios from 'axios'
import { APIResponse, Person, Planet, Starship } from '../types/api'

const api = axios.create({
  baseURL: 'https://swapi.dev/api'
})

export const extractId = (url: string): string =>
  url.split('/').filter(Boolean).pop() || ''

const serializeResponse = <T>(response: APIResponse<T>): APIResponse<T> => ({
  count: response.count,
  next: response.next,
  previous: response.previous,
  results: response.results.map((item) => ({
    ...item,
    id: extractId((item as Person | Planet | Starship).url)
  }))
})

const matchesSearch = (
  item: Person | Planet | Starship,
  search: string
): boolean => {
  if (!search) return true
  const searchLower = search.toLowerCase()
  return Object.values(item).some(
    (value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchLower)
  )
}

const getEntities = async <T extends Person | Planet | Starship>(
  endpoint: string,
  page = 1,
  search = ''
) => {
  const response = await api.get<APIResponse<T>>(endpoint + '?page=' + page)
  const serializedData = serializeResponse(response.data)

  return {
    ...response,
    data: {
      count: serializedData.count,
      next: serializedData.next,
      previous: page > 1 ? 'prev' : null,
      results: serializedData.results.filter((item) =>
        matchesSearch(item, search)
      )
    }
  }
}

export const getPersons = (page = 1, search = '') =>
  getEntities<Person>('/people/', page, search)

export const getPlanets = (page = 1, search = '') =>
  getEntities<Planet>('/planets/', page, search)

export const getStarships = (page = 1, search = '') =>
  getEntities<Starship>('/starships/', page, search)

const getEntityById = async <T>(endpoint: string, id: string) => {
  const response = await api.get<T>(`${endpoint}/${id}`)
  return { ...response, data: { ...response.data, id } }
}

export const getPerson = (id: string) => getEntityById<Person>('/people', id)
export const getPlanet = (id: string) => getEntityById<Planet>('/planets', id)
export const getStarship = (id: string) =>
  getEntityById<Starship>('/starships', id)
