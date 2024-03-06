# Ultrasonic Level Sensor

The payload decoder function is applicable to ultrasonic level sensor.


## Decoder Format

| Key                  | Type    | Description                                               |
| -------------------- | ------- | --------------------------------------------------------- |
| event                | String  | Holds the last received description of event              |
| sensor_state         | String  | Holds the last received temperature value with unit       |

## Example

```json
// 121001270f
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "ULTRASONIC_LEVEL_SENSOR",
  ULTRASONIC_LEVEL_SENSOR: {
    event: 'Distance has risen above upper threshold',
    sensor_state: 9999,
  }
}
```
