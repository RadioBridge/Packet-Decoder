import { HexDecimal } from '../types';
import {
  hexToDecimalMessageDecoder,
  hexToDecimal,
  binaryToDecimal,
  signedHexToDecimal,
} from '../lib/HexConvertor';

type HBVibrationDecodeType = {
  axis: string;
  event: string | null;
  vibration_velocity: object;
  vibration_gforce: object;
  accelerator_temp: object;
  bias_voltage: object;
};

export default function (hexDecimal: [HexDecimal]) {
  let axisReport = '';
  const dataMessage: HBVibrationDecodeType = {
    axis: '',
    event: null,
    vibration_velocity: {},
    vibration_gforce: {},
    accelerator_temp: {},
    bias_voltage: {},
  };
  switch (hexDecimal[0]['decimal']) {
    case 28:
      axisReport = 'Channel 1';
      break;
    case 29:
      axisReport = 'Channel 2';
      break;
    case 30:
      axisReport = 'Channel 3';
      break;
    case 31:
      axisReport = 'Channel 4';
      break;
  }

  dataMessage['axis'] = axisReport;
  if (1 in hexDecimal) {
    const byteOneHexData = binaryToDecimal(hexDecimal[1]['binary'].slice(-4));
    const vibrationEventPayload = {
      0: 'Periodic Report',
      1: 'High frequency vibration has risen above upper threshold',
      2: 'High frequency vibration has fallen below lower threshold',
      3: 'Low frequency velocity has risen above upper threshold',
      4: 'Low frequency velocity has fallen below lower threshold',
      5: 'Accelerometer exceeded g-force range',
    };
    let decodedValue = hexToDecimalMessageDecoder(
      byteOneHexData,
      vibrationEventPayload,
    );
    if (5 == byteOneHexData) {
      const bitFourToSix = hexDecimal[1]['binary'].substr(1, 3);
      const gforceRange = {
        0: 'x1',
        1: 'x2',
        2: 'x4',
        3: 'x5',
        4: 'x8',
        5: 'x10',
        6: 'x16',
        7: 'x32',
      };
      const bitfourSixDecimal = binaryToDecimal(bitFourToSix);
      decodedValue +=
        ': ' + hexToDecimalMessageDecoder(bitfourSixDecimal, gforceRange);
    }

    dataMessage['event'] = decodedValue;
  }

  if (2 in hexDecimal) {
    const byteOnetwoHexData = hexDecimal[2]['hex'];
    const decimalVal = hexToDecimal(byteOnetwoHexData);
    const inchesPerSec = decimalVal > 0 ? decimalVal / 100 : 0;
    dataMessage['vibration_velocity'] = {
      value: inchesPerSec.toFixed(5),
      unit: 'inches/sec',
    };
  }

  if (3 in hexDecimal) {
    dataMessage['vibration_gforce'] = {
      value: hexDecimal[3]['decimal'] / 4,
      unit: 'g',
    };
  }

  if (4 in hexDecimal) {
    dataMessage['accelerator_temp'] = {
      value: signedHexToDecimal(hexDecimal[4]['hex']),
      unit: 'Celsius',
    };
  }

  if (5 in hexDecimal) {
    const voltage = hexToDecimal(hexDecimal[5]['hex']);
    dataMessage['bias_voltage'] = { value: voltage / 100, unit: 'V' };
  }
  return dataMessage;
}
