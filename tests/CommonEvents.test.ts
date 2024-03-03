import { decode } from '../src/parser';
import { DOWNLINK, RESET, SUPERVISORY, TAMPER } from '../src/types/EventTypes';

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

  /**
   * Reset events
   */
  it.each([
    ['HW: 2.2, FM: 2.5.13', '10000a2288ad703c', '2.2', '2.5.13'],
    ['HW: 1.0, FM: 1.6', '100006100106181e', '1.0', '1.6'],
    ['HW: 2.7, FM: 2.2.16', '100011278850703c', '2.7', '2.2.16'],
  ])(
    'decodes a RESET: %s event',
    (description, supervisoryPayload, hardwareVersion, firmwareVersion) => {
      const decodedData = decode(supervisoryPayload);
      const expectedOutput = {};
      expectedOutput[RESET] = {
        hardwareVersion,
        firmwareVersion,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );

  /**
   * Downlink events
   */
  it.each([
    ['DW: Invalid', '17ff01', 'Invalid', null],
    [
      'Misc error in DOWNLINK',
      '18ff0d0600080708070800',
      'Misc error in DOWNLINK',
      '06 00 08 07 08 07 08 00',
    ],
    ['DW: Msg Valid', '15ff02', 'Msg Valid', null],
    [
      'Msg Valid - No Errors',
      '16ff0311019e0000000000',
      'Msg Valid - No Errors',
      '11 01 9E 00 00 00 00 00',
    ],
  ])(
    'decodes a Downlink: %s event',
    (description, supervisoryPayload, expectedEvent, extendedBytes) => {
      const decodedData = decode(supervisoryPayload);
      const expectedOutput = {};
      expectedOutput[DOWNLINK] = {
        extendedBytes,
        event: expectedEvent,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
