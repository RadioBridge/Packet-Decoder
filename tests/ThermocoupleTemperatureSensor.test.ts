import { decode } from '../src/parser';
import { THERMOCOUPLE_TEMP } from '../src/types/EventTypes';

describe('unit | ThermocoupleTemperatureSensor', () => {
  it.each([
    [
      'with 141300015d00',
      '141300015d00',
      'Periodic Report',
      21.81,
      'No Faults',
    ],
    [
      'with 121300015e00',
      '121300015e00',
      'Periodic Report',
      21.88,
      'No Faults',
    ],
    [
      'with 111300015f00',
      '111300015f00',
      'Periodic Report',
      21.94,
      'No Faults',
    ],
  ])(
    'decodes thermocouple temperature sensor: %s',
    (description, payload: string, eventState, currentTemp, faults) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[THERMOCOUPLE_TEMP] = {
        event: eventState,
        faults: faults,
        current_temp: { value: currentTemp, unit: 'C' },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
