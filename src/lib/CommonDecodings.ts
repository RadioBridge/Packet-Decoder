import { hexToBinaryMessageDecoder } from './HexConvertor';
import { HexDecimal } from '../types';

export function binaryStateDecode(hexData: HexDecimal, prefix: string = '') {
  const bitMsgs = {
    0: 'Opened',
    nobit: 'Closed',
  };
  const dataMessagePayload = hexToBinaryMessageDecoder(hexData['hex'], bitMsgs);

  return prefix + dataMessagePayload;
}
