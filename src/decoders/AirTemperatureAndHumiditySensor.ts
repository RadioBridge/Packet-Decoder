import type { HexDecimal } from '../types';
import { identifyEventType } from '../lib/IdentifyEventType';
import {
  binaryToDecimal,
  hexToDecimalMessageDecoder,
} from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  const eventType = identifyEventType(hexDecimal[0]['decimal']);
  let dataMessage = {};
  if (hexDecimal.length >= 2) {
    const byteZeroHex = hexDecimal[1]['decimal'];
    const byte4 = 4 in hexDecimal ? hexDecimal[4]['binary'] : null;
    const byte5 = 5 in hexDecimal ? hexDecimal[5]['binary'] : null;
    const currentState = getSensorState(
      hexDecimal[2]['binary'],
      hexDecimal[3]['binary'],
      byte4,
      byte5,
    );

    const bitMsgs: string[] = [
      'Periodic Report',
      'Temperature has risen above upper threshold',
      'Temperature has fallen below lower threshold',
      'Temperature report on change increase',
      'Temperature report on change decrease',
      eventType === 'INTERNAL_TEMPERATURE'
        ? 'Shake Message'
        : 'Humidity has risen above upper threshold',
      'Humidity has fallen below lower threshold',
      'Humidity report on change increase',
      'Humidity report on change decrease',
    ];

    const dataMessages: string[] = hexToDecimalMessageDecoder(
      byteZeroHex,
      bitMsgs,
    );

    // Relative temperature measurement: $byteTwoHex\n
    dataMessage = {
      type: eventType,
      event: dataMessages,
      ...currentState,
    };
  }
  return dataMessage;
}

function getSensorState(
  byteOneBin: string,
  byteTwoBin: string,
  byteThreeBin: string | null,
  byteFourBin: string | null,
) {
  const finalArray: Record<string, string | number> = {};
  let byteOneHex: string = byteOneBin; // Current temperature in degrees Celsius

  // suppose we recv byte one as  0x9D = 10011101 = remove 1st MSB then we get 0011101=0x1D
  // and if 1st MSB = 1 then negative and if it's 0 then positive
  if ('1' === byteOneHex.substring(0, 1)) {
    byteOneHex = binaryToDecimal(byteOneHex.substring(1));
    byteOneHex = '-' + byteOneHex;
  } else {
    // positive number
    byteOneHex = binaryToDecimal(byteOneHex.substring(1));
  }
  // First decimal of current temperature (0-9) in the most significant 4-bits.
  let byteTwoHex = '' + byteTwoBin.match(/.{1,4}/g);
  byteTwoHex = binaryToDecimal(byteTwoHex).toString();
  finalArray['current_temperature'] = `${byteOneHex}.${byteTwoHex}`;
  if (byteThreeBin !== null && byteFourBin !== null) {
    let byteThreeHex: string = byteThreeBin; // Humidity in % relative humidity (0-100%)
    if (byteThreeHex.startsWith('1')) {
      byteThreeHex = binaryToDecimal(byteThreeHex.substring(1)).toString();
      byteThreeHex = '-' + byteThreeHex;
    } else {
      // positive number
      byteThreeHex = binaryToDecimal(byteThreeHex.substring(1)).toString();
    }
    // First decimal of relative humidity (0-9) in the most significant 4-bits.
    let byteFourHex: string = byteFourBin.split('', 4)[0] || '0';
    byteFourHex = binaryToDecimal(byteFourHex).toString();

    finalArray['humidity'] = `${byteThreeHex}.${byteFourHex}`;
  }

  return finalArray;
}
