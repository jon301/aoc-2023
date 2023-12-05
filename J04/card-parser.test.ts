import { expect, test, describe } from "bun:test";
import { computePoints, getCardLineIndexesToCopy, getMatchingNumbers, parseCard } from './card-parser'

describe("parseCard", () => {
  test.each([
    [
      'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
      { winningNumbers: [41, 48, 83, 86, 17], myNumbers: [83, 86, 6, 31, 17, 9, 48, 53], cardLineIndex: 0 }
    ],
  ])("%s should be properly parsed", (value, expected) => {
    expect(parseCard(value)).toEqual(expected)
  });
})

describe("getMatchingNumbers", () => {
  test.each([
    [
      { winningNumbers: [41, 48, 83, 86, 17], myNumbers: [83, 86, 6, 31, 17, 9, 48, 53] },
      [ 83, 86, 17, 48 ]
    ],
  ])("should work", (input, expected) => {
    expect(getMatchingNumbers(input)).toEqual(expected)
  });
})

describe("computePoints", () => {
  test.each([
    [[ 83, 86, 17, 48 ], 8],
    [[ 32, 61 ], 2],
    [[ 84 ], 1],
    [[], 0],
  ])("%o should compute to %d", (input, expected) => {
    expect(computePoints(input)).toEqual(expected)
  });
})

describe("getCardLineIndexesToCopy", () => {
  test.each([
    [2, [ 83, 86, 17, 48 ], [3, 4, 5, 6]],
  ])("should work", (cardLineIndex, matchingNumbers, expected) => {
    expect(getCardLineIndexesToCopy({ cardLineIndex, matchingNumbers })).toEqual(expected)
  });
})