import { decode } from '../src/parser';
import { TANK_LEVEL_SENSOR } from '../src/types/EventTypes';

describe('unit | TankLevelSensor', () => {
  it.each([
    ['opened', '180C01', 'Tank empty'],
    ['shorted', '170C00', 'Tank full'],
  ])('decodes a contact %s event', (description, payload, expectedState) => {
    const decodedData = decode(payload);
    const expectedOutput = {};
    expectedOutput[TANK_LEVEL_SENSOR] = {
      event: expectedState,
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });
});
