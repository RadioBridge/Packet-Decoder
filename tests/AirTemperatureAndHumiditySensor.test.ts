import { decode } from '../src/parser';
import {
  AIR_TEMP_HUMIDITY_SENSOR,
  INTERNAL_TEMPERATURE,
} from '../src/types/EventTypes';

describe('unit | AirTemperatureAndHumidity', () => {
  it.each([
    ['with 1219009630', '1219009630', 'Periodic Report', '-22.3'],
    ['with 1e19008d60', '1e19008d60', 'Periodic Report', '-13.6'],
    ['with 1619009170', '1619009170', 'Periodic Report', '-17.7'],
  ])(
    'decodes internal temperature: %s',
    (description, payload: string, eventDescription, temp) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[INTERNAL_TEMPERATURE] = {
        event: eventDescription,
        type: INTERNAL_TEMPERATURE,
        current_temperature: temp,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
  it.each([
    [
      'with 140d0096004450',
      '140d0096004450',
      'Periodic Report',
      '68.0',
      '-22.0',
    ],
    [
      'with 120d058f303c00',
      '120d058f303c00',
      'Humidity has risen above upper threshold',
      '60.0',
      '-15.3',
    ],
    [
      'with 130d058f603c00',
      '130d058f603c00',
      'Humidity has risen above upper threshold',
      '60.0',
      '-15.6',
    ],
  ])(
    'decodes air temperature and humidity: %s',
    (description, payload: string, eventDescription, humidity, temp) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[AIR_TEMP_HUMIDITY_SENSOR] = {
        event: eventDescription,
        type: AIR_TEMP_HUMIDITY_SENSOR,
        current_temperature: temp,
        humidity: humidity,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
