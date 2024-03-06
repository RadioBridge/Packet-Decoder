import { decode } from '../src/parser';
import {
  DEVICE_INFO,
  DOWNLINK,
  LINK_QUALITY,
  RESET,
  SUPERVISORY,
  TAMPER,
} from '../src/types/EventTypes';

describe('unit | supervisoryEvent', () => {
  it.each([
    ['with 2.6v', '1901030126000000000000', '2.6V'],
    ['with 2.7v', '1c01030127000000000000', '2.7V'],
  ])(
    'decodes a supervisory event %s',
    (description, payload, batteryVoltage) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[SUPERVISORY] = {
        BatteryLow: true,
        ErrorWithLastDownlink: true,
        TamperState: false,
        TamperSinceLastReset: false,
        threshold: 'X-axis over threshold',
        battery: batteryVoltage,
        accumulationCount: 0,
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
  ])('decodes a tamper %s event', (description, payload, expectedState) => {
    const decodedData = decode(payload);
    const expectedOutput = {};
    expectedOutput[TAMPER] = {
      event: expectedState,
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });

  /**
   * Reset events
   */
  it.each([
    ['HW: 2.2, FM: 2.5.13', '10000a2288ad703c', '2.2', '2.5.13'],
    ['HW: 1.0, FM: 1.6', '100006100106181e', '1.0', '1.6'],
    ['HW: 2.7, FM: 2.2.16', '100011278850703c', '2.7', '2.2.16'],
  ])(
    'decodes a RESET: %s event',
    (description, payload, hardwareVersion, firmwareVersion) => {
      const decodedData = decode(payload);
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
    (description, payload, expectedEvent, extendedBytes) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[DOWNLINK] = {
        extendedBytes,
        event: expectedEvent,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );

  /**
   * linkQuality events
   */
  it.each([
    ['RSSI: -71, SNR: 6', '1bfb01b906', -71, 6],
    ['RSSI: -45, SNR: 7', '12fb00d307', -45, 7],
    ['RSSI: -67, SNR: 8', '14fb00bd08', -67, 8],
  ])(
    'decodes a linkQuality event %s',
    (description, payload: string, rssi, snr) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[LINK_QUALITY] = {
        rssi: rssi,
        snr: snr,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );

  /**
   * Device info events
   */
  it.each([
    [
      'Device Info Message 1 of 1',
      '13fa11fc00010100000000',
      'Device Info Message 1 of 1',
      'DOWNLINK_ADVANCED',
      '00 01 01 00 00 00 00',
    ],
    [
      'Device Info Message 2 of 2',
      '12fa22fc00010100000000',
      'Device Info Message 2 of 2',
      'DOWNLINK_ADVANCED',
      '00 01 01 00 00 00 00',
    ],
  ])(
    'decodes a deviceInfo event %s',
    (
      description,
      payload: string,
      expectedEvent,
      packetType,
      downlinkBytes,
    ) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[DEVICE_INFO] = {
        event: expectedEvent,
        packetType,
        downlinkBytes,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
