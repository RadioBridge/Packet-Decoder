import { HexDecimal } from '../types';
import { signedHexToDecimal } from '../lib/HexConvertor';

export default function (hexDecimal: [HexDecimal]) {
  const dataMessage = { latitude: '', longitude: '' };

  if (1 in hexDecimal) {
    let statusMsg = {};
    const binary = hexDecimal[1]['binary'];
    statusMsg = 1 == binary[7] ? 'Valid GPS Fix' : 'No GPS Fix';
    if (1 == binary[6]) {
      statusMsg = 'Event: Movement Started';
    }
    if (1 == binary[5]) {
      statusMsg = 'Event: Movement Stopped';
    }
    if (1 == binary[4]) {
      statusMsg = 'Checksum failure';
    }

    dataMessage['event'] = statusMsg;
  }

  if (9 in hexDecimal) {
    const lat_hex =
      hexDecimal[2]['hex'] +
      '' +
      hexDecimal[3]['hex'] +
      '' +
      hexDecimal[4]['hex'] +
      '' +
      hexDecimal[5]['hex'];
    const long_hex =
      hexDecimal[6]['hex'] +
      '' +
      hexDecimal[7]['hex'] +
      '' +
      hexDecimal[8]['hex'] +
      '' +
      hexDecimal[9]['hex'];

    dataMessage['latitude'] = Number(
      signedHexToDecimal(lat_hex, 32) / 10000000,
    ).toFixed(10);
    dataMessage['longitude'] = Number(
      signedHexToDecimal(long_hex, 32) / 10000000,
    ).toFixed(11);
  }
  return dataMessage;
}
