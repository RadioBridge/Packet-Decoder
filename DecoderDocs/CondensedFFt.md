## CondensedFFT & CondensedFFt Part

### Input

Condensed FFT requires 5 payloads to decode the final values. Here is an example of parameters required to pass.

```js
radiobridgeDecoder.decodePayload('<condensed_fft_part_1>', '<high_frequency_vibration>', '<condensed_fft_part_2>', '<condensed_fft_energy_part_1>', '<condensed_fft_energy_part_2>');
```

```js
radiobridgeDecoder.decodePayload('112000001e0022000c000e', '101c000100139f', '12201000130006001a0005', '1320200009000400010001', '1420300001000100000000');
```


## CondensedFFT Array
| Key                   | Type    | Description                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| condensedFftTotal     | String  | Holds the last condensed fft total value                     |
| condensedFft          | Array   | Holds the last value of axis, type and band values           |
| axis     | String  | Holds the last condensed fft total value                                  |
| type     | Array   | Holds the last value of axis, type and band values                        |
| values   | Oject   | Holds bands frequency range values as object                                              |
| data     | String  | hold the payload value                                                    |

## Example Output


```json
{
  "protocol": "1",
  "counter": 17,
  "type": "VIBRATION_CONDENSED_FFT_ENERGY",
  "VIBRATION_CONDENSED_FFT_ENERGY": {
    "condensedFftTotal": 146,
    "condensedFft": [
      {
        "data": "00",
        "axis": "01",
        "condensedFft": {
          "type": "Total Energy Values",
          "values": {
            "10-20Hz": "0.00205",
            "21-40Hz": "0.00233",
            "41-55Hz": "0.00082",
            "56-70Hz": "0.00096"
          }
        }
      },
      {
        "data": "10",
        "axis": "01",
        "condensedFft": {
          "type": "Total Energy Values",
          "values": {
            "71-110Hz": "0.00130",
            "111-130Hz": "0.00041",
            "131-230Hz": "0.00178",
            "231Hz+": "0.00034"
          }
        }
      }
    ]
  }
}
```
