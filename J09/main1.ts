import { arrangeHistorySequences, extrapolateValues, normalizeReport } from "./report";

async function main1() {
  // const path = "./input-example.txt";
  const path = "./input.txt";

  const file = Bun.file(path);
  const text = await file.text();

  const rawHistories = text.split('\n')

  const histories = normalizeReport(rawHistories)

  const result = histories.reduce((acc, history) => {
    const arranged = arrangeHistorySequences(history)
    return acc + extrapolateValues(arranged)
  }, 0)

  console.log('Result is: ', result)
}

main1()
