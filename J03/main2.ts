import { getStarSymbolIndexes, computeGearRatioFromStarSymbolIndex } from "./engine-schematic-reader";

async function main2() {
  const path = "./input1.txt";
  const file = Bun.file(path);
  const text = await file.text();

  const schematic = text.split('\n')

  const result = schematic.reduce((acc, line, index) => {
    const starSymbolIndexes = getStarSymbolIndexes(line)
    return acc + starSymbolIndexes.reduce((total, starSymbolIndex) => {
      return total + computeGearRatioFromStarSymbolIndex({ starSymbolIndex, currentLineIndex: index, schematic })
    }, 0)
  }, 0)

  console.log('Result is: ', result)
}

main2()
