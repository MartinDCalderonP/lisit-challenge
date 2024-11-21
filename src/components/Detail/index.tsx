import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useGetEntityById from '../../hooks/useGetEntityById'
import Loader from '../Loader'
import { isPersonItem, isPlanetItem, isStarshipItem } from '../../utils'
import styles from './styles.module.css'

export const Detail = () => {
  const { pathname } = window.location
  const endpoint = pathname.split('/')[1]
  const { id = '' } = useParams<{ id: string }>()

  const { result, loading, error } = useGetEntityById({
    endpoint,
    id
  })

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

      {result && (
        <>
          <h1 className={styles.title}>{result.name}</h1>

          {isPersonItem(result) && <div>is Person</div>}
          {isPlanetItem(result) && <div>is Planet</div>}
          {isStarshipItem(result) && <div>is Starship</div>}
        </>
      )}
    </motion.div>
  )
}

export default Detail
