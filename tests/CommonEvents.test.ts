import { decode } from '../src/parser';
import { SUPERVISORY } from '../src/types/EventTypes';

describe('unit | supervisoryEvent', () => {
  it('decodes a supervisory event', () => {
    const supervisoryPayload = '1901030126000000000000';
    const decodedData = decode(supervisoryPayload);
    const expectedOutput = {};
    expectedOutput[SUPERVISORY] = {
      BatteryLow: true,
      ErrorWithLastDownlink: true,
      TamperState: false,
      TamperSinceLastReset: false,
      threshold: 'X-axis over threshold',
      battery: '2.6V',
      accumulationCount: '0',
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });
  it('decodes a supervisory event with different battery value', () => {
    const supervisoryPayload = '1c01030127000000000000';
    const decodedData = decode(supervisoryPayload);
    const expectedOutput = {};
    expectedOutput[SUPERVISORY] = {
      BatteryLow: true,
      ErrorWithLastDownlink: true,
      TamperState: false,
      TamperSinceLastReset: false,
      threshold: 'X-axis over threshold',
      battery: '2.7V',
      accumulationCount: '0',
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });
});
