import { HexDecimal } from '../types';
import { hexToDecimalMessageDecoder } from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  const dataMessage = {};
  if (hexDecimal.length >= 2) {
    const byteZero = hexDecimal[1]['decimal'];
    const byteOne = hexDecimal[2]['decimal'];
    const bitMsgs = [
      'Periodic Report',
      'Ambient light has risen above upper threshold',
      'Ambient light has fallen below lower threshold',
      'Report on change increase',
      'Report on change decrease',
    ];
    dataMessage['event'] = hexToDecimalMessageDecoder(byteZero, bitMsgs);
    dataMessage['lightMeasurement'] = byteOne;
  }

  return dataMessage;
}
