# Tilt Sensors

The payload decoder function is applicable to tilt sensors.


## Decoder Format

| Key                      | Type    | Description                                               |
| ------------------------ | ------- | --------------------------------------------------------- |
| event                    | String  | --                                                        |
| tilt_angle_vertical_axis | String  | Holds the Tilt angle from vertical axis                   |

## Example

```json
// 150a0219
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "TILT_EVENT",
  TILT_EVENT: {
    event: 'Report on change toward vertical',
    tilt_angle_vertical_axis: '25 Degrees',
  }
}
```
