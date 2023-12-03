import { isGamePossible, normalizeGame } from "./game-parser";

async function main1() {
  const path = "./input1.txt";
  const file = Bun.file(path);
  const text = await file.text();

  const values = text.split('\n')

  const bag: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14
  }

  const result = values.reduce((acc, value) => {
    const normalizedGame = normalizeGame(value)
    if (isGamePossible({ normalizedGame, bag })) {
      return acc + normalizedGame.gameId
    }
    return acc
  }, 0)

  console.log('Result is: ', result)
}

main1()