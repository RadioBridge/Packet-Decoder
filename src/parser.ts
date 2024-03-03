import { DecodedPayload, HexDecimal } from './types';
import { identifyEventType } from './lib/IdentifyEventType';
import { hexToBinaryDecimal } from './lib/HexConvertor';
import {
  AMBIENT_LIGHT_SENSOR,
  COMPASS_SENSOR,
  CONTACT_SENSOR,
  DOOR_WINDOW_SENSOR,
  GLASS_BREAK_EVENT,
  PUSH_BUTTON,
  RESET,
  SUPERVISORY,
  TAMPER,
  TANK_LEVEL_SENSOR,
  TEMPERATURE_EVENT,
  WATER_SENSOR,
} from './types/EventTypes';
import Temperature_Event from './decoders/Temperature_Event';
import { reset, supervisory, tamperDetect } from './decoders/Common_Events';
import DoorWindow from './decoders/DoorWindow';
import GlassBreak from './decoders/GlassBreak';
import ContactSensor from './decoders/ContactSensor';
import SinglePushButton from './decoders/SinglePushButton';
import TankLevelSensor from './decoders/TankLevelSensor';
import AmbientLightSensor from './decoders/AmbientLightSensor';
import WaterSensor from './decoders/WaterSensor';
import CompassSensor from './decoders/CompassSensor';

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
    const data = {};
    switch (eventType) {
      case RESET:
        data[RESET] = reset(hexDecimal);
        break;
      case TAMPER:
        data[TAMPER] = tamperDetect(hexDecimal);
        break;
      case SUPERVISORY:
        data[SUPERVISORY] = supervisory(hexDecimal);
        break;
      case DOOR_WINDOW_SENSOR:
        data[DOOR_WINDOW_SENSOR] = DoorWindow(hexDecimal);
        break;
      case GLASS_BREAK_EVENT:
        data[GLASS_BREAK_EVENT] = GlassBreak();
        break;
      case CONTACT_SENSOR:
        data[CONTACT_SENSOR] = ContactSensor(hexDecimal);
        break;
      case TEMPERATURE_EVENT:
        data[TEMPERATURE_EVENT] = Temperature_Event(hexDecimal);
        break;
      case PUSH_BUTTON:
        data[PUSH_BUTTON] = SinglePushButton(hexDecimal);
        break;
      case TANK_LEVEL_SENSOR:
        data[TANK_LEVEL_SENSOR] = TankLevelSensor(hexDecimal);
        break;
      case AMBIENT_LIGHT_SENSOR:
        data[AMBIENT_LIGHT_SENSOR] = AmbientLightSensor(hexDecimal);
        break;
      case WATER_SENSOR:
        data[WATER_SENSOR] = WaterSensor(hexDecimal);
        break;
      case COMPASS_SENSOR:
        data[COMPASS_SENSOR] = CompassSensor(hexDecimal);
        break;
    }

    return data;
  }
}

export function decode(hexPayload: string): DecodedPayload {
  return new RadioBridgeDecoder(hexPayload).convert();
}
