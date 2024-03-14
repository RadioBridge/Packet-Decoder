// @ts-nocheck

import { hexToDecimal, signedHexToDecimal } from '../lib/HexConvertor';
import type { HexDecimal } from '../types';
// Assuming sensorState is a boolean variable
export default function (hexDecimal: HexDecimal[]) {
  const dataMessage = {};
  if (1 in hexDecimal) {
    const byteOneHexData = hexDecimal[1]['decimal'];
    switch (byteOneHexData) {
      case 0:
        if (2 in hexDecimal) {
          dataMessage['error_event'] = errorEventDecode(hexDecimal);
        }
        break;
      case 1:
        if (7 in hexDecimal) {
          dataMessage['wind_direction'] = windDirectionDecode(hexDecimal);
        }
        break;
      case 2:
        if (7 in hexDecimal) {
          dataMessage['wind_speed'] = windSpeedDecode(hexDecimal);
        }
        break;
      case 3:
        if (7 in hexDecimal) {
          dataMessage['pressure_temp_humidity'] =
            pressureTempHumidity(hexDecimal);
        }
        break;
      case 4:
        if (7 in hexDecimal) {
          dataMessage['rain'] = rainDecode(hexDecimal);
        }
        break;
      case 5:
        if (7 in hexDecimal) {
          dataMessage['hail'] = hailDecode(hexDecimal);
        }
        break;
      case 6:
        if (7 in hexDecimal) {
          dataMessage['station_status'] = stationStatusDecode(hexDecimal);
        }
        break;
    }
  }
  return dataMessage;
}

function errorEventDecode(hexDecimal: [HexDecimal]) {
  const errorMsgs: string[] = [];
  const byteTwoHexData = hexDecimal[2]?.binary;

  if (byteTwoHexData) {
    if (1 == byteTwoHexData[7]) {
      errorMsgs.push('Timeout waiting for response from weather station');
    }
    if (1 == byteTwoHexData[6]) {
      errorMsgs.push('CRC Error');
    }
    if (1 == byteTwoHexData[5]) {
      errorMsgs.push('Some data is marked as invalid');
    }
  }

  return errorMsgs;
}

function windDirectionDecode(hexDecimal: [HexDecimal]) {
  const byteTwoHexData = hexDecimal[2]?.hex || '00';
  const byteThreeHexData = hexDecimal[3]?.hex || '00';
  const windDirectionMin = hexToDecimal(byteTwoHexData + byteThreeHexData);

  const byteFourHexData = hexDecimal[4]?.hex || '00';
  const byteFiveHexData = hexDecimal[5]?.hex || '00';
  const windDirectionAvg = hexToDecimal(byteFourHexData + byteFiveHexData);

  const byteSixHexData = hexDecimal[6]?.hex || '00';
  const byteSevenHexData = hexDecimal[7]?.hex || '00';
  const windDirectionMax = hexToDecimal(byteSixHexData + byteSevenHexData);

  const res: Record<string, object> = {};
  res['min'] = {
    value: windDirectionMin,
    unit: 'Degrees',
    directionFrom: 'North',
  };
  res['max'] = {
    value: windDirectionMax,
    unit: 'Degrees',
    directionFrom: 'North',
  };
  res['avg'] = {
    value: windDirectionAvg,
    unit: 'Degrees',
    directionFrom: 'North',
  };
  return res;
}

function windSpeedDecode(hexDecimal: [HexDecimal]) {
  const byteTwoHexData = hexDecimal[2]?.hex || '0000';
  const byteThreeHexData = hexDecimal[3]?.hex || '0000';
  let windSpeedMin = hexToDecimal(byteTwoHexData + byteThreeHexData);
  windSpeedMin = windSpeedMin / 1000;

  const byteFourHexData = hexDecimal[4]?.hex || '0000';
  const byteFiveHexData = hexDecimal[5]?.hex || '0000';
  let windSpeedAvg = hexToDecimal(byteFourHexData + byteFiveHexData);
  windSpeedAvg = windSpeedAvg / 1000;

  const byteSixHexData = hexDecimal[6]?.hex || '0000';
  const byteSevenHexData = hexDecimal[7]?.hex || '0000';
  let windSpeedMax = hexToDecimal(byteSixHexData + byteSevenHexData);
  windSpeedMax = windSpeedMax / 1000;

  const res: Record<string, object> = {};
  res['min'] = { value: windSpeedMin, unit: 'm/s' };
  res['max'] = { value: windSpeedMax, unit: 'm/s' };
  res['avg'] = { value: windSpeedAvg, unit: 'm/s' };
  return res;
}

