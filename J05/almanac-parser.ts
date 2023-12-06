export function parseRawAlmanac(almanac: string[]) {
  // seeds [0]
  const seedNumbers = parseSeedLine(almanac[0]).map(Number)

  // maps [1...n]
  const converters = almanac.reduce((acc, value, index) => {
    if (index === 0) {
      return acc
    }
    return [...acc, parseMapLine(value)]
  }, [] as Array<ReturnType<typeof parseMapLine>>)

  return {
    seedNumbers,
    converters
  }
}

// "seeds: 79 14 55 13"
function parseSeedLine(line: string) {
  const [, rawSeedNumbers] = line.split(':')
  const seedNumbers = rawSeedNumbers.trim().split(' ')
  return seedNumbers
}

// "seed-to-soil map:\n50 98 2\n52 50 48"
function parseMapLine(line: string) {
  const [mapName, rawConvertMaps] = line.split(':\n')
  const convertMaps = rawConvertMaps.split('\n')

  return {
    mapName,
    convertMaps: convertMaps.reduce((acc, convertMapLine) => {
      return [...acc, parseConvertMapLine(convertMapLine)]
    }, [] as Array<ReturnType<typeof parseConvertMapLine>>)
  }
}

// "50 98 2"
// destination range start / source range start / range length.
function parseConvertMapLine(convertMapLine: string) {
  const [destinationString, sourceString, rangeString] = convertMapLine.split(' ')
  return {
    sourceRangeStart: Number(sourceString.trim()),
    destinationRangeStart: Number(destinationString.trim()),
    rangeLength: Number(rangeString.trim())
  }
}

export function applyConverters(
  { seedNumber, converters }:
  { seedNumber: number; converters: Array<ReturnType<typeof parseMapLine>>}
) {
  let resultNumber: number = seedNumber

  for (const converter of converters) {
    for (const converterMap of converter.convertMaps) {
      if (resultNumber >= converterMap.sourceRangeStart && resultNumber <= (converterMap.sourceRangeStart + converterMap.rangeLength - 1)) {
        const resultNumberInSourceIndex = resultNumber - converterMap.sourceRangeStart
        if (resultNumberInSourceIndex > 0) {
          resultNumber = converterMap.destinationRangeStart + resultNumberInSourceIndex
          break;
        }
      }
    }
  }

  return resultNumber
}
