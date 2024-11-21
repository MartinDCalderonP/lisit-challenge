import { useEffect, useState } from 'react'
import { Entity } from '../types/api'
import { getEntities } from '../services/api'

interface UseGetEntitiesProps {
  endpoint: string
  page?: number
  search?: string
}

const useGetEntities = ({
  endpoint,
  page = 1,
  search = ''
}: UseGetEntitiesProps) => {
  const [results, setResults] = useState<Entity[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)

      try {
        const response = await getEntities(endpoint, page, search)
        setResults(response.data.results)
        setTotalPages(Math.ceil(response.data.count / 10))
      } catch (error) {
        console.error('Error fetching:', error)
        setError("Couldn't fetch data. Please try again later.")
      }

      setLoading(false)
    }

    const debounce = setTimeout(fetch, 300)
    return () => clearTimeout(debounce)
  }, [endpoint, page, search])

  return { results, loading, totalPages, error }
}

export default useGetEntities
