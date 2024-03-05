import { decode } from '../src/parser';
import { ULTRASONIC_LEVEL_SENSOR } from '../src/types/EventTypes';

describe('unit | UltraSonicLevelSensor', () => {
  it.each([
    ['13100401f4', 'Report on change decrease', 500],
    ['14100306e7', 'Report on change increase', 1767],
    ['1510040411', 'Report on change decrease', 1041],
    ['1210020247', 'Distance has fallen below lower threshold', 583],
    ['121001270f', 'Distance has risen above upper threshold', 9999],
  ])(
    'decodes ultra sonic sensor: %s, event: %s, distance: %s',
    (payload: string, eventState, expectedState) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[ULTRASONIC_LEVEL_SENSOR] = {
        event: eventState,
        sensor_state: { value: expectedState, unit: 'mm' },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
