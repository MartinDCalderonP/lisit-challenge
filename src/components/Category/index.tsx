import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { extractId } from '../../services/api'
import { Entity } from '../../types/api'
import useGetEntities from '../../hooks/useGetEntities'
import Loader from '../../components/Loader'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import styles from './styles.module.css'
import { isPersonItem, isPlanetItem, isStarshipItem } from '../../utils'

interface CategoryProps {
  endpoint: string
  title: string
  search?: string
}

export const Category = ({ endpoint, title, search }: CategoryProps) => {
  const navigate = useNavigate()

  const handleCardClick = (item: Entity) => {
    const cardUrl = `/${endpoint}/${item.id ?? extractId(item.url)}`
    navigate(cardUrl)
  }

  const [page, setPage] = useState(1)

  const { data, loading, totalPages, error } = useGetEntities({
    endpoint,
    page,
    search
  })

  const currentSubtitle = (item: Entity) => {
    if (isPersonItem(item)) return `Birth Year: ${item.birth_year}`
    if (isPlanetItem(item))
      return `Population: ${Number(item.population).toLocaleString('es-ES')}`
    if (isStarshipItem(item)) return `Class: ${item.starship_class}`
    return ''
  }

  return (
    <>
      <h1 className={styles.title}>{title}</h1>

      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}

      {data.length === 0 && !loading && !error && (
        <p className={styles.error}>No data found.</p>
      )}

      {data.length > 0 && (
        <>
          <div className={styles.cardsContainer}>
            {data.map((item: Entity) => (
              <Card
                key={item.url}
                onClick={() => handleCardClick(item)}
                subtitle={currentSubtitle(item)}
                title={item.name}
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
    </>
  )
}

export default Category
