import { normalizeGame, getFewestCountPerColor } from "./game-parser";

async function main2() {
  const path = "./input1.txt";
  const file = Bun.file(path);
  const text = await file.text();

  const values = text.split('\n')

  const result = values.reduce((acc, value) => {
    const normalizedGame = normalizeGame(value)
    const fewestCount = getFewestCountPerColor({ normalizedGame })
    const power = fewestCount.green * fewestCount.red * fewestCount.blue
    return acc + power
  }, 0)

  console.log('Result is: ', result)
}

main2()
