# Water Sensors

The payload decoder function is applicable to water sensors.


## Decoder Format

| Key                  | Type    | Description                                                 |
| -------------------- | ------- | ----------------------------------------------------------- |
| event                | String  | Holds the last received description of event                |
| relativeMeasurement  | String  | Holds the last received temperature value with unit         |

## Example

```json
// 16080115
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "WATER_SENSOR",
  WATER_SENSOR: {
    event: 'Water or liquid not present',
    relativeMeasurement: 21,
  }
}
```
