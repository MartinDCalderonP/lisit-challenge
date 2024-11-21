import { motion } from 'framer-motion'
import styles from './styles.module.css'

interface CardProps {
  title: string
  subtitle: string
  onClick?: () => void
}

export const Card = ({ title, subtitle, onClick }: CardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={styles.personCard}
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>Birth Year: {subtitle}</p>
    </motion.div>
  )
}

export default Card
