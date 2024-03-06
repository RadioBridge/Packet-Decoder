# Ambient Light Sensors

The payload decoder function is applicable to ambient light sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| lightMeasurement      | String  | Holds the last received relative temperature value        |

## Example

```json
// 160b060301
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "AMBIENT_LIGHT_SENSOR",
  AMBIENT_LIGHT_SENSOR: {
    lightMeasurement: '3',
  }
}
```
