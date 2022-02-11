import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { add, selectComments } from "../../store/slices/commentSlice"
import type { Comment as CommentType } from "../../store/slices/commentSlice"
import { FiUser, FiClock, FiZap } from "react-icons/fi"

import common from "../../../styles/common.module.scss"
import Comment from "../../components/Comment"
import styles from "./film.module.scss"
import { format, formatISO } from "date-fns"

export default function Film(): JSX.Element {
  const { data: session } = useSession()
  const [commentSent, setCommentSent] = useState<boolean | null>(null)
  const dispatch = useAppDispatch()
  const comments = useAppSelector(selectComments)

  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <Head>
        <title>le.critique | {slug}</title>
      </Head>

      <img className={styles.banner} src="/images/banner.jpeg" alt="Quase famosos" />

      <main className={`${common.content} ${common.noMenuMargin}`}>
        <div className={styles.filmInfo}>
          <div className={styles.infoItem}>
            <FiUser />
            <div>
              <span>Director</span>
              <span>Stanley Kubrick</span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FiZap />
            <div>
              <span>Released</span>
              <span>02/08/2007</span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FiClock />
            <div>
              <span>Duration</span>
              <span>123 min</span>
            </div>
          </div>
        </div>

        <h2 className={styles.title}>Titulo do filme</h2>

        <article className={styles.body}>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum repellat velit impedit quia, odio voluptatum provident, labore nihil ab assumenda omnis nulla, corporis minima voluptate esse? Ex soluta est beatae.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas amet quaerat a ipsum ea. Optio quis totam numquam minus architecto aspernatur voluptates. Ut, mollitia ab delectus quos distinctio ipsum tempore?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, corrupti numquam. Qui, at ullam aperiam repudiandae illum modi ipsum quam veritatis repellendus voluptatem doloribus distinctio dolores nihil minus eos! Quasi!</p>
        </article>

        {session && (
          <Comment
            sent={commentSent}
            handleSubmit={(payload) => {
              const obj: CommentType = {
                author: session.user?.name as string,
                text: payload.text,
                created_at: formatISO(new Date()),
                filmSlug: slug as string,
              }

              dispatch(add(obj))
              setCommentSent(true)

              setTimeout(() => {
                setCommentSent(null)
              }, 500)
            }}
          />
        )}

        {!session && (
          <h2>Login to comment</h2>
        )}

        {comments.map(comment => (
          <div key={comment.filmSlug}>
            <span>{comment.author}</span>
            <p>{comment.text}</p>
            <span>{format(new Date(comment.created_at), "dd/MM/yyyy")}</span>
          </div>
        ))}

      </main>
    </>
  )
}