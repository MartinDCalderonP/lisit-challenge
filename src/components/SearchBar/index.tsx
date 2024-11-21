import { ChangeEvent, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { motion } from 'framer-motion'
import styles from './styles.module.css'

const filterOptions = ['People', 'Planets', 'Starships']

export const SearchBar = () => {
  const [value, setValue] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
  }

  const [selectedFilter, setSelectedFilter] = useState('people')

  const handleFilterButtonClick = (filter: string) => {
    setSelectedFilter(filter)
  }

  const handleSearchButtonClick = () => {
    console.log('Search:', value)
  }

  return (
    <>
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
          onClick={handleSearchButtonClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <LuSearch className={styles.icon} size={20} />
        </motion.button>
      </motion.div>

      <div className={styles.filterContainer}>
        {filterOptions.map((option) => (
          <motion.button
            key={option}
            className={`${styles.filterButton} ${
              selectedFilter === option ? styles.active : ''
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleFilterButtonClick(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </>
  )
}
