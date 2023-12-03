const allLetterDigits: Record<string, string> = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
}

function getLetterDigitsIndexes(value: string): Record<string, [number, number] | undefined> {
  return Object.keys(allLetterDigits).reduce((acc, letterDigit) => {
    const index = value.indexOf(letterDigit)
    const lastIndex = value.lastIndexOf(letterDigit)
    return {
      ...acc,
      [letterDigit]: index !== -1 ? [index, lastIndex] : undefined
    }
  }, {})
}

function getFirstLetterDigit(indexes: ReturnType<typeof getLetterDigitsIndexes>) {
  let minDigit = ''
  let minIndex = Infinity
  for (const letterDigit in indexes) {
    const letterDigitIndex = indexes[letterDigit]
    if (letterDigitIndex !== undefined && letterDigitIndex[0] <= minIndex) {
      minIndex = letterDigitIndex[0]
      minDigit = letterDigit
    }
  }

  return { minIndex, minDigit }
}

function getLastLetterDigit(indexes: ReturnType<typeof getLetterDigitsIndexes>) {
  let maxDigit = ''
  let maxIndex = -1
  for (const letterDigit in indexes) {
    const letterDigitIndex = indexes[letterDigit]
    if (letterDigitIndex !== undefined && letterDigitIndex[1] >= maxIndex) {
      maxIndex = letterDigitIndex[1]
      maxDigit = letterDigit
    }
  }
  return { maxIndex, maxDigit }
}

export function getCalibrationValue2(value: string) {
  const splitted = value.split('')

  const numDigitFirstIndex = splitted.findIndex(v => !isNaN(Number(v)))!
  const numDigitLastIndex = splitted.findLastIndex(v => !isNaN(Number(v)))!

  const letterDigitIndexes = getLetterDigitsIndexes(value)

  const { minIndex: minLetterDigitIndex, minDigit: minLetterDigit } = getFirstLetterDigit(letterDigitIndexes)
  const { maxIndex: maxLetterDigitIndex, maxDigit: maxLetterDigit } = getLastLetterDigit(letterDigitIndexes)

  const firstDigit = numDigitFirstIndex !== -1 && numDigitFirstIndex < minLetterDigitIndex ? splitted[numDigitFirstIndex] : allLetterDigits[minLetterDigit]
  const lastDigit = numDigitLastIndex !== -1 && numDigitLastIndex > maxLetterDigitIndex ? splitted[numDigitLastIndex] : allLetterDigits[maxLetterDigit]

  // console.log({
  //   numDigitFirstIndex,
  //   numDigitLastIndex,
  //   minLetterDigitIndex,
  //   minLetterDigit,
  //   maxLetterDigitIndex,
  //   maxLetterDigit,
  //   letterDigitIndexes
  // })

  return Number(firstDigit + lastDigit)
}
