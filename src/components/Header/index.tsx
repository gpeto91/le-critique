import { Session } from "next-auth"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiLogIn, FiLogOut, FiMenu, FiX, FiMessageSquare } from 'react-icons/fi'
import ModalSignIn from "../ModalSignIn"

import styles from "./header.module.scss"
interface IDropMenu {
  isOpen: boolean,
  session: Session | null,
  handleSignIn: () => void,
}

const DropMenu = ({ isOpen, session, handleSignIn }: IDropMenu): JSX.Element => {
  if (isOpen) {
    return (
      <div className={styles.dropContent}>
        {session && (
          <>
            <span>Olá, <b>{session.user?.name}</b></span>

            <a onClick={() => signOut()}>
              <FiMessageSquare />
              Seus comentários
            </a>

            <a onClick={() => signOut()}>
              <FiLogOut />
              Sair
            </a>
          </>
        )}

        {!session && (
          <>
            <a onClick={() => handleSignIn()}>
              Entrar
              <FiLogIn />
            </a>
          </>
        )}
      </div>
    )
  }

  return <></>
}


export function Header(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDropMenuOpen, setIsDropMenuOpen] = useState<boolean>(false)
  const { data: session } = useSession()

  useEffect(() => {
    setIsModalOpen(false)
  }, [session])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <Link href="/">
            <a>
              <img src="/images/logo.svg" alt="Le Critique" />
            </a>
          </Link>

          {session && (
            <Link href="/">
              <a className={styles.headerNav} onClick={() => signOut()}>
                {session.user?.name}
                <FiLogIn />
              </a>
            </Link>
          )}

          {!session && (
            <Link href="/">
              <a className={styles.headerNav} onClick={() => setIsModalOpen(true)}>
                Entrar
                <FiLogIn />
              </a>
            </Link>
          )}

          <button className={styles.hamburguerBtn} onClick={() => setIsDropMenuOpen(!isDropMenuOpen)}>
            {isDropMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <DropMenu
          isOpen={isDropMenuOpen}
          session={session}
          handleSignIn={() => {
            setIsModalOpen(true)
            setIsDropMenuOpen(false)
          }}
        />

        <ModalSignIn isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </header>
    </>
  )
}