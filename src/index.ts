/**
 * A Branded Type for values parseable to number.
 */
import { decode } from './parser';
// import { DecodedPayload } from './types';
import { base64decode } from './lib/utils';
import { binaryToHex } from './lib/HexConvertor';

export const decodePayload = (...args: string[]) => {
  return decode(...args);
};

export const decodeTtnPayload = (receivedPayload: string) => {
  return decodePayload(binaryToHex(base64decode(receivedPayload)));
};

export const decodeChirpstackPayload = (receivedPayload: string) => {
  return decodePayload(binaryToHex(base64decode(receivedPayload)));
};

export const decodeAwsIotPayload = (receivedPayload: string) => {
  return decodePayload(binaryToHex(base64decode(receivedPayload)));
};

export const decodeKerlinkPayload = (receivedPayload: string) => {
  return decodePayload(binaryToHex(base64decode(receivedPayload)));
};
