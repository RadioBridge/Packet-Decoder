// @ts-nocheck

import { HexDecimal } from '../types';
import { binaryStateDecode } from '../lib/CommonDecodings';
export default function (hexDecimal: HexDecimal[]) {
  const dataMessage = {};
  if (hexDecimal.length >= 1) {
    const byteZeroHex = hexDecimal[1];
    const bitMsgs = {
      0: 'Opened',
      nobit: 'Closed',
    };
    dataMessage['event'] = binaryStateDecode(byteZeroHex, bitMsgs);
  }

  return dataMessage;
}
