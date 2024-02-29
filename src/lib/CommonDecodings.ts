import { hexToBinaryMessageDecoder } from './HexConvertor';
import { HexDecimal } from '../types';

export function binaryStateDecode(
  hexData: HexDecimal,
  bitMsgs: { [key: number]: string | undefined; nobit?: string },
  prefix: string = '',
) {
  const dataMessagePayload = hexToBinaryMessageDecoder(hexData['hex'], bitMsgs);

  return prefix + dataMessagePayload;
}
