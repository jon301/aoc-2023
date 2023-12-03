import { getNumbersAdjacentToSymbol } from "./engine-schematic-reader";

async function main1() {
  const path = "./input1.txt";
  const file = Bun.file(path);
  const text = await file.text();

  const schematic = text.split('\n')

  const result = schematic.reduce((acc, line, index) => {
    const includedPartNumbers = getNumbersAdjacentToSymbol({ line, currentLineIndex: index, schematic })
    return acc + includedPartNumbers.reduce((total, num) => total + num, 0)
  }, 0)

  console.log('Result is: ', result)
}

main1()
