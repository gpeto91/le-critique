import { getProviders } from 'next-auth/react'
import { useContext, useEffect } from 'react'
import { FilmCard } from '../components/FilmCard'

import AppContext, { IProvider } from '../context/AppProvider'

import common from "../../styles/common.module.scss"
import styles from './home.module.scss'
import Head from 'next/head'
import { useRouter } from 'next/router'

type HomeProps = {
  providers: IProvider[];
}

const Home = ({ providers }: HomeProps) => {
  const { state, setState } = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    setState({
      ...state,
      providers,
    })
  }, [])

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

export async function getServerSideProps() {
  const providers = await getProviders()

  const formatedProviders = providers && Object.values(providers).map(provider => ({
    id: provider.id,
    name: provider.name,
    type: provider.type
  }))

  return {
    props: { providers: formatedProviders }
  }
}
