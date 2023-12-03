// rawGameSet: '3 blue, 4 red'
export function normalizeGameSet(rawGameSet: string) {
  // value: '3 blue'
  return rawGameSet.split(',').reduce((acc, value) => {
    const [count, color] = value.trim().split(' ')
    return [...acc, { color, count: Number(count) }]
  }, [] as Array<{ color: string, count: number }>)
}

// rawGame: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
export function normalizeGame(rawGame: string) {
  // gameLabel =  'Game 1'
  // rawGameValue = '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
  const [gameLabel, rawGameValue] = rawGame.split(':')

  // gameId = '1'
  const [, gameId] = gameLabel.split(' ')

  // rawGameSets = ['3 blue, 4 red', '1 red, 2 green, 6 blue', ...]
  const rawGameSets = rawGameValue.split(';')

  // [{ color: 'blue', count: 3 }, { color: 'red', count: 4 }]
  const gameSets = rawGameSets.map(normalizeGameSet)

  return { gameId: Number(gameId), gameSets }
}

export function isGamePossible(
  { normalizedGame, bag }:
  { normalizedGame: ReturnType<typeof normalizeGame>; bag: Record<string, number>}
) {
  const bagColors = Object.keys(bag)
  for (const gameSet of normalizedGame.gameSets) {
    for (const reveal of gameSet) {
      // Revealed color not part of colors in the bag
      if (!bagColors.includes(reveal.color)) {
        return false
      }
      // Revealed count exceeds what's in the bag for this color
      if (reveal.count > bag[reveal.color]) {
        return false
      }
    }
  }
  return true
}

export function getFewestCountPerColor(
  { normalizedGame }:
  { normalizedGame: ReturnType<typeof normalizeGame> }
): Record<string, number> {
  const result: Record<string, number> = {
    'blue': 0,
    'red': 0,
    'green': 0
  }

  for (const gameSet of normalizedGame.gameSets) {
    for (const reveal of gameSet) {
      if (reveal.count > result[reveal.color]) {
        result[reveal.color] = reveal.count
      }
    }
  }

  return result
}