import { FiX } from "react-icons/fi"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { useContext } from "react"
import { signIn } from "next-auth/react"

import Portal from "../../hoc/Portal"
import AppContext from "../../context/AppProvider"

import styles from "./modalSignIn.module.scss"

type ModalSignInProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalSignIn({ isOpen, onClose }: ModalSignInProps) {
  const { state } = useContext(AppContext)
  const providers = state.providers

  const handleSignIn = (providerId: string): void => {
    signIn(providerId)
  }

  return (
    <Portal>
      <div className={`${styles.modalWrapper} ${isOpen ? styles.modalOpen : ''}`}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2>Faça o login</h2>

            <button type="button" onClick={() => onClose()}>
              <FiX />
            </button>
          </div>

          <div className={styles.modalBody}>
            {providers.map((provider): JSX.Element => (
              <button type="button" key={provider.id} className={styles.modalProvider} onClick={() => handleSignIn(provider.id)}>
                {provider.name === 'Google' ? <FaGoogle /> : <FaFacebook />}
                <p>Login com {provider.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.modalOverlay} onClick={() => onClose()} />
      </div>
    </Portal>
  )
}