import { expect, test, describe } from "bun:test";
import { parseLine, getNumbersAdjacentToSymbol } from './engine-schematic-reader'

describe("parseLine", () => {
  test.each([
    ['467..114..', [{ value: 467, indexStart: 0, indexEnd: 2 }, { value: 114, indexStart: 5, indexEnd: 7 }]],
    ['...*......', []],
    ['..35..633.', [{ value: 35, indexStart: 2, indexEnd: 3 }, { value: 633, indexStart: 6, indexEnd: 8 } ]],
    ['.132...246', [{ value: 132, indexStart: 1, indexEnd: 3 }, { value: 246, indexStart: 7, indexEnd: 9 } ]],
    [
      '...122..................*.....*..........................919..509*..........&...@.........../...........................+.......*...........',
      [
        { value: 122, indexStart: 3, indexEnd: 5 },
        { value: 919, indexStart: 57, indexEnd: 59 },
        { value: 509, indexStart: 62, indexEnd: 64 },
      ]
    ]
  ])("%s should be properly parsed", (value, expected) => {
    expect(parseLine(value)).toEqual(expected)
  });
})


const schematic = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598.."
]

describe("getNumbersAdjacentToSymbol", () => {
  test.each([
    [ 0, schematic[0]!, [467] ],
    [ 1, schematic[1]!, [] ],
    [ 2, schematic[2]!, [35, 633] ],
    [ 3, schematic[3]!, [] ],
    [ 4, schematic[4]!, [617] ],
    [ 5, schematic[5]!, [] ],
    [ 6, schematic[6]!, [592] ],
    [ 7, schematic[7]!, [755] ],
    [ 8, schematic[8]!, [] ],
    [ 9, schematic[9]!, [664, 598] ],
  ])("line %i '%s' should have included numbers %o", (currentLineIndex, line, expected) => {
    expect(getNumbersAdjacentToSymbol({ line, currentLineIndex, schematic })).toEqual(expected)
  });
})
