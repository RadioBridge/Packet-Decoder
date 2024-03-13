import { decode } from '../src/parser';
import { CONDENSED_FFT_ENERGY } from '../src/types/EventTypes';

describe('unit | CondensedFFt', () => {
  it.each([
    [
      'with part payload',
      '112000001e0022000c000e',
      '101c000100139f',
      '12201000130006001a0005',
      '1320200009000400010001',
      '1420300001000100000000',
      {
        condensedFft: [
          {
            axis: '01',
            condensedFft: {
              type: 'Total Energy Values',
              values: {
                '10-20Hz': '0.00205',
                '21-40Hz': '0.00233',
                '41-55Hz': '0.00082',
                '56-70Hz': '0.00096',
              },
            },
          },
          {
            axis: '01',
            condensedFft: {
              type: 'Total Energy Values',
              values: {
                '71-110Hz': '0.00130',
                '111-130Hz': '0.00041',
                '131-230Hz': '0.00178',
                '231Hz+': '0.00034',
              },
            },
          },
        ],
        condensedFftTotal: 146,
      },
    ],
  ])(
    'decodes an condensedfft %s (%s) event',
    (
      description,
      condensedFft: string,
      hbPayload: string,
      condensedFftPart: string,
      condensedFftEnergy: string,
      condensedFftEnergyPart: string,
      result,
    ) => {
      const decodedData = decode(
        condensedFft,
        hbPayload,
        condensedFftPart,
        condensedFftEnergy,
        condensedFftEnergyPart,
      );
      const expectedOutput = {};
      expectedOutput[CONDENSED_FFT_ENERGY] = result;
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
