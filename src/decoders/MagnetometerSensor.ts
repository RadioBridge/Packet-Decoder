// @ts-nocheck

import {
  hexToDecimalMessageDecoder,
  signedHexToDecimal,
} from '../lib/HexConvertor';
import type { HexDecimal } from '../types';

export default function (hexDecimal: HexDecimal[]) {
  const dataMessage: { [key: string]: string | number } = {};
  if (1 in hexDecimal) {
    const byteOneDecimal = hexDecimal[1]['decimal'];
    const bitsMsgs: string[] = [];
    bitsMsgs[0] = [];
    bitsMsgs[0][0] = 'Periodic Report';
    dataMessage['messageType'] = hexToDecimalMessageDecoder(
      byteOneDecimal,
      bitsMsgs,
    );
  }

  if (2 in hexDecimal && 3 in hexDecimal) {
    const xaxisHex = hexDecimal[2]['hex'] + hexDecimal[3]['hex'];
    dataMessage['xaxis'] = signedHexToDecimal(xaxisHex, 16);
  }

  if (4 in hexDecimal && 5 in hexDecimal) {
    const yaxisHex = hexDecimal[4]['hex'] + hexDecimal[5]['hex'];
    dataMessage['yaxis'] = signedHexToDecimal(yaxisHex, 16);
  }

  if (6 in hexDecimal && 7 in hexDecimal) {
    const zaxisHex = hexDecimal[6].hex + hexDecimal[7].hex;
    dataMessage['zaxis'] = signedHexToDecimal(zaxisHex, 16);
  }

  if (8 in hexDecimal) {
    const tempHex = hexDecimal[8].hex;
    dataMessage['temperature'] = signedHexToDecimal(tempHex);
  }
  return dataMessage;
}
