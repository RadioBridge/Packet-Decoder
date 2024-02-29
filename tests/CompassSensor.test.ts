import { decode } from '../src/parser';
import { COMPASS_SENSOR } from '../src/types/EventTypes';

describe('unit | CompassSensorEvent', () => {
  it.each([
    [
      'Angle rose, angle: 524, temp: 8',
      '181A01020C08',
      'Angle rose above upper threshold',
      524,
      8,
    ],
    [
      'Periodic report, angle: 8202, temp: 186',
      '171A00200ABA',
      'Periodic report',
      8202,
      186,
    ],
  ])(
    'decodes a compass sensor %s event',
    (
      description,
      payload: string,
      expectedState,
      expectedAngle,
      expectedTemperature,
    ) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[COMPASS_SENSOR] = {
        event: expectedState,
        angle: expectedAngle,
        temperature: expectedTemperature,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
