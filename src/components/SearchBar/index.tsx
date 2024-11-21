import { ChangeEvent } from 'react'
import { LuSearch } from 'react-icons/lu'
import { motion } from 'framer-motion'
import styles from './styles.module.css'

const filterOptions = ['People', 'Planets', 'Starships']

interface SearchBarProps {
  searchedValue: string
  setSearchedValue: (value: string) => void
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
}

export const SearchBar = ({
  searchedValue,
  setSearchedValue,
  selectedFilter,
  setSelectedFilter
}: SearchBarProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchedValue(value)
  }

  const handleFilterButtonClick = (filter: string) => {
    setSelectedFilter(filter)
  }

  const handleSearchButtonClick = () => {
    console.log('Search:', searchedValue)
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
          value={searchedValue}
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
            animate={{ opacity: 1 }}
            onClick={() => handleFilterButtonClick(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </>
  )
}
