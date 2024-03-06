import {
  binaryToDecimal,
  hexToBinaryDecimal,
  hexToDecimal,
} from '../lib/HexConvertor';
import type { HexDecimal } from '../types';

type CondensedFftType = {
  data: string;
  axis: string;
  condensedFft: object;
  condensedFftTotal: number;
};
export default function (
  hexDecimal: [HexDecimal],
  hexDataOne: string,
  hexDataTwo: string | null = null,
) {
  const dataMessage: CondensedFftType = {
    data: '',
    axis: '',
    condensedFft: {},
    condensedFftTotal: 0,
  };
  let lowFreqPeakVelocity: string;
  if (2 in hexDecimal) {
    const byteOnetwoHexData = hexDecimal[2]['hex'];
    const decimalVal = hexToDecimal(byteOnetwoHexData);
    const inchesPerSec = decimalVal > 0 ? decimalVal / 100 : 0;
    lowFreqPeakVelocity = inchesPerSec.toFixed(5);
  }
  const finalValues = combineCfftValues(hexDataOne, hexDataTwo, hexDecimal);

  let cfftTotal: number = 0;
 console.log(finalValues);
  finalValues.forEach((finalValue: { condensedFft: { values: number[] } }) => {
    cfftTotal += finalValue.condensedFft.values.reduce(
      (sum, value) => sum + value,
      0,
    );
  });
  finalValues.forEach(function (additionalConversion, mainKey) {
    for (const [key, singleBandVal] of Object.entries(
      additionalConversion.condensedFft.values,
    )) {
      finalValue =
        parseInt(lowFreqPeakVelocity) * (parseInt(singleBandVal) / cfftTotal);
      finalValues.condensedFft.values[key] = finalValue.toFixed(5);
    }
  });
  dataMessage['condensedFftTotal'] = cfftTotal;
  dataMessage['condensedFft'] = finalValues;
  console.log({dataMessage});
  return dataMessage;
}
function combineCfftValues(
  hexDataOne: string,
  hexDataTwo: string | null = null,
  hexDecimal: [HexDecimal],
) {
  const curEventConversion: Record<string, string | number | []> = {};

  const additionalConversions: Record<string, string | number | []> = {};
  curEventConversion['data'] = hexDataOne;
  curEventConversion['axis'] =
    parseInt(binaryToDecimal(hexDecimal[1]['binary'].substring(-4))) + 1;
  curEventConversion['condensedFft'] = condensedFFTConversion(hexDecimal);
  if (hexDataTwo) {
    const hexDecimalNext = hexToBinaryDecimal(hexDataTwo);
    hexDecimalNext.shift();
    additionalConversions['data'] = hexDataTwo;
    additionalConversions['axis'] =
      binaryToDecimal(hexDecimalNext[1]['binary'].substring(-4)) + 1;
    additionalConversions['condensedFft'] =
      condensedFFTConversion(hexDecimalNext);
  }
  Object.assign(curEventConversion, additionalConversions);
  return curEventConversion;
}

function condensedFFTConversion(hexDecimal: [HexDecimal]) {
  const payloadDefByte = binaryToDecimal(
    hexDecimal[1]['binary'].substring(0, 4),
  );
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
  let payloadDef = '';
  let freqRange = '';
  switch (parseInt(payloadDefByte)) {
    case 0:
      payloadDef = 'Total Energy Values';
      freqRange = '0-3';
      break;
    case 1:
      payloadDef = 'Total Energy Values';
      freqRange = '4-7';
      break;
    case 2:
      payloadDef = 'Peak Energy Values';
      freqRange = '0-3';
      break;
    case 3:
      payloadDef = 'Peak Energy Values';
      freqRange = '4-7';
      break;
    default:
      payloadDef = '';
      freqRange = '';
  }
  let values2 = {};
  if ('0-3' == freqRange) {
    values2 = {
      '10-20Hz': byteOneTwo,
      '21-40Hz': byteThreeFour,
      '41-55Hz': byteFiveSix,
      '56-70Hz': byteSevenEight,
    };
  } else {
    values2 = {
      '71-110Hz': byteOneTwo,
      '111-130Hz': byteThreeFour,
      '131-230Hz': byteFiveSix,
      '231Hz+': byteSevenEight,
    };
  }

  const resultArray = {
    type: payloadDef,
    values: values2,
  };
  return resultArray;
}
