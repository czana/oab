const USERS = {
  5501512322897: {
    mention: 'czana',
    email: 't.czana@selleo.com'
  },
  2: {
    mention: 'bart',
    email: 'b.wojtowicz@selleo.com'
  }
}

export default id => {
  return USERS[id]
}
