import { FormEvent, useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

import 'react-toastify/dist/ReactToastify.min.css'

import styles from "./comment.module.scss"

type ReviewPayload = {
  author: string;
  text: string;
}

type CommentProps = {
  handleSubmit: (payload: ReviewPayload) => void;
  sent: boolean | null;
}

export default function Comment({ handleSubmit, sent }: CommentProps): JSX.Element {
  const [comment, setComment] = useState<string>("")

  useEffect(() => {
    if (sent === true) {
      toast("Your review is sent! 👏", { type: toast.TYPE.SUCCESS, autoClose: 3500, theme: 'dark' })
      setComment("")
    } else if (sent === false) {
      toast("Oh no! Looks like we had a problem...", { type: toast.TYPE.ERROR, autoClose: 3500, theme: 'dark' })
    }
  }, [sent])

  function handleComment(evt: FormEvent) {
    evt.preventDefault()

    const obj: ReviewPayload = {
      author: "anom",
      text: comment,
    }

    handleSubmit(obj)
  }

  return (
    <>
      <hr />
      <h2>Reviews</h2>
      <form className={styles.form} onSubmit={handleComment}>
        <div className={styles.textAreaContainer}>
          <textarea className={styles.textArea} value={comment} onChange={event => event.target.value.length <= 250 && setComment(event.target.value)}></textarea>
          <span className={comment.length === 250 ? styles.commentFull : ''}>{comment.length}/250</span>
        </div>
        <button className={styles.submitReviewBtn} type="submit">Comment</button>
      </form>

      <ToastContainer limit={3} />
    </>
  )
}