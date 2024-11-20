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
  const response = await api.get<APIResponse<T>>(endpoint)
  const serializedData = serializeResponse(response.data)

  const filteredResults = serializedData.results.filter((item) =>
    matchesSearch(item, search)
  )

  const startIndex = (page - 1) * 10
  const paginatedResults = filteredResults.slice(startIndex, startIndex + 10)

  return {
    ...response,
    data: {
      count: filteredResults.length,
      next: startIndex + 10 < filteredResults.length ? 'next' : null,
      previous: page > 1 ? 'prev' : null,
      results: paginatedResults
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
