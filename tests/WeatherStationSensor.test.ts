import { decode } from '../src/parser';
import { WEATHER_STATION } from '../src/types/EventTypes';

describe('unit | WeatherStationSensor', () => {
  it.each([
    [
      'with wind direction',
      '181b010027004b00b8',
      { value: 39, unit: 'Degrees', directionFrom: 'North' },
      { value: 184, unit: 'Degrees', directionFrom: 'North' },
      { value: 75, unit: 'Degrees', directionFrom: 'North' },
      'wind_direction',
    ],
    [
      'with rain',
      '141b04000000000000',
      { value: 0, unit: 'Seconds' },
      { value: 0, unit: 'mm' },
      { value: 0, unit: 'mm/h' },
      'rain',
    ],
    [
      'with wind speed',
      '121b02000003e70000',
      { value: 0, unit: 'm/s' },
      { value: 0, unit: 'm/s' },
      { value: 0.999, unit: 'm/s' },
      'wind_speed',
    ],
  ])(
    'decodes weather station sensor: %s',
    (description, payload: string, d1, d2, d3, type) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      if (type == 'wind_direction') {
        expectedOutput[WEATHER_STATION] = {
          wind_direction: {
            min: d1,
            max: d2,
            avg: d3,
          },
        };
      }
      if (type == 'rain') {
        expectedOutput[WEATHER_STATION] = {
          rain: {
            duration: d1,
            accumulation: d2,
            intensity: d3,
          },
        };
      }
      if (type == 'wind_speed') {
        expectedOutput[WEATHER_STATION] = {
          wind_speed: {
            min: d1,
            max: d2,
            avg: d3,
          },
        };
      }
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
  it.each([
    [
      'with station stattus',
      '161b0600000000007a0e37',
      { value: 0, unit: 'C' },
      { value: 0, unit: 'V' },
      { value: 12.2, unit: 'V' },
      { value: 3.639 },
    ],
  ])(
    'decodes weather station sensor: %s',
    (description, payload: string, d1, d2, d3, d4) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[WEATHER_STATION] = {
        station_status: {
          temperature: d1,
          voltage: d2,
          supply: d3,
          reference: d4,
        },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
  it.each([
    [
      'with station status',
      '161b0600000000007a0e37',
      { value: 0, unit: 'C' },
      { value: 0, unit: 'V' },
      { value: 12.2, unit: 'V' },
      { value: 3.639 },
    ],
  ])(
    'decodes weather station sensor: %s',
    (description, payload: string, d1, d2, d3, d4) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[WEATHER_STATION] = {
        station_status: {
          temperature: d1,
          voltage: d2,
          supply: d3,
          reference: d4,
        },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
  it.each([
    [
      'with pressure_temp_humidity',
      '1a1b03002e20cc0187',
      { value: 4.6, unit: 'C' },
      { value: 83960, unit: 'Pa' },
      { value: 39.1, unit: '%' },
    ],
  ])(
    'decodes weather station sensor: %s',
    (description, payload: string, d1, d2, d3) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[WEATHER_STATION] = {
        pressure_temp_humidity: {
          temperature: d1,
          pressure: d2,
          humidity: d3,
        },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
  it.each([
    [
      'with hail',
      '151b05000000000000',
      { value: 0, unit: 'Seconds' },
      { value: 0, unit: 'mm' },
      { value: 0, unit: 'mm/h' },
    ],
  ])(
    'decodes weather station sensor: %s',
    (description, payload: string, d1, d2, d3) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[WEATHER_STATION] = {
        hail: {
          duration: d1,
          accumulation: d2,
          intensity: d3,
        },
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
  it.each([
    ['with invalid data', '171b0004', ['Some data is marked as invalid']],
  ])(
    'decodes weather station sensor: %s',
    (description, payload: string, error) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[WEATHER_STATION] = {
        error_event: error,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
