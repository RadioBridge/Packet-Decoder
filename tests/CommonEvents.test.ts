import { decode } from '../src/parser';
import { SUPERVISORY, TAMPER } from '../src/types/EventTypes';

describe('unit | supervisoryEvent', () => {
  it.each([
    ['with 2.6v', '1901030126000000000000', '2.6V'],
    ['with 2.7v', '1c01030127000000000000', '2.7V'],
  ])(
    'decodes a supervisory event %s',
    (description, supervisoryPayload, batteryVoltage) => {
      const decodedData = decode(supervisoryPayload);
      const expectedOutput = {};
      expectedOutput[SUPERVISORY] = {
        BatteryLow: true,
        ErrorWithLastDownlink: true,
        TamperState: false,
        TamperSinceLastReset: false,
        threshold: 'X-axis over threshold',
        battery: batteryVoltage,
        accumulationCount: '0',
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );

  /**
   * Tamper events
   */
  it.each([
    ['Open', '190201', 'Open'],
    ['Closed', '180200', 'Closed'],
  ])(
    'decodes a tamper %s event',
    (description, supervisoryPayload, expectedState) => {
      const decodedData = decode(supervisoryPayload);
      const expectedOutput = {};
      expectedOutput[TAMPER] = {
        event: expectedState,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
