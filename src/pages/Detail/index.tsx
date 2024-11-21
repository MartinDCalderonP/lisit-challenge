import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useGetEntityById from '../../hooks/useGetEntityById'
import Loader from '../../components/Loader'
import { isPersonItem, isPlanetItem, isStarshipItem } from '../../utils'
import PersonDetail from '../../components/PersonDetail'
import styles from './styles.module.css'
import PlanetDetail from '../../components/PlanetDetail'
import StarshipDetail from '../../components/StarshipDetail'

export const Detail = () => {
  const { pathname } = window.location
  const endpoint = pathname.split('/')[1]
  const { id = '' } = useParams<{ id: string }>()

  const { result, loading, error } = useGetEntityById({
    endpoint,
    id
  })

  const navigate = useNavigate()

  const handleSectionButtonClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop()
    const endpoint = url.split('/')[4]
    navigate(`/${endpoint}/${id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.container}
    >
      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}

      {!result && !loading && !error && (
        <p className={styles.error}>No data found.</p>
      )}

      {result && !loading && (
        <>
          <h1 className={styles.title}>{result.name}</h1>

          <div className={styles.card}>
            {isPersonItem(result) && (
              <PersonDetail
                person={result}
                handleSectionButtonClick={handleSectionButtonClick}
              />
            )}
            {isPlanetItem(result) && (
              <PlanetDetail
                planet={result}
                handleSectionButtonClick={handleSectionButtonClick}
              />
            )}
            {isStarshipItem(result) && (
              <StarshipDetail
                starship={result}
                handleSectionButtonClick={handleSectionButtonClick}
              />
            )}
          </div>
        </>
      )}
    </motion.div>
  )
}

export default Detail
