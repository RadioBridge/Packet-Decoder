import { decode } from '../src/parser';
import { GPS_SENSOR } from '../src/types/EventTypes';

describe('unit | GpsDevice', () => {
  it.each([
    [
      '00167165bea3973d1512cc',
      'Valid GPS Fix',
      '170.6992535000',
      '102.47912440000',
    ],
    [
      '78167165445b963d1512cc',
      'Valid GPS Fix',
      '169.8978710000',
      '102.47912440000',
    ],
    [
      'f01671653e3d963d1512cc',
      'Valid GPS Fix',
      '169.8577814000',
      '102.47912440000',
    ],
  ])(
    'decodes a payload: %s, gps status: %s with latitude: %s, longitude: %s event',
    (payload: string, gpsStatus, latitude, longitude) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[GPS_SENSOR] = {
        event: gpsStatus,
        latitude: latitude,
        longitude: longitude,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
