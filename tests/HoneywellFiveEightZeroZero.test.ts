import { decode } from '../src/parser';
import { HONEYWELL_5800 } from '../src/types/EventTypes';

describe('unit | HoneywellFiveEightZeroZero', () => {
  it.each([
    [
      'HONEYWELL_5800',
      '6417ff331004b4034fea53',
      '3346436',
      '0x331004',
      '46083',
      '0xb403',
    ],
  ])(
    'decodes a honeywell5800 %s event',
    (
      description,
      payload: string,
      Decimal_Id,
      Hex_ID,
      sensorPayload,
      sensorPayloadHex,
    ) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[HONEYWELL_5800] = {
        decimal_id: Decimal_Id,
        hex_id: Hex_ID,
        sensor_payload: sensorPayload,
        sensor_payload_hex: sensorPayloadHex,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
