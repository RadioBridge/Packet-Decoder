import { decode } from '../src/parser';
import { DOOR_WINDOW_SENSOR } from '../src/types/EventTypes';

describe('unit | DoorWindowEvent', () => {
  it('decodes a door window open event', () => {
    const payload = '170300';
    const decodedData = decode(payload);
    const expectedOutput = {};
    expectedOutput[DOOR_WINDOW_SENSOR] = {
      event: 'Closed',
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });
  it('decodes a door window close event', () => {
    const payload = '160301';
    const decodedData = decode(payload);
    const expectedOutput = {};
    expectedOutput[DOOR_WINDOW_SENSOR] = {
      event: 'Opened',
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });
});
