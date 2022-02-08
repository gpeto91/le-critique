import { getProviders } from 'next-auth/react'
import { useContext, useEffect } from 'react'
import { FilmCard } from '../components/FilmCard'

import AppContext, { IProvider } from '../context/AppProvider'

import common from "../../styles/common.module.scss"
import styles from './home.module.scss'

type HomeProps = {
  providers: IProvider[];
}

const Home = ({ providers }: HomeProps) => {
  const { state, setState } = useContext(AppContext)

  useEffect(() => {
    setState({
      ...state,
      providers,
    })
  }, [])

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
