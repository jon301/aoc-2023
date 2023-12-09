import { arrangeHistorySequences, extrapolateBackwardsValues, normalizeReport } from "./report";

async function main2() {
  // const path = "./input-example.txt";
  const path = "./input.txt";

  const file = Bun.file(path);
  const text = await file.text();

  const rawHistories = text.split('\n')

  const histories = normalizeReport(rawHistories)

  const result = histories.reduce((acc, history) => {
    const arranged = arrangeHistorySequences(history)
    return acc + extrapolateBackwardsValues(arranged)
  }, 0)

  console.log('Result is: ', result)
}

main2()
