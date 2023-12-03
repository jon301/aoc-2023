import { getCalibrationValue2 } from './calibration2'

async function main2() {
  const path = "./input2.txt";
  const file = Bun.file(path);
  const text = await file.text();

  const values = text.split('\n')

  const result = values.reduce((acc, value) => {
    const calibrationValue = getCalibrationValue2(value)
    return acc + calibrationValue
  }, 0)

  console.log('Result is: ', result)
}

main2()