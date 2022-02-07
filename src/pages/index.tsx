import type { NextPage, NextPageContext } from 'next'
import { ProviderType } from 'next-auth/providers'
import { getProviders } from 'next-auth/react'
import { useContext, useEffect } from 'react'
import common from "../../styles/common.module.scss"
import { FilmCard } from '../components/FilmCard'

import AppContext from '../context/AppProvider'

import styles from './home.module.scss'

type HomeProps = {
  providers: ProviderType
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

export async function getServerSideProps<GetServerSideProps>() {
  const providers = await getProviders()

  return {
    props: { providers }
  }
}
