# Thermocouple Temperature Sensors

The payload decoder function is applicable to thermocouple temperature sensors.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| event                 | String  | --                                                        |
| faults                | String  | Holds the last received faults value                      |
| current_temp          | String  | Holds the last received temperature value with unit       |

## Example

```json
// 111300015f00
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "THERMOCOUPLE_TEMP",
  THERMOCOUPLE_TEMP: {
    event: 'Periodic Report',
    faults: 'No Faults',
    current_temp: 21.94,
  }
}
```
