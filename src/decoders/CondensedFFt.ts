import {
  binaryToDecimal,
  hexToBinaryDecimal,
  hexToDecimal,
} from '../lib/HexConvertor';
import type { HexDecimal } from '../types';

type CondensedFftType = {
  condensedFft: {
    data: string;
    axis: string;
    type: string;
    values: Record<string, number>;
  };
  condensedFftTotal: number;
};

export default function (
  hexDecimal: HexDecimal[],
  hexDataOne: string,
  hexDataTwo: string | null = null,
) {
  const dataMessage: CondensedFftType = {
    condensedFft: {
      data: '',
      axis: '',
      type: '',
      values: {},
    },
    condensedFftTotal: 0,
  };

  let lowFreqPeakVelocity: number | undefined;

  if (hexDecimal.length > 2) {
    const byteOnetwoHexData = hexDecimal[2].hex;
    const decimalVal = hexToDecimal(byteOnetwoHexData);
    const inchesPerSec = decimalVal > 0 ? decimalVal / 100 : 0;
    lowFreqPeakVelocity = inchesPerSec;
  }

  const finalValues = combineCfftValues(hexDataOne, hexDataTwo, hexDecimal);
  let cfftTotal: number = 0;

  finalValues.forEach((finalValue) => {
    if (
      finalValue &&
      finalValue.condensedFft &&
      finalValue.condensedFft.values
    ) {
      Object.values(finalValue).forEach((value) => {
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
          cfftTotal += numericValue;
        }
      });
    }
  });

  finalValues.forEach((additionalConversion) => {
    for (const [key, singleBandVal] of Object.entries(
      additionalConversion.condensedFft.values,
    )) {
      const finalValue =
        lowFreqPeakVelocity !== undefined
          ? lowFreqPeakVelocity * (parseInt(singleBandVal) / cfftTotal)
          : 0;
      additionalConversion.condensedFft.values[key] = finalValue.toFixed(5);
    }
  });
  dataMessage.condensedFft = finalValues;
  const roundedValue = Math.round(cfftTotal);
  const roundedCondensedFftTotal = parseInt(roundedValue.toFixed(0), 10);
  dataMessage.condensedFftTotal = Math.round(roundedCondensedFftTotal);

  return dataMessage;
}

function combineCfftValues(
  hexDataOne: string,
  hexDataTwo: string | null = null,
  hexDecimal: HexDecimal[],
) {
  const curEventConversion: CondensedFftType[] = [];

  const additionalConversions: CondensedFftType[] = [];

  curEventConversion.push(createConversion(hexDataOne, hexDecimal));

  if (hexDataTwo) {
    const hexDecimalNext = hexToBinaryDecimal(hexDataTwo);
    hexDecimalNext.shift();
    additionalConversions.push(createConversion(hexDataTwo, hexDecimalNext));
  }
  return [...curEventConversion, ...additionalConversions];
}

function createConversion(hexData: string, hexDecimal: HexDecimal[]) {
  const conversion: CondensedFftType = {
    data: hexData,
    axis: (
      parseInt(binaryToDecimal(hexDecimal[1].binary.slice(-4))) + 1
    ).toString(),
    condensedFft: condensedFFTConversion(hexDecimal),
  };
  return conversion;
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
