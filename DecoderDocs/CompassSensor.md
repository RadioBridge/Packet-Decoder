# Compass Sensors

The payload decoder function is applicable to compass sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| event                 | String  | Holds the last received temperature value with unit       |
| angle                 | String  | Holds the last received angle value with unit             |
| temperature           | String  | Holds the last received temperature value with unit       |

## Example

```json
// 171A00200ABA
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "COMPASS_SENSOR",
  COMPASS_SENSOR: {
    event: 'Periodic report',
    angle: '8202',
    temperature: '186',
  }
}
```
