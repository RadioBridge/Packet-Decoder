import { decode } from '../src/parser';
import { MAGNETOMETER_SENSOR } from '../src/types/EventTypes';

describe('unit | MagnetometerSensor', () => {
  it.each([
    [
      'with temperature 54',
      '6418feae100000022536',
      null,
      '54',
      -20976,
      '0',
      '549',
    ],
  ])(
    'decodes magnetometer sensor: %s',
    (description, payload: string, messageType, temp, xaxis, yaxis, zaxis) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      if ('messageType' in decodedData) {
        expectedOutput[MAGNETOMETER_SENSOR].messageType = messageType;
      }
      if ('xaxis' in decodedData) {
        expectedOutput[MAGNETOMETER_SENSOR].xaxis = xaxis;
      }
      if ('yaxis' in decodedData) {
        expectedOutput[MAGNETOMETER_SENSOR].yaxis = yaxis;
      }
      if ('zaxis' in decodedData) {
        expectedOutput[MAGNETOMETER_SENSOR].zaxis = zaxis;
      }
      if ('temperature' in decodedData) {
        expectedOutput[MAGNETOMETER_SENSOR].temperature = temp;
      }
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
