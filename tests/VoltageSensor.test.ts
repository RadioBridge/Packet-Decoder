import { decode } from '../src/parser';
import { VOLTAGE_SENSOR } from '../src/types/EventTypes';

describe('unit | VoltageSensor', () => {
  it.each([
    [
      'VOLTAGE_SENSOR',
      '1214020006',
      'Analog measurement has fallen below lower threshold',
      0.06,
    ],
    ['VOLTAGE_SENSOR', '191404059e', 'Report on change decrease', 14.38],
  ])(
    'decodes a voltageSensor %s event',
    (description, payload: string, expectedState, sensorState) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[VOLTAGE_SENSOR] = {
        event: expectedState,
        voltage: { value: sensorState, unit: 'V' },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
