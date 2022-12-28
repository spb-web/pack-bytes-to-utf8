# pack-bytes-to-utf8 🔢
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/spb-web/pack-bytes-to-utf8/tree/master.svg?style=svg)](https://app.circleci.com/pipelines/github/spb-web/pack-bytes-to-utf8?branch=master)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/pack-bytes-to-utf8?color=green)](https://bundlephobia.com/package/pack-bytes-to-utf8)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/pack-bytes-to-utf8)](https://bundlephobia.com/package/pack-bytes-to-utf8)

![](https://raw.githubusercontent.com/spb-web/pack-bytes-to-utf8/master/docs/bytesToUtf8.webp)

## Install
### yarn
```
yarn add pack-bytes-to-utf8
```

### npm
```
npm insall pack-bytes-to-utf8
```
### A quick example

```ts
import {uint8ArrayToUtf8, utf8ToUint8Array} from 'pack-bytes-to-utf8'

const bytes = new Uint8Array([0xff, 0xff, 0xff, 0xff])

const bytesInString = uint8ArrayToUtf8(bytes)

const parsedBytes = utf8ToUint8Array(bytesInString)
```

### Server-sent events (SSE) example
#### Server
```ts
import {uint8ArrayToUtf8} from 'pack-bytes-to-utf8'

const bytes = new Uint8Array(Buffer.from('0xaa344...64f456', 'hex'))

// Messages in the event stream are separated by a pair of newline 
// characters, so we exclude the line break characters.
//
// Excluded characters will be replaced with double-byte characters.
const excludeCharacters = new Set([0xA, 0xB, 0xC, 0xD, 0xE])

const str = uint8ArrayToUtf8(
  bytes,
  excludeCharacters,
)

app.get('/sse', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');

  res.write(`data: ${str}\n\n`)
})
```

#### Client
```ts
import {utf8ToUint8Array} from 'pack-bytes-to-utf8'

const eventSource = new EventSource('http://localhost:3000/sse')

eventSource.addEventListener('message', ({data}) => {
  console.log(utf8ToUint8Array(data))
})
```
