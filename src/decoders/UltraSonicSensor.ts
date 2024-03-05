import { hexToDecimal, hexToDecimalMessageDecoder } from '../lib/HexConvertor';
import type { HexDecimal } from '../types';

// Assuming sensorState is a boolean variable
export default function (hexDecimal: [HexDecimal]) {
  const dataMessage: { [key: string]: string | object } = {};
  if (hexDecimal.length > 3) {
    const byteZeroHex = hexDecimal[1]['decimal'];
    const distanceUpperByteHex = hexDecimal[2]['hex'];
    const distanceLowerByteHex = hexDecimal[3]['hex'];

    const currentDistance = parseInt(
      hexToDecimal(distanceUpperByteHex + '' + distanceLowerByteHex),
    );

    const bitMsgs = [
      'Periodic Report',
      'Distance has risen above upper threshold',
      'Distance has fallen below lower threshold',
      'Report on change increase',
      'Report on change decrease',
    ];
    dataMessage['event'] = hexToDecimalMessageDecoder(byteZeroHex, bitMsgs);
    dataMessage['sensor_state'] = { value: currentDistance, unit: 'mm' };
  }
  return dataMessage;
}
