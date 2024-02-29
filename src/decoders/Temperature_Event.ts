import { HexDecimal } from '../types';
import { hexToDecimalMessageDecoder } from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  const dataMessage: string | never[] = [];
  if (hexDecimal.length > 3) {
    const byteZeroHex = hexDecimal[1]['decimal'];

    // Current temperature in degrees Celsius
    const bitMsgs = [
      'Periodic Report',
      'Temperature has risen above upper threshold',
      'Temperature has fallen below lower threshold',
      'Report on change increase',
      'Report on change decrease',
    ];
    dataMessage['event'] = hexToDecimalMessageDecoder(byteZeroHex, bitMsgs);
    dataMessage['current_temperature'] = { value: dataMessage, unit: 'C' };
  }

  return dataMessage;
}
