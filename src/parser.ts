import { DecodedPayload, HexDecimal } from './types';
import { identifyEventType } from './lib/IdentifyEventType';
import { hexToBinaryDecimal } from './lib/HexConvertor';
import {
  DOOR_WINDOW_SENSOR,
  RESET,
  SUPERVISORY,
  TEMPERATURE_EVENT,
} from './types/EventTypes';
import Temperature_Event from './decoders/Temperature_Event';
import { reset, supervisory } from './decoders/Common_Events';
import DoorWindow from './decoders/DoorWindow';

class RadioBridgeDecoder {
  private hexPayload: string;
  constructor(hexPayload: string) {
    this.hexPayload = hexPayload;
  }

  convert() {
    const hexDecimal = hexToBinaryDecimal(this.hexPayload);
    hexDecimal.splice(0, 1);

    if (!(0 in hexDecimal)) {
      return {};
    }

    const eventType = identifyEventType(hexDecimal[0]['decimal']);

    return this.mapConversion(eventType, hexDecimal);
  }

  mapConversion(eventType: string, hexDecimal: Array<HexDecimal>) {
    let data = {};
    switch (eventType) {
      case RESET:
        data = reset(hexDecimal);
        break;
      case SUPERVISORY:
        data[SUPERVISORY] = supervisory(hexDecimal);
        break;
      case DOOR_WINDOW_SENSOR:
        data[DOOR_WINDOW_SENSOR] = DoorWindow(hexDecimal);
        break;
      case TEMPERATURE_EVENT:
        data = Temperature_Event(hexDecimal);
        break;
    }

    return data;
  }
}

export function decode(hexPayload: string): DecodedPayload {
  return new RadioBridgeDecoder(hexPayload).convert();
}
