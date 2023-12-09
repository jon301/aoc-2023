export function parseDirections(rawDirections: string) {
  return rawDirections.split('')
}
export function parseNetwork(rawNetwork: string) {

  const rawNodes = rawNetwork.split('\n')

  return rawNodes.map(rawNode => {
    const regex = /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/g
    const [, start, left, right] = regex.exec(rawNode)!

    return { start, left, right }
  })
}

export function networkArrayToMap(networkArray: ReturnType<typeof parseNetwork>) {
    return networkArray.reduce((acc, value) => {
      return {
        ...acc,
        [value.start]: { left: value.left, right: value.right
        }
      }
    }, {} as Record<string, { left: string; right: string }>)
}