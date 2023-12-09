export function normalizeReport(rawHistories: string[]) {
  return rawHistories.map(rawHistory => rawHistory.split(" ").map(Number))
}


// input: [ 0, 3, 6, 9, 12, 15 ]
// output: [ [ 0, 3, 6, 9, 12, 15 ], [ 3, 3, 3, 3, 3], [ 0, 0, 0, 0] ]
export function arrangeHistorySequences(sequence: number[]): Array<number[]> {
  const shouldContinue = sequence.find(value => value !== 0)

  if (!shouldContinue) {
    return [sequence]
  }

  const newSequence = sequence.reduce((acc, value, index) => {
    if (index === sequence.length - 1) {
      return acc
    }
    const result = sequence[index + 1] - value
    return [...acc, result]
  }, [] as number[])

  return [sequence, ...arrangeHistorySequences(newSequence)]
}

export function extrapolateValues(sequences: Array<number[]>) {
  // add a 0 to the end of the last line
  const lastLine = sequences[sequences.length - 1]
  lastLine.push(0)

  for (let i = sequences.length - 2; i >= 0; i--) {
    const currentLine = sequences[i]
    const previousLine = sequences[i + 1]
    currentLine.push(currentLine[currentLine.length - 1] + previousLine[previousLine.length - 1])
  }

  const firstLine = sequences[0]
  return firstLine[firstLine.length - 1]
}

export function extrapolateBackwardsValues(sequences: Array<number[]>) {
  // add a 0 to the beginning of the last line
  const lastLine = sequences[sequences.length - 1]
  lastLine.unshift(0)

  for (let i = sequences.length - 2; i >= 0; i--) {
    const currentLine = sequences[i]
    const previousLine = sequences[i + 1]
    currentLine.unshift(currentLine[0] - previousLine[0])
  }

  const firstLine = sequences[0]
  return firstLine[0]
}