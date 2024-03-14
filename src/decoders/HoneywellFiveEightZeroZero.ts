// @ts-nocheck

import { HexDecimal } from '../types';
import { hexToDecimal } from '../lib/HexConvertor';

export default function (hexDecimal: HexDecimal[]) {
  const data_message = {};
  if (2 in hexDecimal && 3 in hexDecimal && 4 in hexDecimal) {
    data_message['hex_id'] =
      '0x' +
      hexDecimal[2]['hex'] +
      '' +
      hexDecimal[3]['hex'] +
      '' +
      hexDecimal[4]['hex'];
    data_message['decimal_id'] = hexToDecimal(
      hexDecimal[2]['hex'] +
        '' +
        hexDecimal[3]['hex'] +
        '' +
        hexDecimal[4]['hex'],
    );
  }

  if (5 in hexDecimal) {
    const sixthPayload = 6 in hexDecimal ? hexDecimal[6]['hex'] : '';
    data_message['sensor_payload'] = hexToDecimal(
      hexDecimal[5]['hex'] + '' + sixthPayload,
    );
    data_message['sensor_payload_hex'] =
      '0x' + hexDecimal[5]['hex'] + '' + sixthPayload;
  }
  return data_message;
}
