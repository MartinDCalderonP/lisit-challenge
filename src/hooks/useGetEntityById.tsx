import { useEffect, useState } from 'react'
import { Entity } from '../types/api'
import { getEntityById } from '../services/api'

interface UseGetEntityByIdProps {
  endpoint: string
  id: string
}

const useGetEntityById = ({ endpoint, id }: UseGetEntityByIdProps) => {
  const [result, setResult] = useState<Entity>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true)

      try {
        const response = await getEntityById(endpoint, id)
        setResult(response.data)
      } catch (error) {
        console.error('Error fetching:', error)
        setError("Couldn't fetch data. Please try again later.")
      }

      setLoading(false)
    }

    const debounce = setTimeout(fetchPeople, 300)
    return () => clearTimeout(debounce)
  }, [endpoint, id])

  return { result, loading, error }
}

export default useGetEntityById
