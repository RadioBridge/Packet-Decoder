import { decode } from '../src/parser';
import { CONDENSED_FFT } from '../src/types/EventTypes';

describe('unit | CondensedFFt', () => {
  it.each([
    [
      'without part payload',
      '1f20200010000d0009000b',
      null,
      {
        condensedFft: [
          {
            data: '1f20200010000d0009000b',
            axis: '1',
            condensedFft: {
              type: 'Peak Energy Values',
              values: {
                '10-20Hz': '0.00000',
                '21-40Hz': '0.00000',
                '41-55Hz': '0.00000',
                '56-70Hz': '0.00000',
              },
            },
          },
        ],
        condensedFftTotal: 1,
      },
    ],
    [
      'with part payload',
      '1f20200010000d0009000b',
      '1020300004000800040003',
      {
        condensedFft: [
          {
            data: '1f20200010000d0009000b',
            axis: '1',
            condensedFft: {
              type: 'Peak Energy Values',
              values: {
                '10-20Hz': '0.00000',
                '21-40Hz': '0.00000',
                '41-55Hz': '0.00000',
                '56-70Hz': '0.00000',
              },
            },
          },
          {
            data: '1020300004000800040003',
            axis: '1',
            condensedFft: {
              type: 'Peak Energy Values',
              values: {
                '71-110Hz': '0.00000',
                '111-130Hz': '0.00000',
                '131-230Hz': '0.00000',
                '231Hz+': '0.00000',
              },
            },
          },
        ],
        condensedFftTotal: 1,
      },
    ],
  ])(
    'decodes an condensedfft %s event',
    (description, payload, payloadTwo, result) => {
      const decodedData = decode(payload, payloadTwo);
      const expectedOutput = {};
      expectedOutput[CONDENSED_FFT] = result;
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
