# 4-20mA Current Loop Sensors

The payload decoder function is applicable to 4-20mA current loop sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| event                 | String  | Holds the Current measurement value with unit             |
| sensor_state          | Float   | Indicates the latest sensor state                         |

## Example

```json
// 181100ffff
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "WIRELESS_420MA_CURRENT_LOOP_SENSOR",
  WIRELESS_420MA_CURRENT_LOOP_SENSOR: {
    event: 'Periodic Report',
    sensor_state: 655.35,
  }
}
```
