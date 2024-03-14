// @ts-nocheck

import {
  hexToBinaryMessageDecoder,
  hexToDecimalMessageDecoder,
  signedHexToDecimal,
} from '../lib/HexConvertor';
import type { HexDecimal } from '../types';

export default function (hexDecimal: HexDecimal[]) {
  const dataMessage: { [key: string]: string | object } = {};
  if (hexDecimal.length > 3) {
    const byteZeroHex = hexDecimal[1]['decimal'];
    const byteOneHex = signedHexToDecimal(
      hexDecimal[2]['hex'] + '' + hexDecimal[3]['hex'],
      16,
    );
    const temperature = Number((byteOneHex / 16).toFixed(2));
    const byteThreeHex = hexDecimal[4]['decimal']; //Faults (see fault definitions)

    if (0 == byteThreeHex) {
      dataMessage['faults'] = 'No Faults';
    } else {
      const bitData = [
        'An open circuit such as broken thermocouple wires has been detected',
        'The input voltage is negative or greater than VDD',
        'Thermocouple temperature is too low',
        'The thermocouple temperature is too high',
        'The Cold-Junction temperature is lower than the cold-junction' +
          ' temperature low threshold',
        'The cold-Junction temperature is at or lower than the cold-junction' +
          ' temperature high threshold',
        'The hot junction temperature is outside of the normal operating range',
        'The cold-Junction temperature is outside of the normal operating range',
      ];
      dataMessage['faults'] = hexToBinaryMessageDecoder(
        hexDecimal[4]['hex'],
        bitData,
      );
    }
    const bitMsgs = [
      'Periodic Report',
      'Temperature has risen above upper threshold',
      'Temperature has fallen below lower threshold',
      'Report on change increase',
      'Report on change decrease',
      'Fault',
    ];
    //Relative temperature measurement: $byte_two_hex\n
    dataMessage['event'] = hexToDecimalMessageDecoder(byteZeroHex, bitMsgs);
    dataMessage['current_temp'] = { value: temperature, unit: 'C' };
  }
  return dataMessage;
}
