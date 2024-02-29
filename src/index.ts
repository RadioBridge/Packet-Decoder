/**
 * A Branded Type for values parseable to number.
 */
import { decode } from './parser';
import { DecodedPayload } from './types';

export const decodePayload = (hexPayload: string): DecodedPayload => {
  return decode(hexPayload);
};