function pressureTempHumidity(hexDecimal: [HexDecimal]) {
  const byteTwoHexData = hexDecimal[2]?.hex || '0000';
  const byteThreeHexData = hexDecimal[3]?.hex || '0000';
  let temperature = signedHexToDecimal(byteTwoHexData + byteThreeHexData, 16);
  temperature = temperature / 10;

  const byteFourHexData = hexDecimal[4]?.hex || '0000';
  const byteFiveHexData = hexDecimal[5]?.hex || '0000';
  let pressure = hexToDecimal(byteFourHexData + byteFiveHexData);
  pressure = pressure * 10;

  const byteSixHexData = hexDecimal[6]?.hex || '0000';
  const byteSevenHexData = hexDecimal[7]?.hex || '0000';
  let humidity = hexToDecimal(byteSixHexData + byteSevenHexData);
  humidity = humidity / 10;

  const res: Record<string, object> = {};
  res['temperature'] = { value: temperature, unit: 'C' };
  res['pressure'] = { value: Number(pressure.toFixed(0)), unit: 'Pa' };
  res['humidity'] = { value: humidity, unit: '%' };
  return res;
}

function rainDecode(hexDecimal: [HexDecimal]) {
  const byteTwoHexData = hexDecimal[2]?.hex || '0000';
  const byteThreeHexData = hexDecimal[3]?.hex || '0000';
  const rainDuration = hexToDecimal(byteTwoHexData + byteThreeHexData);

  const byteFourHexData = hexDecimal[4]?.hex || '0000';
  const byteFiveHexData = hexDecimal[5]?.hex || '0000';
  let rainAccumulation = hexToDecimal(byteFourHexData + byteFiveHexData);
  rainAccumulation = rainAccumulation / 100;

  const byteSixHexData = hexDecimal[6]?.hex || '0000';
  const byteSevenHexData = hexDecimal[7]?.hex || '0000';
  let rainIntensity = hexToDecimal(byteSixHexData + byteSevenHexData);
  rainIntensity = rainIntensity / 10;

  const res: Record<string, object> = {};
  res['duration'] = { value: rainDuration, unit: 'Seconds' };
  res['accumulation'] = { value: rainAccumulation, unit: 'mm' };
  res['intensity'] = { value: rainIntensity, unit: 'mm/h' };
  return res;
}

function hailDecode(hexDecimal: [HexDecimal]) {
  const byteTwoHexData = hexDecimal[2]?.hex || '0000';
  const byteThreeHexData = hexDecimal[3]?.hex || '0000';
  const hailDuration = hexToDecimal(byteTwoHexData + byteThreeHexData);

  const byteFourHexData = hexDecimal[4]?.hex || '0000';
  const byteFiveHexData = hexDecimal[5]?.hex || '0000';
  let hailAccumulation = hexToDecimal(byteFourHexData + byteFiveHexData);
  hailAccumulation = hailAccumulation / 10;

  const byteSixHexData = hexDecimal[6]?.hex || '0000';
  const byteSevenHexData = hexDecimal[7]?.hex || '0000';
  let hailIntensity = hexToDecimal(byteSixHexData + byteSevenHexData);
  hailIntensity = hailIntensity / 10;

  const res: Record<string, object> = {};
  res['duration'] = { value: hailDuration, unit: 'Seconds' };
  res['accumulation'] = { value: hailAccumulation, unit: 'mm' };
  res['intensity'] = { value: hailIntensity, unit: 'mm/h' };

  return res;
}
function stationStatusDecode(hexDecimal: [HexDecimal]) {
  const byteTwoHexData = hexDecimal[2]?.hex || '0000';
  const byteThreeHexData = hexDecimal[3]?.hex || '0000';
  let heatingTemperature = signedHexToDecimal(
    byteTwoHexData + byteThreeHexData,
    16,
  );
  heatingTemperature = heatingTemperature / 10;

  const byteFourHexData = hexDecimal[4]?.hex || '0000';
  const byteFiveHexData = hexDecimal[5]?.hex || '0000';
  let heatingVoltage = hexToDecimal(byteFourHexData + byteFiveHexData);
  heatingVoltage = heatingVoltage / 10;

  const byteSixHexData = hexDecimal[6]?.hex || '0000';
  const byteSevenHexData = hexDecimal[7]?.hex || '0000';
  let supplyVoltage = hexToDecimal(byteSixHexData + byteSevenHexData);
  supplyVoltage = supplyVoltage / 10;

  let referenceVoltage: string | number = 'N/A';

  if (9 in hexDecimal) {
    const byteEightHexData = hexDecimal[8]?.hex || '0000';
    const byteNineHexData = hexDecimal[9]?.hex || '0000';
    referenceVoltage = hexToDecimal(byteEightHexData + byteNineHexData);
    referenceVoltage = referenceVoltage / 1000;
  }

  const res: Record<string, object> = {
    temperature: { value: heatingTemperature, unit: 'C' },
    voltage: { value: heatingVoltage, unit: 'V' },
    supply: { value: supplyVoltage, unit: 'V' },
    reference: { value: referenceVoltage },
  };

  return res;
}
