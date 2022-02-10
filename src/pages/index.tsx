import { FilmCard } from '../components/FilmCard'

import common from "../../styles/common.module.scss"
import styles from './home.module.scss'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Le.Critique</title>
      </Head>
      <main className={common.content}>
        <div className={styles.grid}>
          <FilmCard go={() => router.push('/film/asdad-asdasd-asdasd')} />
          <FilmCard go={() => router.push('/film/asdad-asdasd-asdasd')} />
          <FilmCard go={() => router.push('/film/asdad-asdasd-asdasd')} />
          <FilmCard go={() => router.push('/film/asdad-asdasd-asdasd')} />
          <FilmCard go={() => router.push('/film/asdad-asdasd-asdasd')} />
          <FilmCard go={() => router.push('/film/asdad-asdasd-asdasd')} />
        </div>
      </main>
    </>
  )
}

export default Home
