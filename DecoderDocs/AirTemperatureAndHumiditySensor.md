# Air Temperature & Humidity Sensors

The payload decoder function is applicable to air temperature and humidity sensors.


## Decoder Format



## AIR_TEMP_HUMIDITY_SENSOR

| Key                   | Type    | Description                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| current_temperature   | String  | Holds the last received temperature value in degrees celcius |
| humidity              | String  | Holds the last received humidity value with unit             |
| event                 | String  | --                                                           |
| type                  | String  | --                                                           |

## Example

```json
// 130d058f603c00
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "AIR_TEMP_HUMIDITY_SENSOR",
  AIR_TEMP_HUMIDITY_SENSOR: {
    type: 'AIR_TEMP_HUMIDITY_SENSOR',
    event: 'Humidity has risen above upper threshold',
    current_temperature: '-15.6',
    humidity: '60.0'
  }
}
```



## INTERNAL_TEMPERATURE

| Key                   | Type    | Description                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| current_temperature   | String  | Holds the last received temperature value with unit          |
| event                 | String  |                                                              |
| type                  | String  | --                                                           |
## Example

```json
// 1219009630
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "INTERNAL_TEMPERATURE",
  INTERNAL_TEMPERATURE: {
    type: 'INTERNAL_TEMPERATURE',
    event: 'Periodic Report',
    current_temperature: '-22.3'
  }
}
```
