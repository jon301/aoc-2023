import { expect, test, describe } from "bun:test";
import { getCalibrationValue2 } from './calibration2'

/**
 * letter letter
 * letter num
 * num letter
 * num num
 * num
 * letter
 */
describe("getCalibration2", () => {
  test.each([
    ['two1nine', 29],
    ['eightwothree', 83],
    ['abcone2threexyz', 13],
    ['xtwone3four', 24],
    ['4nineeightseven2', 42],
    ['zoneight234', 14],
    ['7pqrstsixteen', 76],
    ['9zt', 99],
    ['one2one', 11],
    ['onethree2', 12],
    ['o4nethree', 43],
    ['o4nethree5', 45],
    ['o4n', 44],
    ['othreen', 33],
    ['twone', 21],
    ['sevenine', 79],
    ['nineight', 98],
  ])("%s should calibrate to %i", (value, expected) => {
    expect(getCalibrationValue2(value)).toBe(expected)
  });
})