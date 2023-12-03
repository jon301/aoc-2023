// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..

// input: ..35..633.
// ouput: [
//   { value: 35, indexStart: 2, indexEnd: 3 },
//   { value: 633, indexStart: 6, indexEnd: 8 },
// ]

// edge cases:
// input: 35....633.
// input: ..35...633
export function parseLine(line: string) {
  const output: Array<{ value: number; indexStart: number; indexEnd: number }> = []

  let indexStart: number | undefined
  let indexEnd: number | undefined
  let aggregatedValue: string = ''

  for (let i = 0; i < line.length; i++) {
    const value = line[i]

    if (isNumber(value) && indexStart === undefined) {
      indexStart = i
      aggregatedValue += value
      continue
    }

    if (isNumber(value)) {
      aggregatedValue += value

      if (i === line.length - 1 && indexStart !== undefined) {
        indexEnd = i

        output.push({ value: Number(aggregatedValue), indexStart, indexEnd })

        // Reset
        indexStart = undefined
        indexEnd = undefined
        aggregatedValue = ''
      }
      continue;
    }

    if ((isPeriod(value) || isSymbol(value)) && indexStart !== undefined) {
      indexEnd = i - 1

      output.push({ value: Number(aggregatedValue), indexStart, indexEnd })

      // Reset
      indexStart = undefined
      indexEnd = undefined
      aggregatedValue = ''

      continue;
    }
  }
  return output
}

function isNumber(value: string | undefined) {
  return !isNaN(Number(value))
}

function isPeriod(value: string | undefined) {
  return value === '.'
}
function isSymbol(value: string | undefined) {
  return value !== undefined && value !== '.' && !isNumber(value)
}

export function getNumbersAdjacentToSymbol(
  { line, schematic, currentLineIndex }:
  { line: string, schematic: string[], currentLineIndex: number }
) {
  const result: number[] = []
  const parsedLine = parseLine(line)
  let toBreak = false

  for (const num of parsedLine) {
    toBreak = false

    for (let i = currentLineIndex - 1; i <= currentLineIndex + 1; i++) {
      for (let j = num.indexStart - 1; j <= num.indexEnd + 1; j++) {
        if (!toBreak) {
          const value = schematic?.[i]?.[j]

          if (isSymbol(value)) {
            result.push(num.value)
            toBreak = true
          }
        }
      }
    }
  }

  return result
}