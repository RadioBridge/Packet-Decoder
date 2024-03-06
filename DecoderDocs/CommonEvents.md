# Common Events - Applicable to all Radio Bridge Sensors

The payload decoder function is applicable to all of the sensors.

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
| accumulationCount     | Int     |                                                           |

## Example

```json
// 017564 03671801 04686D
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
