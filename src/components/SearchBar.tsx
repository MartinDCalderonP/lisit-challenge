import { ChangeEvent, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { motion } from 'framer-motion'
import styles from './SearchBar.module.css'

export const SearchBar = () => {
  const [value, setValue] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
  }

  const handleButtonClick = () => {
    console.log('Search:', value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.searchBar}
    >
      <input
        type='text'
        value={value}
        onChange={handleInputChange}
        placeholder='Search across all fields...'
        className={styles.input}
      />
      <motion.button
        className={styles.button}
        onClick={handleButtonClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <LuSearch className={styles.icon} size={20} />
      </motion.button>
    </motion.div>
  )
}
