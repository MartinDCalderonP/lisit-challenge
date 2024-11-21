import { motion } from 'framer-motion'
import styles from './styles.module.css'

interface PersonCardProps {
  name: string
  birthYear: string
  onClick?: () => void
}

export const PersonCard = ({ name, birthYear, onClick }: PersonCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={styles.personCard}
    >
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.birthYear}>Birth Year: {birthYear}</p>
    </motion.div>
  )
}

export default PersonCard
