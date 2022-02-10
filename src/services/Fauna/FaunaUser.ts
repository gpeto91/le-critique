import { query as q, QueryOptions } from "faunadb"
import { fauna } from "./fauna";

interface IUser {
  name: string,
  email: string,
}

interface IPagination {
  size: number,
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

export async function UpdateUser(user: IUser): Promise<boolean> {
  try {
    await fauna.query(
      q.If(
        q.Exists(
          q.Match(
            q.Index('user_by_email'),
            q.Casefold(user.email)
          )
        ),
        q.Update(
          q.Select(
            "ref",
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          ),
          {
            data: user
          }
        ),
        ''
      )
    )

    return true
  } catch {
    return false
  }
}

export async function GetAll({ size = 10 }: IPagination): Promise<QueryOptions | boolean> {
  try {
    const users = await fauna.query(
      q.Map(
        q.Paginate(
          q.Documents(q.Collection('users')),
          {
            size,
          }
        ),
        q.Lambda("X", q.Get(q.Var("X")))
      )
      
    )

    return users
  } catch {
    return false
  }
}