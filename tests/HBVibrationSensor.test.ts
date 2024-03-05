import { decode } from '../src/parser';
import { HB_VIBRATION_SENSOR } from '../src/types/EventTypes';

describe('unit | HBVibrationSensor', () => {
  it.each([
    ['1f1c001c2c1ba8', 'Channel 1', 'Periodic Report', '0.28000', 11, 27, 1.68],
    ['1b1c000100149d', 'Channel 1', 'Periodic Report', '0.01000', 0, 20, 1.57],
    [
      '1b1c002d0929a0',
      'Channel 1',
      'Periodic Report',
      '0.45000',
      2.25,
      41,
      1.6,
    ],
  ])(
    'decodes a HBVibration %s event',
    (
      payload: string,
      axis,
      expectedEvent,
      vibrationVelocity,
      vibrationGforce,
      temperature,
      biasVoltage,
    ) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[HB_VIBRATION_SENSOR] = {
        axis: axis,
        event: expectedEvent,
        vibration_velocity: { value: vibrationVelocity, unit: 'inches/sec' },
        vibration_gforce: { value: vibrationGforce, unit: 'g' },
        accelerator_temp: { value: temperature, unit: 'Celsius' },
        bias_voltage: { value: biasVoltage, unit: 'V' },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
