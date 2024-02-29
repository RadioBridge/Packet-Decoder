import { decode } from '../src/parser';
import { GLASS_BREAK_EVENT } from '../src/types/EventTypes';
import { baseConvert } from '../src/lib/HexConvertor';

describe('unit | GlassBreak', () => {
  it('decodes a glass break event', () => {
    const payload = '980571653056983d1512cc';
    const decodedData = decode(payload);
    const expectedOutput = {};
    expectedOutput[GLASS_BREAK_EVENT] = {
      event: 'Glass Break',
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });
});

describe('unit | convertorTest', () => {
  it.each([
    ['0C', '12', '1100'],
    ['0A', '10', '1010'],
    ['AA', '170', '10101010'],
  ])('convert hex %s to decimal %s and binary %s', (hex, decimal, binary) => {
    const decimalConversion = baseConvert(hex, 16, 10);
    const binaryConversion = baseConvert(hex, 16, 2);
    expect(decimalConversion).toEqual(decimal);
    expect(binaryConversion).toEqual(binary);
  });
});
