# Voltage Sensors

The payload decoder function is applicable to voltage sensors.


## Decoder Format

| Key                  | Type    | Description                                                 |
| -------------------- | ------- | ----------------------------------------------------------- |
| event                | String  | Holds the last received description of event                |
| voltage              | String  | Holds the last received voltage measurement value with unit |

## Example

```json
// 191404059e
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "VOLTAGE_SENSOR",
  VOLTAGE_SENSOR: {
    event: 'Report on change decrease',
    voltage: '14.38 V',
  }
}
```
