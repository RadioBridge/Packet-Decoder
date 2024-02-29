import { decode } from '../src/parser';
import { WATER_SENSOR } from '../src/types/EventTypes';

describe('unit | WaterSensorEvent', () => {
  it.each([
    [
      'water not present, measure: 5',
      '1a080105',
      5,
      'Water or liquid not present',
    ],
    ['water present, measure: 253', '190800fd', 253, 'Water or liquid present'],
    [
      'water not present, measure: 16',
      '18080110',
      16,
      'Water or liquid not present',
    ],
    [
      'water not present, measure: 21',
      '16080115',
      21,
      'Water or liquid not present',
    ],
  ])(
    'decodes a water rope sensor: %s ',
    (
      description,
      payload: string,
      expectedRelativeMeasurement,
      expectedWaterPresent,
    ) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[WATER_SENSOR] = {
        event: expectedWaterPresent,
        relativeMeasurement: expectedRelativeMeasurement,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
