# Common Events - Applicable to all Radio Bridge Sensors

The payload decoder function is applicable to all the sensors.

For more detailed information, please visit [Radio Bridge official website](https://www.radiobridge.com).

## Decoder Format



## Supervisory

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| BatteryLow            | Boolean | Indicates if the battery is low                           |
| ErrorWithLastDownlink | Boolean | Indicates if the last downlink was failed                 |
| TamperState           | Boolean | Tamper state                                              |
| TamperSinceLastReset  | Boolean | Indicates if the sensor was opened after last reset event |
| battery               | Float   | Displays the current battery voltage                      |
| accumulationCount     | Int     | --                                                        |

## Example

> Payload: 1901030126000000000000
```json
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "SUPERVISOR",
  SUPERVISOR: {
    BatteryLow: true,
    ErrorWithLastDownlink: true,
    TamperState: false,
    TamperSinceLastReset: false,
    threshold: 'X-axis over threshold',
    battery: '2.6V',
    accumulationCount: '0'
  }
}
```



## Tamper

| Key                   | Type    | Description                                                                  |
| --------------------- | ------- | -----------------------------------------------------------------------------|
| event                 | String  | Yes - When device enclosure is open and when closed this will hold No value. |

## Example

> Payload: 190201
```json
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "TAMPER",
  TAMPER: {
   event: 'Open'
  }
}
```



## Reset

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| hardware_version      | String  | Hardware version from reset message Example: “2.0”        |
| firmware_version      | String  | Firmware version from reset message Example: “1.6”        |

## Example
> Payload: 10000a2288ad703c
```json
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "RESET",
  RESET: {
   hardware_version: '2.2',
   firmware_version: '2.5.13',
  }
}
```



## Downlink

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| extendedBytes         | String  | --                                                        |
| event                 | String  | --                                                        |

## Example

> Payload: 16ff0311019e0000000000

```json
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "DOWNLINK",
  DOWNLINK: {
   extendedBytes: '11 01 9E 00 00 00 00 00',
   event: 'Msg Valid - No Errors',
  }
}
```



## Link Quality

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| rssi                  | Int     | --                                                        |
| snr                   | Int     | --                                                        |

## Example

> Payload: 1bfb01b906

```json
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "LINK_QUALITY",
  LINK_QUALITY: {
   rssi: -71,
   snr: 6,
  }
}
```

