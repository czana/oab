const USERS = {
  5501512322897: {
    mention: 'czana',
    email: 't.czana@selleo.com',
  },
  4402038631408: {
    mention: 'bart',
    email: 'b.wojtowicz@selleo.com',
    index: 1
  },
  5501412812678: {
    mention: 'p.kuwik',
    email: 'p.kuwik@selleo.com',
    index: 0
  }
}

export default id => {
  return USERS[id]
}
