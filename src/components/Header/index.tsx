import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { FiLogIn } from 'react-icons/fi'
import ModalSignIn from "../ModalSignIn"

import styles from "./header.module.scss"

export function Header(): JSX.Element {
  const { data: session } = useSession()

  return (
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
              { session.user?.name }
              <FiLogIn />
            </a>
          </Link>
        )}

        {!session && (
          <Link href="/">
            <a className={styles.headerNav} onClick={() => signIn()}>
              Entrar
              <FiLogIn />
            </a>
          </Link>
        )}
      </div>

      <ModalSignIn isOpen={true} onClose={() => {}}/>
    </header>
  )
}