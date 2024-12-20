import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuUsers, LuGlobe2, LuRocket } from 'react-icons/lu'
import { motion } from 'framer-motion'
import styles from './styles.module.css'
import { SearchBar } from '../../components/SearchBar'
import Category from '../../components/Category'

const categories = [
  {
    title: 'People',
    icon: LuUsers,
    description: 'Explore characters from the Star Wars universe',
    path: '/people'
  },
  {
    title: 'Planets',
    icon: LuGlobe2,
    description: 'Discover worlds across the galaxy',
    path: '/planets'
  },
  {
    title: 'Starships',
    icon: LuRocket,
    description: 'Learn about iconic spacecraft',
    path: '/starships'
  }
]

export const Home = () => {
  const navigate = useNavigate()

  const animateOpacity = {
    opacity: 1,
    y: 0
  }

  const handleCategoryClick = (path: string) => {
    navigate(path)
  }

  const [searchedValue, setSearchedValue] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('People')

  return (
    <div className={styles.container}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={animateOpacity}
        className={styles.title}
      >
        Star Wars
      </motion.h1>

      <SearchBar
        searchedValue={searchedValue}
        setSearchedValue={setSearchedValue}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      {searchedValue && (
        <>
          <p className={styles.searchedValue}>
            Searching for: {searchedValue} ({selectedFilter})
          </p>
          <Category
            endpoint={selectedFilter.toLowerCase()}
            title={selectedFilter}
            search={searchedValue}
          />
        </>
      )}

      {!searchedValue && (
        <div className={styles.categories}>
          {categories.map((category, index) => (
            <motion.div
              key={category.path}
              initial={{ opacity: 0, y: 20 }}
              animate={animateOpacity}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.path)}
              className={styles.card}
            >
              <category.icon className={styles.icon} />
              <h2 className={styles.cardTitle}>{category.title}</h2>
              <p className={styles.description}>{category.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
