export function getCalibrationValue1(value: string) {
  const splitted = value.split('')

  const a = splitted.find(v => !isNaN(Number(v)))!
  const b = splitted.findLast(v => !isNaN(Number(v)))!

  return Number(a + b)
}
