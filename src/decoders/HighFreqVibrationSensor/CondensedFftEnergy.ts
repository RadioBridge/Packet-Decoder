import { HexDecimal } from '../../types';
import { decode } from '../../parser';
import { HB_VIBRATION_SENSOR } from '../../types/EventTypes';
import { combineCfftValues } from './CondensedFftCommons';
import { hexToBinaryDecimal } from '../../lib/HexConvertor';

export default function (
  condensedFftEnergy: HexDecimal[],
  hexPayloads: string[],
) {
  const hbPayload = hexPayloads[1];
  const condensedFftEnergyPart = hexPayloads[2];
  const condensedFftEnergyPartHexDecimal = hexToBinaryDecimal(
    condensedFftEnergyPart,
  );
  condensedFftEnergyPartHexDecimal.splice(0, 1);

  let lowFreqPeakVelocity: number | undefined;

  if (hbPayload) {
    const hbPayloadDecoded = decode(hbPayload);
    lowFreqPeakVelocity =
      hbPayloadDecoded[HB_VIBRATION_SENSOR]['lowFreqPeakVelocity']['value'];
  }

  const finalValues = combineCfftValues(
    condensedFftEnergy,
    condensedFftEnergyPartHexDecimal,
  );

  let cfftTotal: number = 0;

  finalValues.forEach((finalValue) => {
    if (
      finalValue &&
      finalValue['condensedFft'] &&
      finalValue['condensedFft'].values
    ) {
      const allValues = Object.values(finalValue['condensedFft'].values);
      allValues.forEach((value) => {
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
          cfftTotal += numericValue;
        }
      });
    }
  });

  cfftTotal = 0 == cfftTotal ? 1 : cfftTotal;

  finalValues.forEach((additionalConversion, index) => {
    for (const [key, singleBandVal] of Object.entries(
      additionalConversion['condensedFft'].values,
    )) {
      const finalValue =
        lowFreqPeakVelocity !== undefined
          ? lowFreqPeakVelocity *
            ((typeof singleBandVal == 'string'
              ? parseInt(singleBandVal)
              : singleBandVal) /
              cfftTotal)
          : 0;

      finalValues[index]['condensedFft'].values[key] = finalValue.toFixed(5);
    }
  });

  return {
    condensedFftTotal: cfftTotal,
    condensedFft: finalValues,
  };
}
