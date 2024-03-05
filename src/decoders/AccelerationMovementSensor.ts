import { HexDecimal } from '../types';
import { hexToDecimalMessageDecoder } from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  const dataMessage = {};
  if (hexDecimal.length >= 1) {
    const byteZeroHex = hexDecimal[1];
    const bitMsgs = ['Acceleration started', 'Acceleration stopped'];
    dataMessage['event'] = hexToDecimalMessageDecoder(
      byteZeroHex['decimal'],
      bitMsgs,
    );
  }

  return dataMessage;
}
