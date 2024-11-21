import { ReactNode } from 'react'
import styles from './styles.module.css'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout}>{children}</div>
)

export default Layout
