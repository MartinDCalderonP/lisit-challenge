import { ReactNode } from 'react'
import styles from './styles.module.css'

interface MainContainerProps {
  children: ReactNode
}

const MainContainer = ({ children }: MainContainerProps) => (
  <div className={styles.mainContainer}>{children}</div>
)

export default MainContainer
