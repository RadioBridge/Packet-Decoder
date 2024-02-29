import { decode } from '../src/parser';
import { AMBIENT_LIGHT_SENSOR } from '../src/types/EventTypes';

describe('unit | AmbientLightSensor', () => {
  it.each([['3', '160b060301', null, 3]])(
    'decodes a ambient light measurement: %s',
    (description, payload: string, expectedState, expectedMeasurement) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[AMBIENT_LIGHT_SENSOR] = {
        event: expectedState,
        lightMeasurement: expectedMeasurement,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
