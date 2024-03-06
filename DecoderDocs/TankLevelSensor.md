# Tank Level Sensors

The payload decoder function is applicable to tank level sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| event                 | String  | Indicates the tank state (either full or empty)           |

## Example

```json
// 180C01
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "TANK_LEVEL_SENSOR",
  TANK_LEVEL_SENSOR: {
    event: 'Tank empty',
  }
}
```
