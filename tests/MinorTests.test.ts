import { decode } from '../src/parser';
import { GLASS_BREAK_EVENT } from '../src/types/EventTypes';

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
