export function parseCard(line: string) {
  const [rawCardLabelString, rawCardString] = line.split(':')
  const [, cardId] = rawCardLabelString.split(' ').filter(v => v !== '')
  const cardLineIndex = Number(cardId) - 1

  const [rawWinningNumbersString, rawMyNumbersString] = rawCardString.split('|')

  const winningNumbers = rawWinningNumbersString.trim().split(' ').filter(v => v !== '').map(Number)
  const myNumbers = rawMyNumbersString.trim().split(' ').filter(v => v !== '').map(Number)

  return { winningNumbers, myNumbers, cardLineIndex }
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

export function getCardLineIndexesToCopy(
  { cardLineIndex, matchingNumbers }:
  { cardLineIndex: number; matchingNumbers: number[] }
) {
  return matchingNumbers.map((_, index) => {
    return cardLineIndex + index + 1
  })
}

export function computeWinningScratchcardCopiesRecursive(
  { scratchcards, originalScratchcards }:
  { scratchcards: string[]; originalScratchcards: string[] }
): number {
  const cardsCount = scratchcards.length

  if (cardsCount === 0) {
    return 0
  }

  let scratchcardCopies: string[] = []
  for (const cardLine of scratchcards) {
    const { cardLineIndex, myNumbers, winningNumbers } = parseCard(cardLine)
    const matchingNumbers = getMatchingNumbers({ winningNumbers, myNumbers })
    const cardLineIndexesToCopy = getCardLineIndexesToCopy({ cardLineIndex, matchingNumbers })
    scratchcardCopies = [
      ...scratchcardCopies,
      ...cardLineIndexesToCopy.map((cardToCopyIndex) => originalScratchcards[cardToCopyIndex])
    ]
  }

  const total = cardsCount + computeWinningScratchcardCopiesRecursive({ scratchcards: scratchcardCopies, originalScratchcards })

  return total
}

export function computeWinningScratchcardCopies({ scratchcards }: { scratchcards: string[]; }) {
  const pileOfCards: number[] = []

  for (let i = 0; i < scratchcards.length; i++) {
    const cardLine = scratchcards[i]

    // Putting the original in the pile
    pileOfCards[i] = (pileOfCards[i] || 0) + 1

    const { myNumbers, winningNumbers } = parseCard(cardLine)
    const matchingNumbers = getMatchingNumbers({ winningNumbers, myNumbers })
    const cardLineIndexesToCopy = getCardLineIndexesToCopy({ cardLineIndex: i, matchingNumbers })

    for (const cardLineIndexToCopy of cardLineIndexesToCopy) {
      pileOfCards[cardLineIndexToCopy] = (pileOfCards[cardLineIndexToCopy] || 0) + pileOfCards[i]
    }
  }

  return pileOfCards.reduce((acc, value) => {
    return acc + value
  }, 0)
}