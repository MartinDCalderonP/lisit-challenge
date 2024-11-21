import axios from 'axios'
import { APIResponse, Entity } from '../types/api'

const api = axios.create({
  baseURL: 'https://swapi.dev/api'
})

export const extractId = (url: string): string =>
  url.split('/').filter(Boolean).pop() ?? ''

const serializeResponse = <T>(response: APIResponse<T>): APIResponse<T> => ({
  count: response.count,
  next: response.next,
  previous: response.previous,
  results: response.results.map((item) => ({
    ...item,
    id: extractId((item as Entity).url)
  }))
})

const matchesSearch = (item: Entity, search: string): boolean => {
  if (!search) return true
  const searchLower = search.toLowerCase()
  return Object.values(item).some(
    (value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchLower)
  )
}

export const getEntities = async <T extends Entity>(
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
      previous: serializedData.previous,
      results: serializedData.results.filter((item) =>
        matchesSearch(item, search)
      )
    }
  }
}

export const getEntityById = async <T>(endpoint: string, id: string) => {
  const response = await api.get<T>(`${endpoint}/${id}`)
  return { ...response, data: { ...response.data, id } }
}
