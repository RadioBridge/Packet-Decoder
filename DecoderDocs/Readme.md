# RadioBridge Decoder

This document describes the response format produced by decoder for all the RadioBridge sensors.

## Output Format

Decoder accepts a Hexadecimal payload and returns the decoded values as an JSON Object. JSON Object includes the following parameters.

## Example

```json
// Input: 0175640367180104686D
// Output:
{
  protocol: ProtocolVersion,
  counter: PacketCounter,
  type: "RESET",
  reset: {
    device: DeviceType,
    firmware: FirmwareVersion,
    hardware: HardwareVersion
  }
}
```

## Usage

To decode the payload you need to call the following function.

1. This function accepts the Hex payload only.

 ```let result = decodePayload('170700');```
2. Following functions are also available depending on the LNS network, pass the raw data to the function to decode the payload.

```let result = decodeTtnPayload('GAYDAQ==');```

```let result = decodeChirpstackPayload('FwYDAA==');```
