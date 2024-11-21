import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LuHome, LuUsers, LuGlobe2, LuRocket } from 'react-icons/lu'
import { motion } from 'framer-motion'
import styles from './styles.module.css'

const navItems = [
  { path: '/', icon: LuHome, label: 'Home' },
  { path: '/people', icon: LuUsers, label: 'People' },
  { path: '/planets', icon: LuGlobe2, label: 'Planets' },
  { path: '/starships', icon: LuRocket, label: 'Starships' }
]

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`${styles.navLink} ${
                location.pathname === path
                  ? styles.navLinkActive
                  : styles.navLinkInactive
              }`}
            >
              <Icon className={styles.icon} size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </ul>
      </nav>
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}

export default Layout
