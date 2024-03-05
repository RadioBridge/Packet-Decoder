import { decode } from '../src/parser';
import { HIGH_PRECISION_TILT_SENSOR } from '../src/types/EventTypes';

describe('unit | HighPrecisionTiltSensor', () => {
  it.each([
    ['with 120f00580814', '120f00580814', null, 20, 88.8],
    ['with 1c0f0059030c', '1c0f0059030c', null, 12, 89.3],
    ['with 180f00590109', '180f00590109', null, 9, 89.1],
    ['with 180f00590109', '1a0f0059030c', null, 12, 89.3],
  ])(
    'decodes high precision tilt sensor: %s',
    (
      description,
      payload: string,
      eventState,
      temperature,
      tiltAngleVerticalAxis,
    ) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[HIGH_PRECISION_TILT_SENSOR] = {
        temperature: { value: temperature, unit: 'C' },
        tilt_angle_vertical_axis: {
          value: tiltAngleVerticalAxis,
          unit: 'Degrees',
        },
      };
      if ('event' in decodedData) {
        expectedOutput[HIGH_PRECISION_TILT_SENSOR].push('event', eventState);
      }
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
