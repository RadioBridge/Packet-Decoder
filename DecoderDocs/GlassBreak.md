# Glass Break Sensors

The payload decoder function is applicable to glass break sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| event                 | String  | Holds the last received description of event              |

## Example

```json
// Glass Break
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "GLASS_BREAK_EVENT",
  GLASS_BREAK_EVENT: {
    event: 'Glass Break',
  }
}
```
