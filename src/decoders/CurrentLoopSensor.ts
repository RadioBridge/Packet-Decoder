// @ts-nocheck

import { hexToDecimal, hexToDecimalMessageDecoder } from '../lib/HexConvertor';
import type { HexDecimal } from '../types';

export default function (hexDecimal: HexDecimal[]) {
  const dataMessage: { [key: string]: string | object } = {};
  if (hexDecimal.length > 3) {
    const byteZeroHex = hexDecimal[1].decimal;
    const distanceUpperByteHex = hexDecimal[2].hex;
    const distanceLowerByteHex = hexDecimal[3].hex;

    let currentMeasurement = hexToDecimal(
      distanceUpperByteHex + '' + distanceLowerByteHex,
    );

    currentMeasurement = currentMeasurement / 100;
    const bitMsgs = [
      'Periodic Report',
      'Analog measurement has risen above upper threshold',
      'Analog measurement has fallen below lower threshold',
      'Report on change increase',
      'Report on change decrease',
    ];
    dataMessage['event'] = hexToDecimalMessageDecoder(byteZeroHex, bitMsgs);
    dataMessage['sensor_state'] = { value: currentMeasurement, unit: 'mA' };
  }
  return dataMessage;
}
