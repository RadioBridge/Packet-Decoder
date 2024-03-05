import { decode } from '../src/parser';
import { TILT_EVENT } from '../src/types/EventTypes';

describe('unit | TiltSensor', () => {
  it.each([
    ['1b0a0238', 'Report on change toward vertical', 56],
    ['160a034a', 'Report on change toward horizontal', 74],
    ['150a0219', 'Report on change toward vertical', 25],
  ])(
    'decodes tilt sensor payload %s, event: %s, Degrees',
    (payload: string, eventState, tiltAngleVerticalAxis) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[TILT_EVENT] = {
        event: eventState,
        tilt_angle_vertical_axis: {
          value: tiltAngleVerticalAxis,
          unit: 'Degrees',
        },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
