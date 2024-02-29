import {
  ACCELERATION_MOVEMENT_SENSOR,
  AIR_TEMP_HUMIDITY_SENSOR,
  AMBIENT_LIGHT_SENSOR,
  COMPASS_SENSOR,
  CONTACT_SENSOR,
  CURRENT_SENSOR_STATE,
  DEVICE_INFO,
  DOOR_WINDOW_SENSOR,
  DOWNLINK,
  EVENT_UNKNOWN,
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
  TEST_MODE_EXIT,
  TILT_EVENT,
  ULTRASONIC_LEVEL_SENSOR,
  VOLTAGE_SENSOR,
  WATER_SENSOR,
  WEATHER_STATION,
  WIRELESS_420MA_CURRENT_LOOP_SENSOR,
} from '../types/EventTypes';

export function identifyEventType(firstByteInDecimal: number) {
  let command = 'UNKNOWN';

  switch (firstByteInDecimal) {
    case 0:
      command = RESET;
      break;
    case 1:
      command = SUPERVISORY;
      break;
    case 2:
      command = TAMPER;
      break;
    case 3:
      command = DOOR_WINDOW_SENSOR;
      break;
    //case 4:
    //    command = 'ACCELEROMETER'; break;
    case 5:
      command = GLASS_BREAK_EVENT;
      break;
    case 6:
      command = PUSH_BUTTON;
      break;
    case 7:
      command = CONTACT_SENSOR;
      break;
    case 8:
      command = WATER_SENSOR;
      break;
    case 9:
      command = TEMPERATURE_EVENT;
      break;
    case 10:
      command = TILT_EVENT;
      break;
    case 11:
      command = AMBIENT_LIGHT_SENSOR;
      break;
    case 12:
      command = TANK_LEVEL_SENSOR;
      break;
    case 13:
      command = AIR_TEMP_HUMIDITY_SENSOR;
      break;
    case 14:
      command = ACCELERATION_MOVEMENT_SENSOR;
      break;
    case 15:
      command = HIGH_PRECISION_TILT_SENSOR;
      break;
    case 16:
      command = ULTRASONIC_LEVEL_SENSOR;
      break;
    case 17:
      command = WIRELESS_420MA_CURRENT_LOOP_SENSOR;
      break;
    case 20:
      command = VOLTAGE_SENSOR;
      break;
    case 22:
      command = GPS_SENSOR;
      break;
    case 23:
      command = HONEYWELL_5800;
      break;
    case 24:
      command = MAGNETOMETER_SENSOR;
      break;
    case 25:
      command = INTERNAL_TEMPERATURE;
      break;
    case 26:
      command = COMPASS_SENSOR;
      break;
    case 28:
    case 29:
    case 30:
    case 31:
      command = HB_VIBRATION_SENSOR;
      break;
    case 27:
      command = WEATHER_STATION;
      break;
    case 250:
      command = DEVICE_INFO;
      break;
    case 251:
      command = LINK_QUALITY;
      break;
    case 252:
      command = RATE_LIMIT_EXCEEDED;
      break;
    case 253:
      command = CURRENT_SENSOR_STATE;
      break;
    case 254:
      command = TEST_MODE_EXIT;
      break;
    case 255:
      command = DOWNLINK;
      break;
    default:
      command = EVENT_UNKNOWN;
  }

  return command;
}
