const ARBITRARY_MULTIPLIER = 11
export const UI_COLORS = [
  '#bdb2ff',
  '#caffbf',
  '#fdffb6',
  '#ffc6ff',
  '#ffd6a5',
  '#9bf6ff',
  '#a0c4ff',
  '#ffadad'
]

export function getRandomColor(id: number) {
  // Get consistent index from an id
  const index = Math.abs((ARBITRARY_MULTIPLIER * id) % UI_COLORS.length)
  return UI_COLORS[index]
}
