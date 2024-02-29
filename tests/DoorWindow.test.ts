import { decode } from '../src/parser';
import { DOOR_WINDOW_SENSOR } from '../src/types/EventTypes';

describe('unit | DoorWindowEvent', () => {
  it.each([
    ['close', '170300', 'Closed'],
    ['open', '160301', 'Opened'],
  ])(
    'decodes a door window %s event',
    (description, payload: string, expectedState) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[DOOR_WINDOW_SENSOR] = {
        event: expectedState,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
