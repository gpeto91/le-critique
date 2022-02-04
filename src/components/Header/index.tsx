import Link from "next/link"
import { FiLogIn } from 'react-icons/fi'

import styles from "./header.module.scss"

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/">
          <a>
            <img src="/images/logo.svg" alt="Le Critique" />
          </a>
        </Link>

        <Link href="/">
          <a className={styles.headerNav}>
            Entrar
            <FiLogIn />
          </a>
        </Link>
      </div>
    </header>
  )
}