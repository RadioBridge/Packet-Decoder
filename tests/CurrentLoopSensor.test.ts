import { decode } from '../src/parser';
import { WIRELESS_420MA_CURRENT_LOOP_SENSOR } from '../src/types/EventTypes';

describe('unit | CurrentLoopSensor', () => {
  it.each([
    [
      'with 0.01 mA',
      '1211020001',
      'Analog measurement has fallen below lower threshold',
      0.01,
    ],
    ['with 0.01 mA', '181100ffff', 'Periodic Report', 655.35],
  ])(
    'decodes current loop sensor: %s',
    (description, payload: string, eventState, sensorState) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[WIRELESS_420MA_CURRENT_LOOP_SENSOR] = {
        event: eventState,
        sensor_state: { unit: 'mA', value: sensorState },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
