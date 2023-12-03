import { expect, test, describe } from "bun:test";
import { getFewestCountPerColor, isGamePossible, normalizeGame } from './game-parser'

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

describe("normalizeGame", () => {
  test.each([
    [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      {
        gameId: 1,
        gameSets: [
          [
            { count: 3, color: 'blue' },
            { count: 4, color: 'red' },
          ],
          [
            { count: 1, color: 'red' },
            { count: 2, color: 'green' },
            { count: 6, color: 'blue' },
          ],
          [
            { count: 2, color: 'green' },
          ],
        ]
      },
    ]
    // 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    // 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    // 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
    // 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
  ])("%s should be properly normalized", (value, expected) => {
    expect(normalizeGame(value)).toEqual(expected)
  });
})

describe("isGamePossible", () => {
  // 12 red cubes, 13 green cubes, and 14 blue cubes
  const bag: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14
  }

  test.each([
    [ 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', true ],
    [ 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', true ],
    [ 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', false ],
    [ 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', false ],
    [ 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', true ],
  ])("%s should be properly normalized", (value, expected) => {
    expect(isGamePossible({ normalizedGame: normalizeGame(value), bag })).toBe(expected)
  });
})

describe("getFewestCountPerColor", () => {
  test.each([
    [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      {
        red: 4,
        green: 2,
        blue: 6
      }
    ],
    [
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      {
        red: 1,
        green: 3,
        blue: 4
      }
    ],
    [
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      {
        red: 20,
        green: 13,
        blue: 6
      }
    ],
    [
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      {
        red: 14,
        green: 3,
        blue: 15
      }
    ],
    [
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
      {
        red: 6,
        green: 3,
        blue: 2
      }
    ],
  ])("%s should be properly normalized", (value, expected) => {
    expect(getFewestCountPerColor({ normalizedGame: normalizeGame(value) })).toEqual(expected)
  });
})