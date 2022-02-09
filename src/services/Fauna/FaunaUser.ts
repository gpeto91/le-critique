import { query as q } from "faunadb"
import { fauna } from "./fauna";

interface IUser {
  name: string,
  email: string,
}

export async function CreateUser(user: IUser): Promise<boolean> {
  try {
    await fauna.query(
      q.If(
        q.Not(
          q.Exists(
            q.Match(
              q.Index('user_by_email'),
              q.Casefold(user.email)
            )
          )
        ),

        q.Create(
          q.Collection('users'),
          { data: user }
        ),
        
        q.Get(
          q.Match(
            q.Index('user_by_email'),
            q.Casefold(user.email)
          )
        )
      )
    )

    return true
  } catch {
    return false
  }
}