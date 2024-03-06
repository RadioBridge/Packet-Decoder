# Door/Window Sensors

The payload decoder function is applicable to door/window sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| event                 | String  | Indicates the current door state (either opened/closed)   |

## Example

```json
// 160301
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "DOOR_WINDOW_SENSOR",
  DOOR_WINDOW_SENSOR: {
    event: 'Opened',
  }
}
```
