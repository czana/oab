const USERS = {
  5501512322897: {
    mention: 'czana',
    email: 't.czana@selleo.com',
    index: 1
  },
  2: {
    mention: 'bart',
    email: 'b.wojtowicz@selleo.com'
  },
  55014128126783: {
    mention: 'p.kuwik',
    email: 'p.kuwik@selleo.com'
  }
}

export default id => {
  return USERS[id]
}
