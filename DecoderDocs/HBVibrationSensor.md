# High Bandwidth Vibration Sensors

The payload decoder function is applicable to high bandwidth vibration sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| axis                  | Integer | Holds the last received axis value                        |
| event                 | String  | Holds the last received description of event              |
| vibration_velocity    | String  | Holds the last received low frequency peak velocity       |
| vibration_gforce      | String  | Holds the last received high frequency peak velocity      |
| accelerator_temp      | String  | Holds the last received state of sensor                   |
| bias_voltage          | Decimal | Holds the last received bias voltage value                |

## Example

```json
// 1f1c001c2c1ba8
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "HB_VIBRATION_SENSOR",
  HB_VIBRATION_SENSOR: {
    axis: 'Channel 1',
    event: 'Periodic Report',
    vibration_velocity: '0.28000',
    vibration_gforce: 11,
    accelerator_temp: 27,
    bias_voltage: 1.68,
  }
}
```
