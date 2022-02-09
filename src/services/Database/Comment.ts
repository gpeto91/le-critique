interface IComment {
  create: () => void,
  update: () => void,
  delete: () => void,
  getByFilm: () => void,
  getByUser: () => void,
}

export class Comment implements IComment {
  create() {}

  update() {}

  delete() {}

  getByFilm() {}

  getByUser() {}
}