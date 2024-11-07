const ARBITRARY_MULTIPLIER = 11

export function getRandomColor(id: number) {
  const colors = [
    '#bdb2ff',
    '#caffbf',
    '#fdffb6',
    '#ffc6ff',
    '#ffd6a5',
    '#9bf6ff',
    '#a0c4ff',
    '#ffadad'
  ]
  // Get consistent index from an id
  const index = Math.abs((ARBITRARY_MULTIPLIER * id) % colors.length)
  return colors[index]
}
