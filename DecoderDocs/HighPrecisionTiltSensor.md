# High Precision Tilt Sensor

The payload decoder function is applicable to high precision tilt sensor.


## Decoder Format

| Key                      | Type    | Description                                               |
| ------------------------ | ------- | --------------------------------------------------------- |
| temperature              | String  | Holds the last received temperature value with unit       |
| tilt_angle_vertical_axis | String  | Holds the Tilt angle from vertical axis with unit         |

## Example

```json
// 1a0f0059030c
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "HIGH_PRECISION_TILT_SENSOR",
  HIGH_PRECISION_TILT_SENSOR: {
    temperature: '12 C',
    tilt_angle_vertical_axis: '89.3 Degrees',
  }
}
```
