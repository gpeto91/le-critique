import styles from './filmCard.module.scss'

export function FilmCard(): JSX.Element {
  return (
    <div className={styles.filmCard}>
      <div>
        <img src="/images/almost-famous.jpg" alt="Quase famosos" />
      </div>
      <div className={styles.filmTitle}>
        <span>Titulo do filme</span>
      </div>
    </div>
  )
}