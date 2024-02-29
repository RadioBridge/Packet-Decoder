import { HexDecimal } from '../types';
import { hexToDecimalMessageDecoder } from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  const dataMessage = {};
  if (hexDecimal.length >= 2) {
    const pushByte = hexDecimal[2]['decimal'];
    const bitMsgs = {
      0: 'Button Pressed',
      1: 'Button Released',
      2: 'Button Held',
      3: 'Button Released After Hold',
    };
    dataMessage['event'] = hexToDecimalMessageDecoder(pushByte, bitMsgs);
  }

  return dataMessage;
}
