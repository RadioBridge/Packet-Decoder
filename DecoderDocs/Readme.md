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
