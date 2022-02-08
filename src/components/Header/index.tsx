import { Session } from "next-auth"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { ReactElement, ReactNode, Ref, useEffect, useRef, useState } from "react"
import { FiLogIn, FiLogOut, FiMenu, FiX, FiMessageSquare, FiChevronDown, FiChevronUp } from 'react-icons/fi'
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDropMenuOpen, setIsDropMenuOpen] = useState<boolean>(false)
  const { data: session } = useSession()

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
            <Link href="/">
              <a className={styles.headerNav} onClick={() => setIsDropMenuOpen(!isDropMenuOpen)}>
                {session.user?.name}
                {isDropMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
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
          closeRequest={() => setIsDropMenuOpen(false)}
        />

        <ModalSignIn isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </header>
    </>
  )
}