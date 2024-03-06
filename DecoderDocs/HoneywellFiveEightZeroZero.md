# Honeywell Five Eight Zero Zero

The payload decoder function is applicable to honeywell five eight zero zero.


## Decoder Format

| Key                      | Type    | Description                                               |
| ------------------------ | ------- | --------------------------------------------------------- |
| decimal_id               | String  | --                                                        |
| hex_id                   | String  | --                                                        |
| sensor_payload           | String  | --                                                        |
| sensor_payload_hex       | String  | --                                                        |

## Example

```json
// 6417ff331004b4034fea53
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "HONEYWELL_5800",
  HONEYWELL_5800: {
    decimal_id: '3346436',
    hex_id: '0x331004',
    sensor_payload: '46083',
    sensor_payload_hex: '0xb403',
  }
}
```
