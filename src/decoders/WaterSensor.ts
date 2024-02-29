import { HexDecimal } from '../types';
import { hexToDecimalMessageDecoder } from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  const dataMessage = {};
  if (hexDecimal.length >= 1) {
    const byteZeroHex = hexDecimal[1];
    const byteOneHex = hexDecimal[2];
    const bitMsgs = ['Water or liquid present', 'Water or liquid not present'];
    dataMessage['event'] = hexToDecimalMessageDecoder(
      byteZeroHex['decimal'],
      bitMsgs,
    );

    dataMessage['relativeMeasurement'] = byteOneHex['decimal'];
  }

  return dataMessage;
}
