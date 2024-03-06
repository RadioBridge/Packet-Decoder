# Magnetometer Sensor

The payload decoder function is applicable to magnetometer sensor.


## Decoder Format

| Key                   | Type    | Description                                               |
| --------------------- | ------- | --------------------------------------------------------- |
| messageType           | String  | --                                                        |
| xaxis                 | String  | Holds the last received x axis value in milliguss         |
| yaxis                 | String  | Holds the last received y axis value in milliguss         |
| zaxis                 | String  | Holds the last received z axis value in milliguss         |
| temperature           | String  | Holds the last received temperature value with unit       |

## Example

```json
// 6418feae100000022536
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "MAGNETOMETER_SENSOR",
  MAGNETOMETER_SENSOR: {
    messageType: null,
    xaxis: '-20976',
    yaxis: '0',
    zaxis: '549',
    temperature: '54',
  }
}
```
