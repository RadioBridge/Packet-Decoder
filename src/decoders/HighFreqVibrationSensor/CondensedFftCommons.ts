// @ts-nocheck

import { HexDecimal } from '../../types';
import { binaryToDecimal } from '../../lib/HexConvertor';

export function combineCfftValues(
  hexDataOne: HexDecimal[],
  hexDataTwo: HexDecimal[] | null = null,
) {
  const curEventConversion = {};
  curEventConversion['data'] = hexDataOne[1]['hex'];
  curEventConversion['axis'] =
    binaryToDecimal(hexDataOne[1]['binary'].slice(-4)) + 1;
  curEventConversion['condensedFft'] = condensedFFTConversion(hexDataOne);

  const additionalConversion = {};
  if (hexDataTwo) {
    additionalConversion['data'] = hexDataTwo[1]['hex'];
    additionalConversion['axis'] =
      binaryToDecimal(hexDataTwo[1]['binary'].slice(-4)) + 1;
    additionalConversion['condensedFft'] = condensedFFTConversion(hexDataTwo);
  }

  return [curEventConversion, additionalConversion];
}

function condensedFFTConversion(hexDecimal: HexDecimal[]) {
  const payloadDefByte = binaryToDecimal(hexDecimal[1].binary.substring(0, 4));
  const byteOneTwo = binaryToDecimal(
    hexDecimal[2]['binary'] + hexDecimal[3]['binary'],
  );
  const byteThreeFour = binaryToDecimal(
    hexDecimal[4]['binary'] + hexDecimal[5]['binary'],
  );
  const byteFiveSix = binaryToDecimal(
    hexDecimal[6]['binary'] + hexDecimal[7]['binary'],
  );
  const byteSevenEight = binaryToDecimal(
    hexDecimal[8]['binary'] + hexDecimal[9]['binary'],
  );
  const payloadDefMap: Record<string, { type: string; freqRange: string }> = {
    '0': { type: 'Total Energy Values', freqRange: '0-3' },
    '1': { type: 'Total Energy Values', freqRange: '4-7' },
    '2': { type: 'Peak Energy Values', freqRange: '0-3' },
    '3': { type: 'Peak Energy Values', freqRange: '4-7' },
  };

  const { type, freqRange } = payloadDefMap[payloadDefByte] || {
    type: '',
    freqRange: '',
  };

  const values: { [key: string]: string } = {};

  if (freqRange === '0-3') {
    values['10-20Hz'] = byteOneTwo;
    values['21-40Hz'] = byteThreeFour;
    values['41-55Hz'] = byteFiveSix;
    values['56-70Hz'] = byteSevenEight;
  } else {
    values['71-110Hz'] = byteOneTwo;
    values['111-130Hz'] = byteThreeFour;
    values['131-230Hz'] = byteFiveSix;
    values['231Hz+'] = byteSevenEight;
  }
  return { type, values };
}
