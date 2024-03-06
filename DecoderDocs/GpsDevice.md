# Gps Device Sensor - GPS Config

The payload decoder function is applicable to gps device sensor - gps config.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| event                 | String  | --                                                        |
| latitude              | String  | Holds the last received latitude value                    |
| longitude             | String  | Holds the last received longitude value                   |

## Example

```json
// f01671653e3d963d1512cc
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "GPS_SENSOR",
  GPS_SENSOR: {
    event: 'Valid GPS Fix',
    latitude: '169.8577814000',
    longitude: '102.47912440000',
  }
}
```
