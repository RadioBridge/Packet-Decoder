function Decoder(bytes, port) {
  //   RADIO BRIDGE TTN PACKET DECODER v0.2
  // (c) 2019 RadioBridge USA by John Sheldon

  // TODO: 
  //       Faults and Error codes
  //       Downlink descriptions
  //       Shorten long descriptions for simplemode
  
  // Use SIMPLEMODE to show basic sensor messages only
  // Disable SIMPLEMODE to output raw bytes of packet
  // Set to 1 to turn SIMPLEMODE on, set to 0 for off
  SIMPLEMODE = 1;

  var decoded = {};
 
 
 
 
 
 
 
 // UPLINKS
  if (!SIMPLEMODE) {
    decoded.PORT = port;
    decoded.SEQUENCE = Hex(bytes[0] - 16)
    decoded.EVENT_TYPE = Hex(bytes[1]);
  }
  EventType = Hex(bytes[1]);
   switch(EventType) {

  // ==================    RESET EVENT    ====================
    case "00":
	  HardwareVersion = (Hex(bytes[3]) / 10).toFixed(1);
      FirmwareVerison = (bytes[4] + (bytes[5] / 10)).toFixed(1);
      if (SIMPLEMODE) {
        switch(Hex(bytes[2])) {
          case "01":DeviceType = "Door/Window";break;
          case "02":DeviceType = "Door/Window High Security";break;
          case "03":DeviceType = "Contact";break;
          case "04":DeviceType = "Temperature No-Probe";break;
          case "05":DeviceType = "Temperature External Probe";break;
          case "06":DeviceType = "Single Push Button";break;
          case "07":DeviceType = "Dual Push Button";break;
          case "08":DeviceType = "Acceleration-Based Movement";break;
          case "09":DeviceType = "Tilt";break;
          case "0A":DeviceType = "Water";break;
          case "0B":DeviceType = "Tank Level Float";break;
          case "0C":DeviceType = "Glass Break";break;
          case "0D":DeviceType = "Ambient Light";break;
          case "0E":DeviceType = "Air Temperature and Humidity";break;
          case "0F":DeviceType = "High-Precision Tilt";break;
          case "10":DeviceType = "Ultrasonic Level";break;
          case "11":DeviceType = "4-20mA Loop";break;
          case "12":DeviceType = "Ext-Probe Air Temp and Humidity";break;
          case "13":DeviceType = "Thermocouple Temp";break;
          Default:DeviceType = "Device Undefined";
        }
        decoded.Message = "Reset: " + DeviceType + ", HW: v" + HardwareVersion + ", FW: v" + FirmwareVerison;
        break;
      }
      else {
        decoded.DEVICE_TYPE = Hex(bytes[2]);
        decoded.HW_VER = HardwareVersion;
        decoded.FW_VER = FirmwareVerison;
        decoded.ERROR_CODES = Hex(bytes[6]) + Hex(bytes[7]);
      }
      break;

  // ================   SUPERVISORY EVENT   ==================
  // Need to add error codes
  // Sensor state relies on knowing the type of sensor...
  case "01":
    BatteryLevel = (Hex(bytes[4]) / 10).toFixed(1);
    if (SIMPLEMODE) {
      decoded.Message = "Supervisory: Battery Voltage " + BatteryLevel + "V";
      break;
    }
    else {
      decoded.ERROR_CODES = Hex(bytes[2]);
      decoded.SENSOR_STATE = Hex(bytes[3]);
      decoded.BATTERY_LEVEL = BatteryLevel;
    }
    break;

  // ==================   TAMPER EVENT    ====================
  case "02":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:TamperState = "Tamper Open";break;
        case 1:TamperState = "Tamper Closed";
      }
      decoded.Message = TamperState;
      break;
    }
    else {
      decoded.TAMPER_STATE = Hex(bytes[2]);
    }
    break;

  // ================  DOOR/WINDOW EVENT  ====================
  case "03":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:SensorState = "Door Closed";break;
        case 1:SensorState = "Door Opened";
        }
      decoded.Message = SensorState;
      break;
    }
    else {
      decoded.SENSOR_STATE = Hex(bytes[2]);
    }
    break;

  // ===============  PUSH BUTTON EVENT   ===================
  case "06":
    if (SIMPLEMODE) {
      switch(Hex(bytes[2])) {
        case "01":ButtonID = "Button 1";break;
        case "02":ButtonID = "Button 2";break;
        case "03":ButtonID = "Button";break;
        case "12":ButtonID = "Both Buttons";        
        }
      switch(bytes[3]) {
        case 0:SensorState = "Pressed";break;
        case 1:SensorState = "Released";break;
        case 2:SensorState = "Held";
        }
      decoded.Message = ButtonID + " " + SensorState;
      break;
    }
    else {
      decoded.BUTTON_ID = Hex(bytes[2]);
      decoded.SENSOR_STATE = Hex(bytes[3]);
    }
    break;

  // =================   CONTACT EVENT   =====================
  case "07":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:SensorState = "Contacts Shorted";break;
        case 1:SensorState = "Contacts Opened";
        }
      decoded.Message = SensorState;
      break;
    }
    else {
      decoded.SENSOR_STATE = Hex(bytes[2]);
    }
    break;

  // ===================  WATER EVENT  =======================
  case "08":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:SensorState = "Water or Liquid Present";break;
        case 1:SensorState = "Water or Liquid Absent";break;
        }
      Analog = bytes[3];
      decoded.Message = SensorState + ": Analog Value " + Analog;
      break;
    }
    else {
      decoded.SENSOR_STATE = Hex(bytes[2]);
      decoded.ANALOG_VALUE = Hex(bytes[3]);
    }
    break;

  // ================== TEMPERATURE EVENT ====================
  case "09":
    Temperature = Convert(bytes[3],0);
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:ReportType = "Periodic Report";break;
        case 1:ReportType = "Temperature Over Upper Threshold";break;
        case 2:ReportType = "Temperature Under Lower Threshold";break;
        case 3:ReportType = "Temperature Increase";break;
        case 4:ReportType = "Temperature Decrease";
      }

      decoded.Message = ReportType + ": " + Temperature + "°C";
      break;
    }
    else {
      decoded.REPORT_TYPE = Hex(bytes[2]);
      decoded.TEMPERATURE = Temperature;
      decoded.ANALOG_VALUE = Hex(bytes[4]);
    }
    break;

  // ====================  TILT EVENT  =======================
  case "0A":
    Angle = bytes[3]
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:ReportType = "Transitioned to Vertical";break;
        case 1:ReportType = "Transitioned to Horizontal";break;
        case 2:ReportType = "Tilted Toward Vertical";break;
        case 3:ReportType = "Tilted Toward Horizontal";
        }
      decoded.Message = ReportType + ": " + Angle + "° from Vertical Axis";
      break;
    }
    else {
      decoded.REPORT_TYPE = Hex(bytes[2]);
      decoded.TILT_ANGLE = Angle;
    }
    break;

  // =============  AIR TEMP & HUMIDITY EVENT  ===============
  case "0D":
    Temperature = Convert((bytes[3]) + (bytes[4] / 160),1);
    Humidity = +(bytes[5] + (bytes[6] / 160)).toFixed(1);
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:ReportType = "Periodic Report";break;
        case 1:ReportType = "Temperature has Risen Above Upper Threshold";break;
        case 2:ReportType = "Temperature has Fallen Below Lower Threshold";break;
        case 3:ReportType = "Temperature Increase";break;
        case 4:ReportType = "Temperature Decrease";break;
        case 5:ReportType = "Humidity has Risen Above Upper Threshold";break;
        case 6:ReportType = "Humidity has Fallen Below Lower Threshold";break;
        case 7:ReportType = "Humidity Increase";break;
        case 8:ReportType = "Humidity Decrease";
        }
      decoded.Message = ReportType + ": Temp: " + Temperature + "°C / Humd: " + Humidity + "%";
    }
    else {
      decoded.REPORT_TYPE = Hex(bytes[2]);
      decoded.TEMPERATURE = Temperature;
      decoded.HUMIDITY = Humidity;
    }
    break;

  // ============  ACCELERATION MOVEMENT EVENT  ==============
  case "0E":
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:SensorState = "Acceleration Started";break;
        case 1:SensorState = "Acceleration Stopped";
        }
      decoded.Message = SensorState;
      break;
    }
    else {
      decoded.SENSOR_STATE = Hex(bytes[2]);
    }
    break;

  // =============  HIGH-PRECISION TILT EVENT  ===============
  case "0F":
    Angle = +(bytes[3] + (bytes[4] / 10)).toFixed(1);
    Temperature = Convert(bytes[5],0);
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:ReportType = "Periodic Report";break;
        case 1:ReportType = "Transitioned toward Vertical";break;
        case 2:ReportType = "Transitioned away from Vertical";break;
        case 3:ReportType = "Report on Change Toward Vertical";break;
        case 4:ReportType = "Report on Change away from Vertical";
        }
      decoded.Message = ReportType + ": " + Angle + "° from Vertical Axis @ " + Temperature + "°C";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.TILT_ANGLE = Angle;
	  decoded.TEMPERATURE = Temperature;
    }
    break;

  // ===============  ULTRASONIC LEVEL EVENT  ================
  case "10":
    Distance = ((bytes[3] * 256) + bytes[4]);
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:ReportType = "Periodic Report";break;
        case 1:ReportType = "Analog Value has Risen Above Upper Threshold";break;
        case 2:ReportType = "Analog Value has Fallen Below Lower Threshold";break;
        case 3:ReportType = "Report on Change Increase";break;
        case 4:ReportType = "Report on Change Decrease";
      }

      decoded.Message = ReportType + ": Distance " + Distance + "mm";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.DISTANCE = Distance;
    }
    break;

  // ================  4-20mA ANALOG EVENT  ==================
  case "11":
    Analog = ((bytes[3] * 256) + bytes[4]) / 100;
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:ReportType = "Periodic Report";break;
        case 1:ReportType = "Analog Value has Risen Above Upper Threshold";break;
        case 2:ReportType = "Analog Value has Fallen Below Lower Threshold";break;
        case 3:ReportType = "Report on Change Increase";break;
        case 4:ReportType = "Report on Change Decrease";
      }

      decoded.Message = ReportType + ": " + Analog + "mA";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.ANALOG_VALUE = Analog;
    }
    break;

  // =================  THERMOCOUPLE EVENT  ==================
  case "13":
    Temperature = (((bytes[3] * 256) + bytes[4]) / 16).toFixed(2);
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:ReportType = "Periodic Report";break;
        case 1:ReportType = "Analog Value has Risen Above Upper Threshold";break;
        case 2:ReportType = "Analog Value has Fallen Below Lower Threshold";break;
        case 3:ReportType = "Report on Change Increase";break;
        case 4:ReportType = "Report on Change Decrease";
      }
      decoded.Message = ReportType + ": " + Temperature + "°C";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.TEMPERATURE = Temperature;
    }
    break;

  // ================  VOLTMETER ANALOG EVENT  ==================
  case "14":
    Analog = ((bytes[3] * 256) + bytes[4]) / 100;
    if (SIMPLEMODE) {
      switch(bytes[2]) {
        case 0:ReportType = "Periodic Report";break;
        case 1:ReportType = "Voltmeter has Risen Above Upper Threshold";break;
        case 2:ReportType = "Voltmeter has Fallen Below Lower Threshold";break;
        case 3:ReportType = "Report on Change Increase";break;
        case 4:ReportType = "Report on Change Decrease";
      }

      decoded.Message = ReportType + ": " + Analog + "V";
      break;
    }
    else {
      decoded.REPORT_TYPE = bytes[2];
      decoded.ANALOG_VALUE = Analog;
    }
    break;	

  // ================   LINK QUALITY EVENT  ==================
 case "FB":
    if (SIMPLEMODE) {
	  RSSI = Convert(bytes[3],0)
	  SNR = +(bytes[4]).toFixed(1)
      ReportType="Link Quality"
      decoded.Message = ReportType + ": RSSI: " + RSSI + " SNR: " + SNR;
      break;
    }
    else {
      decoded.REPORT_TYPE = Hex(bytes[2]);
      decoded.RSSI = RSSI
      decoded.SNR = SNR
    }
    break;

  // ==================   DOWNLINK EVENT  ====================
  case "FF":
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

function Hex(decimal) {
  decimal = ('0' + decimal.toString(16).toUpperCase()).slice(-2);
  return decimal;
}

function Convert(number, mode) {
  switch(mode) {
    // for EXT-TEMP and NOP 
    case 0: if (number > 127) {result = number - 256} else {result = number};break
    //for ATH temp
 	  case 1: if (number > 127) {result = -+(number - 128).toFixed(1)} else {result = +number.toFixed(1)};break
  }
  return result;
}
