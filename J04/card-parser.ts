export function parseCard(line: string) {
  const [, rawCardString] = line.split(':')
  const [rawWinningNumbersString, rawMyNumbersString] = rawCardString.split('|')

  const winningNumbers = rawWinningNumbersString.trim().split(' ').filter(v => v !== '').map(Number)
  const myNumbers = rawMyNumbersString.trim().split(' ').filter(v => v !== '').map(Number)

  return { winningNumbers, myNumbers}
}

export function getMatchingNumbers(
  { myNumbers, winningNumbers }:
  { myNumbers: number[], winningNumbers: number[] }
) {
  return myNumbers.reduce((acc, myNumber) => {
    if (winningNumbers.includes(myNumber)) {
      return [...acc, myNumber]
    }
    return acc
  }, [] as number[])
}

export function computePoints(matchingNumbers: number[]) {
  return matchingNumbers.reduce((acc) => {
    return acc ? acc * 2 : 1
  }, 0)
}