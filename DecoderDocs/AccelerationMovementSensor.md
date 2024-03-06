# Acceleration Movement Sensors

The payload decoder function is applicable to acceleration movement sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| event                 | String  | Holds the last received description of event              |

## Example

```json
// 110e01
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "ACCELERATION_MOVEMENT_SENSOR",
  ACCELERATION_MOVEMENT_SENSOR: {
    event: 'Acceleration stopped',
  }
}
```
