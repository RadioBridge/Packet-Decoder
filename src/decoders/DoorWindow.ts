import { HexDecimal } from '../types';
import { binaryStateDecode } from '../lib/CommonDecodings';

export default function (hexDecimal: [HexDecimal]) {
  const dataMessage = {};
  if (hexDecimal.length >= 1) {
    const byteZeroHex = hexDecimal[1];

    dataMessage['event'] = binaryStateDecode(byteZeroHex);
  }

  return dataMessage;
}
