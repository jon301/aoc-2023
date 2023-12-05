import { computeWinningScratchcardCopies } from "./card-parser";

async function main1() {
  // const path = "./input-example.txt";
  const path = "./input.txt";

  const file = Bun.file(path);
  const text = await file.text();

  const scratchcards = text.split('\n')

  const result = computeWinningScratchcardCopies({ scratchcards })

  console.log('Result is: ', result)
}

main1()
