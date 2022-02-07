import { FiX } from "react-icons/fi"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import Portal from "../../hoc/Portal"

import styles from "./modalSignIn.module.scss"
import { useContext, useEffect } from "react"
import AppContext from "../../context/AppProvider"
import { ProviderType } from "next-auth/providers"

type ModalSignInProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalSignIn({ isOpen, onClose }: ModalSignInProps) {
  const { state, setState } = useContext(AppContext)
  
  useEffect(() => {
    console.log(Object.values(state.providers))
  }, [])

  return (
    <Portal>
      <div className={`${styles.modalWrapper} ${isOpen ? styles.modalOpen : ''}`} onClick={() => onClose()}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2>header</h2>

            <button type="button">
              <FiX />
            </button>
          </div>

          <div className={styles.modalBody}>
            {Object.values(state.providers).map((provider) => (
              <div key={provider.id} className={styles.modalProvider}>
                {provider.name === 'Google' ? <FaGoogle /> : <FaFacebook />}
                <p>Login com {provider.name}</p>
              </div>
            ))}

            {/* <div>
              <FaGoogle />
              <p>login com Google</p>
            </div> */}
          </div>

          <div className={styles.modalFooter}>
            <p>footer</p>
          </div>
        </div>

        <div className={styles.modalOverlay} />
      </div>
    </Portal>
  )
}