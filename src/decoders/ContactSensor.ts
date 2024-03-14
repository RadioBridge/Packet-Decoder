// @ts-nocheck

import { HexDecimal } from '../types';
import { hexToDecimalMessageDecoder } from '../lib/HexConvertor';

export default function (hexDecimal: HexDecimal[]) {
  const dataMessage: { [key: string]: string | object } = {};
  if (hexDecimal.length >= 1) {
    const byteZeroHex = hexDecimal[1];
    const bitMsgs = ['Shorted', 'Opened', 'Shorted', 'Opened'];
    dataMessage['event'] = hexToDecimalMessageDecoder(
      byteZeroHex['decimal'],
      bitMsgs,
    );
  }

  return dataMessage;
}
