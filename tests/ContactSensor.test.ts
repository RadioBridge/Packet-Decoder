import { decode } from '../src/parser';
import { CONTACT_SENSOR } from '../src/types/EventTypes';

describe('unit | ContactSensorEvent', () => {
  it('decodes a contact shorted event', () => {
    const payload = '180701';
    const decodedData = decode(payload);
    const expectedOutput = {};
    expectedOutput[CONTACT_SENSOR] = {
      event: 'Opened',
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });
  it('decodes a contact opened event', () => {
    const payload = '170700';
    const decodedData = decode(payload);
    const expectedOutput = {};
    expectedOutput[CONTACT_SENSOR] = {
      event: 'Shorted',
    };
    expect(decodedData).toMatchObject(expectedOutput);
  });
});
