const ICONS = [
  'Seven',
  'Cherry',
  'Diamond',
  'Lemon',
  'Horseshoe',
  'Bag',
  'Orange',
  'Plum',
  'Bar',
  'Watermelon',
  'Cloverleaf',
  'Bell'
]

export const logResult = state => {
  console.log(ICONS[state.left], ICONS[state.center], ICONS[state.right])
}
