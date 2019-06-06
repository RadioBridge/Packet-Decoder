function Decoder(bytes, port) {
  // RADIOBRIDGE THE THINGS NETWORK PACKET DECODER
  // (c) 2019 RadioBridge USA by John Sheldon

  // TODO: Need good bytes to HEX function
  //       Change var names to match non-simplemode names
  //       Faults and Error codes
  //       Downlink descriptions

  // Use SIMPLEMODE to show basic sensor messages only
  // Disable SIMPLEMODE to output raw bytes of packet
  // Set to 1 to turn SIMPLEMODE on, set to 0 for off
  SIMPLEMODE = 1;

  var decoded = {};
  if (!SIMPLEMODE) {
    decoded.PORT = port;
    decoded.SEQUENCE = (bytes[0] - 16).toString(16);
    decoded.EVENT_TYPE = bytes[1].toString(16);
  }
  EventType = bytes[1].toString(16);
 
  switch(EventType) {

  // ==================    RESET EVENT    ====================
    case "0":
      if (SIMPLEMODE) {
        switch(bytes[2]) {
          case 1:DeviceType = "Door/Window";break;
          case 2:DeviceType = "Door/Window High Security";break;
          case 3:DeviceType = "Contact";break;
          case 4:DeviceType = "Temperature No-Probe";break;
          case 5:DeviceType = "Temperature External Probe";break;
          case 6:DeviceType = "Single Push Button";break;
          case 7:DeviceType = "Dual Push Button";break;
          case 8:DeviceType = "Acceleration-Based Movement";break;
          case 9:DeviceType = "Tilt";break;
          case 10:DeviceType = "Water";break;
          case 11:DeviceType = "Tank Level Float";break;
          case 12:DeviceType = "Glass Break";break;
          case 13:DeviceType = "Ambient Light";break;
          case 14:DeviceType = "Air Temperature and Humidity";break;
          case 15:DeviceType = "High-Precision Tilt";break;
          case 16:DeviceType = "Ultrasonic Level";break;
          case 17:DeviceType = "4-20mA Loop";break;
          case 18:DeviceType = "Ext-Probe Air Temp and Humidity";break;
          Default:DeviceType = "Device Undefined";
        }
        HardwareVersion = ((bytes[3].toString(16)) / 10).toFixed(1);
        FirmwareVerison = (bytes[4] + (bytes[5] / 10)).toFixed(1);
        decoded.Message = "Reset: " + DeviceType + ", HW: v" + HardwareVersion + ", FW: v" + FirmwareVerison;
        break;
      }
      else {
        decoded.DEVICE_TYPE = bytes[2].toString(16);
        decoded.HW_VER = bytes[3].toString(16);
        decoded.FW_VER = bytes[4].toString(16) + bytes[5].toString(16);
        decoded.ERROR_CODES = bytes[6].toString(16) + bytes[7].toString(16);
      }
      break;

  // ================   SUPERVISORY EVENT   ==================
  // Need to add error codes
  // Sensor state relies on knowing the type of sensor...
  case "1":
    if (SIMPLEMODE) {
      BatteryLevel = ((bytes[4].toString(16)) / 10).toFixed(1);
      decoded.Message = "Supervisory: Battery Voltage " + BatteryLevel + "V";
      break;
    }
    else {
      decoded.ERROR_CODES = bytes[2].toString(16);
      decoded.SENSOR_STATE = bytes[3].toString(16);
      decoded.BATTERY_LEVEL = bytes[4].toString(16);
    }
    break;

  // ==================   TAMPER EVENT    ====================
  case "2":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Tamper Open";break;
        case 1:EventPayload = "Tamper Closed";
      }
      decoded.Message = EventPayload;
      break;
    }
    else {
      decoded.TAMPER_STATE = bytes[2];
    }
    break;

  // ================  DOOR/WINDOW EVENT  ====================
  case "3":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Door Closed";break;
        case 1:EventPayload = "Door Opened";
        }
      decoded.Message = EventPayload;
      break;
    }
    else {
      decoded.SENSOR_STATE = bytes[2];
    }
    break;

  // ===============  PUSH BUTTON EVENT   ===================
  case "6":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 1:ButtonID = "Button 1";break;
        case 2:ButtonID = "Button 2";break;
        case 3:ButtonID = "Button";break;
        case 18:ButtonID = "Both Buttons";        
        }
      switch(bytes[3]) {
        case 0:EventPayload = "Pressed";break;
        case 1:EventPayload = "Released";break;
        case 2:EventPayload = "Held";
        }
      decoded.Message = ButtonID + " " + EventPayload;
      break;
    }
    else {
      decoded.BUTTON_ID = bytes[2].toString(16);
      decoded.SENSOR_STATE = bytes[3];
    }
    break;

  // =================   CONTACT EVENT   =====================
  case "7":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Contacts Shorted";break;
        case 1:EventPayload = "Contacts Opened";
        }
      decoded.Message = EventPayload;
      break;
    }
    else {
      decoded.SENSOR_STATE = bytes[2];
    }
    break;

  // ===================  WATER EVENT  =======================
  case "8":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Water or Liquid Present";break;
        case 1:EventPayload = "Water or Liquid Absent";break;
        }
      Conductance = bytes[3];
      decoded.Message = EventPayload + ": Relative Value " + Conductance;
      break;
    }
    else {
      decoded.SENSOR_STATE = bytes[2].toString(16) + bytes[3].toString(16);
    }
    break;

  // ================== TEMPERATURE EVENT ====================
  case "9":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Periodic Report";break;
        case 1:EventPayload = "Temperature has Risen Above Upper Threshold";break;
        case 2:EventPayload = "Temperature has Fallen Below Lower Threshold";break;
        case 3:EventPayload = "Report on Change Increase";break;
        case 4:EventPayload = "Report on Change Decrease";
      }
      if (bytes[3] > 127) {Temperature = bytes[3] - 256}else{Temperature = bytes[3]}
      decoded.Message = EventPayload + ": " + Temperature + "°C";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.SENSOR_STATE = bytes[3].toString(16) + bytes[4].toString(16);
    }
    break;

  // ====================  TILT EVENT  =======================
  case "a":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Transitioned to Vertical";break;
        case 1:EventPayload = "Transitioned to Horizontal";break;
        case 2:EventPayload = "Report on Change Toward Vertical";break;
        case 3:EventPayload = "Report on Change Toward Horizontal";
        }
      Angle = bytes[3]
      decoded.Message = EventPayload + ": " + Angle + "° from Vertical Axis";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.SENSOR_STATE = bytes[3];
    }
    break;

  // =============  AIR TEMP & HUMIDITY EVENT  ===============
  case "d":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Periodic Report";break;
        case 1:EventPayload = "Temperature has Risen Above Upper Threshold";break;
        case 2:EventPayload = "Temperature has Fallen Below Lower Threshold";break;
        case 3:EventPayload = "Temperature Report on Change Increase";break;
        case 4:EventPayload = "Temperature Report on Change Decrease";
        case 5:EventPayload = "Humidity has Risen Above Upper Threshold";break;
        case 6:EventPayload = "Humidity has Fallen Below Lower Threshold";break;
        case 7:EventPayload = "Humidity Report on Change Increase";break;
        case 8:EventPayload = "Humidity Report on Change Decrease";
        }
      if (bytes[3] > 127) {
        Temperature = -((bytes[3] - 128) + (bytes[4] / 160)).toFixed(1);
      } 
      else {
        Temperature = (bytes[3] + (bytes[4] / 160)).toFixed(1);
      }
      Humidity = (bytes[5] + (bytes[6] / 160)).toFixed(1)
      decoded.Message = EventPayload + ": Temp: " + Temperature + "°C / Humd: " + Humidity + "%";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.SENSOR_STATE = bytes[3].toString(16) + bytes[4].toString(16) + bytes[5].toString(16) + bytes[6].toString(16);
    }
    break;

  // ============  ACCELERATION MOVEMENT EVENT  ==============
  case "e":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Acceleration Started";break;
        case 1:EventPayload = "Acceleration Stopped";
        }
      decoded.Message = EventPayload;
      break;
    }
    else {
      decoded.SENSOR_STATE = bytes[2];
    }
    break;

  // =============  HIGH-PRECISION TILT EVENT  ===============
  case "f":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Periodic Report";break;
        case 1:EventPayload = "Transitioned toward Vertical";break;
        case 2:EventPayload = "Transitioned away from Vertical";break;
        case 3:EventPayload = "Report on Change Toward Vertical";break;
        case 4:EventPayload = "Report on Change away from Vertical";
        }
      Angle = (bytes[3] + (bytes[4] / 10)).toFixed(1);
      if (bytes[5] > 127) {Temperature = -(bytes[5] - 128)}else {Temperature = bytes[5]}
      decoded.Message = EventPayload + ": " + Angle + "° from Vertical Axis @ " + Temperature + "°C";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.SENSOR_STATE = bytes[3].toString(16) + bytes[4].toString(16) + bytes[5].toString(16);
    }
    break;

  // ===============  ULTRASONIC LEVEL EVENT  ================
  case "10":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Periodic Report";break;
        case 1:EventPayload = "Analog Value has Risen Above Upper Threshold";break;
        case 2:EventPayload = "Analog Value has Fallen Below Lower Threshold";break;
        case 3:EventPayload = "Report on Change Increase";break;
        case 4:EventPayload = "Report on Change Decrease";
      }
      Distance = ((bytes[3] * 256) + bytes[4]);
      decoded.Message = EventPayload + ": Distance " + Distance + "mm";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.SENSOR_STATE = ((bytes[3] * 256) + bytes[4]).toString(16);
    }
    break;

  // ================  4-20mA ANALOG EVENT  ==================
  case "11":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Periodic Report";break;
        case 1:EventPayload = "Analog Value has Risen Above Upper Threshold";break;
        case 2:EventPayload = "Analog Value has Fallen Below Lower Threshold";break;
        case 3:EventPayload = "Report on Change Increase";break;
        case 4:EventPayload = "Report on Change Decrease";
      }
      Analog = ((bytes[3] * 256) + bytes[4]) / 100;
      decoded.Message = EventPayload + ": " + Analog + "mA";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.SENSOR_STATE = ((bytes[3] * 256) + bytes[4]).toString(16);
    }
    break;

  // =================  THERMOCOUPLE EVENT  ==================
  case "13":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:EventPayload = "Periodic Report";break;
        case 1:EventPayload = "Analog Value has Risen Above Upper Threshold";break;
        case 2:EventPayload = "Analog Value has Fallen Below Lower Threshold";break;
        case 3:EventPayload = "Report on Change Increase";break;
        case 4:EventPayload = "Report on Change Decrease";
      }
      Analog = (((bytes[3] * 256) + bytes[4]) / 16).toFixed(2);
      decoded.Message = EventPayload + ": " + Analog + "°C";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.SENSOR_STATE = ((bytes[3] * 256) + bytes[4]).toString(16);
    }
    break;

  // ==================   DOWNLINK EVENT  ====================
  case "ff":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 1:EventPayload = "Downlink Message Invalid";break;
        case 2:EventPayload = "Downlink Message Valid";
      }
      decoded.Message = EventPayload;
      break;
    }
    else {
      decoded.DOWNLINK_ACK = bytes[2]
    }
    break;

  // end of EventType Case
  }
  return decoded;
}
