import { HexDecimal } from '../types';
import { hexToDecimalMessageDecoder } from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  const dataMessage: { [key: string]: string | object } = {};
  if (hexDecimal.length >= 2 && 1 in hexDecimal) {
    const byteHex = hexDecimal[1].decimal;
    const bitMsgs: string[] = [
      'Sensor transitioned to vertical',
      'Sensor transitioned to horizontal',
      'Report on change toward vertical',
      'Report on change toward horizontal',
    ];
    dataMessage['event'] = hexToDecimalMessageDecoder(byteHex, bitMsgs);
  }

  if (hexDecimal.length >= 3 && 2 in hexDecimal) {
    dataMessage['tilt_angle_vertical_axis'] = {
      value: hexDecimal[2].decimal,
      unit: 'Degrees',
    };
  }

  return dataMessage;
}
