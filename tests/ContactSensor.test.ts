import { decode } from '../src/parser';
import { CONTACT_SENSOR } from '../src/types/EventTypes';

describe('unit | ContactSensorEvent', () => {
  it.each([
    ['opened', '180701', 'Opened'],
    ['shorted', '170700', 'Shorted'],
  ])('decodes a contact %s event', (description, payload, expectedState) => {
    const decodedData = decode(payload);
    const expectedOutput = {};
    expectedOutput[CONTACT_SENSOR] = {
      event: expectedState,
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });
});
