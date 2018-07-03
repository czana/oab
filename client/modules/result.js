import { uniq } from 'lodash'

const ICONS = [
  'Seven',
  'Cherry',
  'Diamond',
  'Lemon',
  'Horseshoe',
  'Cloverleaf',
  'Orange',
  'Plum',
  'Bell',
  'Watermelon'
]

export const logResult = state => {
  console.log(ICONS[state.left], ICONS[state.center], ICONS[state.right])
}

export const resultResponse = result => {
  const uniqResult = uniq(Object.values(result))

  if (uniqResult.length == 1) return win(ICONS[uniqResult[0]])

  return lost()
}

const win = icon => {
  return { win: true, icon: icon }
}

const lost = () => {
  return { win: false }
}
