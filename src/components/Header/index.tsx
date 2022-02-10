import { Session } from "next-auth"
import { useSession, signOut, getProviders } from "next-auth/react"
import Link from "next/link"
import { useContext, useEffect, useRef, useState } from "react"
import { FiLogIn, FiLogOut, FiMenu, FiX, FiMessageSquare, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import AppContext from "../../context/AppProvider"
import ModalSignIn from "../ModalSignIn"

import styles from "./header.module.scss"
interface IDropMenu {
  isOpen: boolean,
  session: Session | null,
  handleSignIn: () => void,
  closeRequest: () => void,
}

const DropMenu = ({ isOpen, session, handleSignIn, closeRequest }: IDropMenu): JSX.Element => {
  const dropdown = useRef<HTMLDivElement | null>(null)

  /**
   * close dropdown menu when click outside
   */
  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(evt: MouseEvent) {
      const target = evt.target as Node

      if (dropdown.current && !dropdown.current.contains(target)) {
        closeRequest()
      }
    }

    window.addEventListener("click", handleClickOutside)

    return () => window.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  if (isOpen) {
    return (
      <div className={styles.dropContent} ref={dropdown}>
        <div>
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
      </div>
    )
  }

  return <></>
}


export function Header(): JSX.Element {
  const { state, setState } = useContext(AppContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDropMenuOpen, setIsDropMenuOpen] = useState<boolean>(false)
  const { data: session } = useSession()

  /**
   * fetch nextauth providers to ensure any accessible page will have that info to
   * build the signin modal
   */
  useEffect(() => {

    (async () => {
      const providers = await getProviders()
      const formatedProviders = providers && Object.values(providers).map(provider => ({
        id: provider.id,
        name: provider.name,
        type: provider.type
      }))

      setState({
        ...state,
        providers: formatedProviders,
      })
    })()

  }, [])

  /**
   * close signin modal only after login flow has ended
   */
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
            <a className={styles.headerNav} onClick={() => setIsDropMenuOpen(!isDropMenuOpen)}>
              {session.user?.name}
              {isDropMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
            </a>
          )}

          {!session && (
            <a className={styles.headerNav} onClick={() => setIsModalOpen(true)}>
              Entrar
              <FiLogIn />
            </a>
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
          closeRequest={() => setIsDropMenuOpen(false)}
        />

        <ModalSignIn isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </header>
    </>
  )
}