# Contact Sensors

The payload decoder function is applicable to contact sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| event                 | String  | Holds the last received state(shorted, opened) of contact |

## Example

```json
// 170700
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "CONTACT_SENSOR",
  CONTACT_SENSOR: {
    event: 'Shorted',
  }
}
```
