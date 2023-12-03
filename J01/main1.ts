import { getCalibrationValue1 } from './calibration1'

async function main1() {
  const path = "./input1.txt";
  const file = Bun.file(path);
  const text = await file.text();

  const values = text.split('\n')

  const result = values.reduce((acc, value) => {
    const calibrationValue = getCalibrationValue1(value)
    return acc + calibrationValue
  }, 0)

  console.log('Result is: ', result)
}

main1()