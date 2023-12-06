import { parseRawAlmanac, applyConverters } from "./almanac-parser";

async function main1() {
  // const path = "./input-example.txt";
  const path = "./input.txt";

  const file = Bun.file(path);
  const text = await file.text();

  const rawAlmanac = text.split('\n\n')

  const { seedNumbers, converters }= parseRawAlmanac(rawAlmanac)

  const locationNumbers = seedNumbers.map(seedNumber => applyConverters({ seedNumber, converters }))

  console.log('Result is: ', Math.min(...locationNumbers))
}

main1()
