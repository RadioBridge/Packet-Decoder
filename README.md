# RadioBridge Decoder

This library helps de-coding the Radio Bridge sensor payload as a JSON Object, that can be used in various applications to display the proper sensor states.

## Installation

This library can be installed using any compatible package manager.

```sh
npm install @radiobridge/packet-decoder --save

# For Yarn, use the command below.
yarn add @radiobridge/packet-decoder
```

### Usage

```ts
const decoder = require('@radiobridge/packet-decoder')

console.log(decoder.decodePayload('170001'))
```

