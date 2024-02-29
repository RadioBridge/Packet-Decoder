import { decode } from '../src/parser';
import { PUSH_BUTTON } from '../src/types/EventTypes';

describe('unit | SinglePushButton', () => {
  it.each([
    ['released', '14060301', 'Button Released'],
    ['held', '13060302', 'Button Held'],
    ['pressed', '13060300', 'Button Pressed'],
  ])(
    'decodes a single push button %s event',
    (description, payload: string, expectedState) => {
      const decodedData = decode(payload);
      const expectedOutput = {};
      expectedOutput[PUSH_BUTTON] = {
        event: expectedState,
      };
      expect(decodedData).toMatchObject(expectedOutput);
    },
  );
});
