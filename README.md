# RadioBridge Decoder

This library helps de-coding the Radio Bridge sensor payload as a JSON Object, that can be used in various applications to display the proper sensor states.

## Installation

This library can be installed using any compatible package manager.

```sh
npm install @radiobridge/packet-decoder --save

# For Yarn, use the command below.
yarn add @radiobridge/packet-decoder
```

## Usage

You can use the decoder package using NPM or use the minified JS version to decode the data in browsers.

### Node.js
```ts
const decoder = require('@radiobridge/packet-decoder')

console.log(decoder.decodePayload('1901030126000000000000'))
```

### JavaScript - Browser compatible

Download the JS file from [here](https://github.com/deepakmaurya/radiobridge-packet-decoder/dist/radiobridge-decoder.min.js)
```js
<script type="text/javascript" src="radiobridge-decoder.min.js"></script>

<script type="text/javascript">
    console.log(radiobridgeDecoder.decodePayload('1901030126000000000000'))
</script>
```

### Additional Helper functions
Following functions are also available to decode the raw payloads received through different LNS networks, You can pass the raw data to the appropriate function to decode the payload.

```js
let result = decodeTtnPayload('GAYDAQ==');

let result = decodeChirpstackPayload('FwYDAA==');

let result = decodeAwsIotPayload('FwYDAA==');

let result = decodeKerlinkPayload('FwYDAA==');
```

## Output Format

decodePayload function accepts a Hexadecimal payload and returns the decoded values as an JSON Object.

## Example Output

```json
// Input: 1901030126000000000000
// Output:
{
  "protocol": "1",
  "counter": 25,
  "type": "SUPERVISOR",
  "SUPERVISOR": {
    "BatteryLow": true,
    "ErrorWithLastDownlink": true,
    "TamperState": false,
    "TamperSinceLastReset": false,
    "threshold": "X-axis over threshold",
    "battery": "2.6V",
    "accumulationCount": 0
  }
}
```

## Sensor Decode Examples

Please refer to the [GitHub README](https://github.com/deepakmaurya/radiobridge-packet-decoder/DecoderDocs#readme) to view the sensors output in detail.


