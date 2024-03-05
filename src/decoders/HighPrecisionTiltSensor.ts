import type { HexDecimal } from '../types';
import {
  hexToDecimalMessageDecoder,
  signedHexToDecimal,
} from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  let wholeNum: number = 0;
  let fraction: number = 0;
  if (2 in hexDecimal) {
    wholeNum = hexDecimal[2]['decimal'];
  }

  if (3 in hexDecimal) {
    fraction = hexDecimal[3]['decimal'] / 10;
  }
  const dataMessage: { [key: string]: string | object } = {};
  // The 8-bit event for message 0x06 is a two-byte ASCII
  if (1 in hexDecimal) {
    const byteHex: number = hexDecimal[1]['decimal'];
    const bitMsgs: string[] = [
      'Periodic report',
      'Sensor transitioned toward the vertical orientation',
      'Sensor transitioned away from the vertical orientation',
      'Report on change toward the vertical orientation',
      'Report on change away from the vertical orientation',
    ];
    dataMessage['event'] = hexToDecimalMessageDecoder(byteHex, bitMsgs);
  }

  if (2 in hexDecimal) {
    dataMessage['tilt_angle_vertical_axis'] = {
      value: wholeNum + fraction,
      unit: 'Degrees',
    };
  }

  if (4 in hexDecimal) {
    const temp: number = signedHexToDecimal(hexDecimal[4]['hex']);
    dataMessage['temperature'] = { unit: 'C', value: temp };
  }
  return dataMessage;
}
