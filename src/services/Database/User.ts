import { CreateUser } from "../Fauna/FaunaUser";

export type UserType = {
  name: string;
  email: string;
}

export interface IUser {
  create: (user: UserType) => Promise<void>,
  update: () => void,
  delete: () => void,
  getAll: () => void,
  getOne: () => void,
}

export class User implements IUser {
  async create(user: UserType) {
    await CreateUser(user)
  }

  update() {}

  delete() {}

  getAll() {}

  getOne() {}
}