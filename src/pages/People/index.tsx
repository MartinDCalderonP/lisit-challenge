import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { extractId } from '../../services/api'
import { Person } from '../../types/api'
import useGetEntities from '../../hooks/useGetEntities'
import { isPersonArray } from '../../utils'
import Loader from '../../components/Loader'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import styles from './styles.module.css'

export const People = () => {
  const navigate = useNavigate()

  const handlePersonClick = (person: Person) =>
    navigate(`/people/${person.id ?? extractId(person.url)}`)

  const [page, setPage] = useState(1)

  const {
    results: people,
    loading,
    totalPages,
    error
  } = useGetEntities({
    endpoint: '/people',
    page
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Star Wars Characters</h1>

      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}

      {people.length === 0 && !loading && !error && (
        <p className={styles.error}>No characters found.</p>
      )}

      {people.length > 0 && isPersonArray(people) && (
        <>
          <div className={styles.cardsContainer}>
            {people.map((person) => (
              <Card
                key={person.url}
                onClick={() => handlePersonClick(person)}
                subtitle={`Birth Year: ${person.birth_year}`}
                title={person.name}
              />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}

export default People
