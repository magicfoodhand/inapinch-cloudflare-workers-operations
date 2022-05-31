[![Node.js Package](https://github.com/magicfoodhand/inapinch-cloudflare-worker-operations/actions/workflows/npm-test.yml/badge.svg)](https://github.com/magicfoodhand/inapinch-cloudflare-worker-operations/actions/workflows/npm-test.yml)

# @inapinch/cloudflare-worker-operations

Small wrapper around Cloudflare KV and Worker Bindings to keep track of Usage

```typescript
import Operations from '@inapinch/cloudflare-worker-operations'

declare let KV: KVNamespace

const operations = new Operations()

const kv = operations.forKV(KV)

/** use kv like normal */
const resuls = await kv.get('myValue')

const summary = operations.summary() 
const totalOperations = operations.summary(false) // 1
```

## Development
To install test dependencies use `npm i`, test with `npm run test`