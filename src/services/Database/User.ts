import { CreateUser, GetAll, UpdateUser } from "../Fauna/FaunaUser";

export type UserType = {
  name: string;
  email: string;
}

type PaginationType = {
  size?: number;
}

export interface IUser {
  create: (user: UserType) => Promise<void>,
  update: (user: UserType) => Promise<void>,
  delete: () => void,
  getAll: (pagination: PaginationType) => Promise<void>,
  getOne: () => void,
}

export class User implements IUser {
  async create(user: UserType) {
    await CreateUser(user)
  }

  async update(user: UserType) {
    await UpdateUser(user)
  }

  delete() {}

  async getAll({ size = 10 }: PaginationType) {
    await GetAll({ size })
  }

  getOne() {}
}