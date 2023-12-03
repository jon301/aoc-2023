import { expect, test, describe } from "bun:test";
import { getCalibrationValue1 } from './calibration1'

describe("getCalibration1", () => {
  test("should handle value with only 1 digit", () => {
    expect(getCalibrationValue1('nvfchhrbcone1nine')).toBe(11);
  });

  test("should handle value with multiple digits", () => {
    expect(getCalibrationValue1('9seventwothree8sevenfive4two')).toBe(94);
  });
})
