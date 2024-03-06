import { DecodedPayload, HexDecimal } from './types';
import { identifyEventType } from './lib/IdentifyEventType';
import { binaryToDecimal, hexToBinaryDecimal } from './lib/HexConvertor';
import {
  ACCELERATION_MOVEMENT_SENSOR,
  AIR_TEMP_HUMIDITY_SENSOR,
  AMBIENT_LIGHT_SENSOR,
  COMPASS_SENSOR,
  CONTACT_SENSOR,
  DEVICE_INFO,
  DOOR_WINDOW_SENSOR,
  DOWNLINK,
  GLASS_BREAK_EVENT,
  GPS_SENSOR,
  HB_VIBRATION_SENSOR,
  HIGH_PRECISION_TILT_SENSOR,
  HONEYWELL_5800,
  INTERNAL_TEMPERATURE,
  LINK_QUALITY,
  MAGNETOMETER_SENSOR,
  PUSH_BUTTON,
  RATE_LIMIT_EXCEEDED,
  RESET,
  SUPERVISORY,
  TAMPER,
  TANK_LEVEL_SENSOR,
  TEMPERATURE_EVENT,
  TEST_MESSAGE,
  TEST_MODE_EXIT,
  THERMOCOUPLE_TEMP,
  TILT_EVENT,
  ULTRASONIC_LEVEL_SENSOR,
  VOLTAGE_SENSOR,
  WATER_SENSOR,
  WEATHER_STATION,
  WIRELESS_420MA_CURRENT_LOOP_SENSOR,
} from './types/EventTypes';
import Temperature_Event from './decoders/Temperature_Event';
import {
  deviceInfo,
  downlink,
  linkQuality,
  manufacturingTestMessage,
  rateLimitExceeded,
  reset,
  supervisory,
  tamperDetect,
  testEvent,
} from './decoders/Common_Events';
import DoorWindow from './decoders/DoorWindow';
import GlassBreak from './decoders/GlassBreak';
import ContactSensor from './decoders/ContactSensor';
import SinglePushButton from './decoders/SinglePushButton';
import TankLevelSensor from './decoders/TankLevelSensor';
import AmbientLightSensor from './decoders/AmbientLightSensor';
import WaterSensor from './decoders/WaterSensor';
import CompassSensor from './decoders/CompassSensor';
import GpsDevice from './decoders/GpsDevice';
import AccelerationMovementSensor from './decoders/AccelerationMovementSensor';
import TiltSensor from './decoders/TiltSensor';
import VoltageSensor from './decoders/VoltageSensor';
import AirTemperatureAndHumiditySensor from './decoders/AirTemperatureAndHumiditySensor';
import HoneywellFiveEightZeroZero from './decoders/HoneywellFiveEightZeroZero';
import HighPrecisionTiltSensor from './decoders/HighPrecisionTiltSensor';
import UltraSonicSensor from './decoders/UltraSonicSensor';
import HBVibrationSensor from './decoders/HBVibrationSensor';
import CurrentLoopSensor from './decoders/CurrentLoopSensor';
import ThermocoupleTemperatureSensor from './decoders/ThermocoupleTemperatureSensor';
import WeatherStationSensor from './decoders/WeatherStationSensor';
import MagnetometerSensor from './decoders/MagnetometerSensor';

class RadioBridgeDecoder {
  private hexPayload: string;
  constructor(hexPayload: string) {
    this.hexPayload = hexPayload;
  }

  convert() {
    const hexDecimal = hexToBinaryDecimal(this.hexPayload);
    const packetCounter = hexDecimal[0]['decimal'];
    const protocolVersion = hexDecimal[0]['binary'].slice(0, 4);

    hexDecimal.splice(0, 1);

    if (!(0 in hexDecimal)) {
      return {};
    }

    const eventType = identifyEventType(hexDecimal[0]['decimal']);
    const eventDecoded = this.mapConversion(eventType, hexDecimal);
    return {
      protocol: binaryToDecimal(protocolVersion),
      counter: packetCounter,
      type: eventType,
      ...eventDecoded,
    };
  }

  mapConversion(eventType: string, hexDecimal: Array<HexDecimal>) {
    const data = {};
    switch (eventType) {
      case RESET:
        data[RESET] = reset(hexDecimal);
        break;
      case DOWNLINK:
        data[DOWNLINK] = downlink(hexDecimal);
        break;
      case TAMPER:
        data[TAMPER] = tamperDetect(hexDecimal);
        break;
      case SUPERVISORY:
        data[SUPERVISORY] = supervisory(hexDecimal);
        break;
      case TEST_MESSAGE:
        data[TEST_MESSAGE] = testEvent();
        break;
      case LINK_QUALITY:
        data[LINK_QUALITY] = linkQuality(hexDecimal);
        break;
      case RATE_LIMIT_EXCEEDED:
        data[RATE_LIMIT_EXCEEDED] = rateLimitExceeded();
        break;
      case TEST_MODE_EXIT:
        data[TEST_MODE_EXIT] = manufacturingTestMessage();
        break;
      case DEVICE_INFO:
        data[DEVICE_INFO] = deviceInfo(hexDecimal);
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
      case GPS_SENSOR:
        data[GPS_SENSOR] = GpsDevice(hexDecimal);
        break;
      case ACCELERATION_MOVEMENT_SENSOR:
        data[ACCELERATION_MOVEMENT_SENSOR] =
          AccelerationMovementSensor(hexDecimal);
        break;
      case TILT_EVENT:
        data[TILT_EVENT] = TiltSensor(hexDecimal);
        break;
      case VOLTAGE_SENSOR:
        data[VOLTAGE_SENSOR] = VoltageSensor(hexDecimal);
        break;
      case HONEYWELL_5800:
        data[HONEYWELL_5800] = HoneywellFiveEightZeroZero(hexDecimal);
        break;
      case HIGH_PRECISION_TILT_SENSOR:
        data[HIGH_PRECISION_TILT_SENSOR] = HighPrecisionTiltSensor(hexDecimal);
        break;
      case ULTRASONIC_LEVEL_SENSOR:
        data[ULTRASONIC_LEVEL_SENSOR] = UltraSonicSensor(hexDecimal);
        break;
      case WIRELESS_420MA_CURRENT_LOOP_SENSOR:
        data[WIRELESS_420MA_CURRENT_LOOP_SENSOR] =
          CurrentLoopSensor(hexDecimal);
        break;
      case THERMOCOUPLE_TEMP:
        data[THERMOCOUPLE_TEMP] = ThermocoupleTemperatureSensor(hexDecimal);
        break;
      case WEATHER_STATION:
        data[WEATHER_STATION] = WeatherStationSensor(hexDecimal);
        break;
      case MAGNETOMETER_SENSOR:
        data[MAGNETOMETER_SENSOR] = MagnetometerSensor(hexDecimal);
        break;
      case HB_VIBRATION_SENSOR:
        data[HB_VIBRATION_SENSOR] = HBVibrationSensor(hexDecimal);
        break;
      case AIR_TEMP_HUMIDITY_SENSOR:
        data[AIR_TEMP_HUMIDITY_SENSOR] =
          AirTemperatureAndHumiditySensor(hexDecimal);
        break;
      case INTERNAL_TEMPERATURE:
        data[INTERNAL_TEMPERATURE] =
          AirTemperatureAndHumiditySensor(hexDecimal);
        break;
    }

    return data;
  }
}

export function decode(hexPayload: string): DecodedPayload {
  return new RadioBridgeDecoder(hexPayload).convert();
}
