import { binaryToDecimal, hexToBinaryDecimal } from '../../lib/HexConvertor';
import type { HexDecimal } from '../../types';
import { decode } from '../../parser';
import {
  CONDENSED_FFT_ENERGY,
  HB_VIBRATION_SENSOR,
} from '../../types/EventTypes';
import { combineCfftValues } from './CondensedFftCommons';
import CondensedFftEnergy from './CondensedFftEnergy';

type CondensedFftType = {
  condensedFft: {
    data: string;
    axis: string;
    type: string;
    values: Record<string, number>;
  };
  condensedFftTotal: number;
};

export default function (condensedFft: HexDecimal[], hexPayloads: string[]) {
  const hbPayload = hexPayloads[1];
  const condensedFftPart = hexPayloads[2];
  const condensedFftEnergy = hexPayloads[3];
  const condensedFftEnergyPart = hexPayloads[4];

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

  if (hbPayload) {
    const hbPayloadDecoded = decode(hbPayload);
    lowFreqPeakVelocity =
      hbPayloadDecoded[HB_VIBRATION_SENSOR]['lowFreqPeakVelocity']['value'];
  }
  let condensedFftPartHexDecimal = null;
  if (condensedFftPart) {
    condensedFftPartHexDecimal = hexToBinaryDecimal(condensedFftPart);
    condensedFftPartHexDecimal.splice(0, 1);
  }
  const finalValues = combineCfftValues(
    condensedFft,
    condensedFftPartHexDecimal,
  );
  let cfftTotal: number = 0;

  const condensedFftEnergyDecoded = decode(
    condensedFftEnergy,
    hbPayload,
    condensedFftEnergyPart,
  );

  cfftTotal =
    condensedFftEnergyDecoded[CONDENSED_FFT_ENERGY]['condensedFftTotal'];
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
