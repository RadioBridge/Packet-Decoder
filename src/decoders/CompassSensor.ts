import { HexDecimal } from '../types';
import { hexToDecimal, hexToDecimalMessageDecoder } from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  const dataMessage = {};
  if (hexDecimal.length >= 1) {
    const byteZeroHex = hexDecimal[1];
    const bitMsgs = [
      'Periodic report',
      'Angle rose above upper threshold',
      'Angle fell below lower threshold',
      'Angle report-on-change angle increase',
      'Angle report-on-change angle decrease',
    ];
    dataMessage['event'] = hexToDecimalMessageDecoder(
      byteZeroHex['decimal'],
      bitMsgs,
    );
  }

  if (2 in hexDecimal && 3 in hexDecimal) {
    const byteHex = hexDecimal[2]['hex'] + hexDecimal[3]['hex'];
    dataMessage['angle'] = hexToDecimal(byteHex);
  }

  if (4 in hexDecimal) {
    dataMessage['temperature'] = hexDecimal[4]['decimal'];
  }

  return dataMessage;
}
