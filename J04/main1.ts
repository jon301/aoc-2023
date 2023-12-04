import { computePoints, getMatchingNumbers, parseCard } from "./card-parser";

async function main1() {
  // const path = "./input-example.txt";
  const path = "./input.txt";

  const file = Bun.file(path);
  const text = await file.text();

  const scratchcards = text.split('\n')

  const result = scratchcards.reduce((acc, line) => {
    const { winningNumbers, myNumbers } = parseCard(line)
    const matchingNumbers = getMatchingNumbers({ winningNumbers, myNumbers })
    const points = computePoints(matchingNumbers)
    return acc + points
  }, 0)

  console.log('Result is: ', result)
}

main1()
