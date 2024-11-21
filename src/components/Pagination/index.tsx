import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { motion } from 'framer-motion'
import styles from './styles.module.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={styles.container}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.button}
        >
          <LuChevronLeft size={20} />
        </button>
        <span className={styles.pageInfo}>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.button}
        >
          <LuChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  )
}

export default Pagination
