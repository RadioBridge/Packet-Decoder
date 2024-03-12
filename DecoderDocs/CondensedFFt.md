## CondensedFFT & CondensedFFt Part

| Key                   | Type    | Description                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| condensedFftTotal     | String  | Holds the last condensed fft total value                     |
| condensedFft          | Array   | Holds the last value of axis, type and band values           |

## CondensedFFT Array
| Key                   | Type    | Description                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| axis     | String  | Holds the last condensed fft total value                                  |
| type     | Array   | Holds the last value of axis, type and band values                        |
| values   | Oject   | Holds bands frequency range values as object                                              |                                              
| data     | String  | hold the payload value                                                    |

## Example
## Without part payload
```json
// 13202000170007004a0003
{
  protocol: ProtocolVersion,
  counter: PacketCounter,n
  type: "CONDENSEDFFT",
  CONDENSEDFFT: {
    condensedFftTotal: 1,
    condensedFft: [
      data: "13202000170007004a0003",
      axis: 1,
      type: 'Peak Energy Values',
      values: {
        '10-20Hz': "0.00000",
        '21-40Hz': "0.00000",
        '41-55Hz': "0.00000",
        '56-70Hz': "0.00000",
      },
    ]
  }
}
```

## With part payload
```json
// 13202000170007004a0003
//1420300004000100010000
{
  protocol: ProtocolVersion,
  counter: PacketCounter,n
  type: "CONDENSEDFFT",
  CONDENSEDFFT: {
    condensedFftTotal: 1,
    condensedFft: [
      {
      data: "13202000170007004a0003",
      axis: 1,
      type: 'Peak Energy Values',
      values: {
        '10-20Hz': "0.00000",
        '21-40Hz': "0.00000",
        '41-55Hz': "0.00000",
        '56-70Hz': "0.00000",
      },
      },
      {
      data: "1420300004000100010000",
      axis: 1,
      type: 'Peak Energy Values',
      values: {
        '10-20Hz': "0.00000",
        '21-40Hz': "0.00000",
        '41-55Hz': "0.00000",
        '56-70Hz': "0.00000",
      },
      },
    ]
  }
}
```
