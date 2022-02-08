import styles from './filmCard.module.scss'

type FilmCardProps = {
  go: () => void;
}

export function FilmCard({ go }: FilmCardProps): JSX.Element {
  return (
    <div className={styles.filmCard} onClick={() => go()}>
      <div>
        <img src="/images/almost-famous.jpg" alt="Quase famosos" />
      </div>
      <div className={styles.filmTitle}>
        <span>Titulo do filme</span>
      </div>
    </div>
  )
}