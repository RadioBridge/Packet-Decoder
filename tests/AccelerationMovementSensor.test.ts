import { decode } from '../src/parser';
import { ACCELERATION_MOVEMENT_SENSOR } from '../src/types/EventTypes';

describe('unit | AccelerationMovementSensor', () => {
  it.each([
    ['stopped', '110e01', 'Acceleration stopped'],
    ['started', '100e00', 'Acceleration started'],
  ])(
    'decodes an Acceleration %s event',
    (description, payload, expectedState) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[ACCELERATION_MOVEMENT_SENSOR] = {
        event: expectedState,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
