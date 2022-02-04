import type { NextPage } from 'next'
import common from "../../styles/common.module.scss"
import { FilmCard } from '../components/FilmCard'

import styles from './home.module.scss'

const Home: NextPage = () => {
  return (
    <main className={common.content}>
      <div className={styles.grid}>
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
      </div>
    </main>
  )
}

export default Home
