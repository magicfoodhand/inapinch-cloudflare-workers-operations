[![Node.js Package](https://github.com/magicfoodhand/inapinch-cloudflare-workers-operations/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/magicfoodhand/inapinch-cloudflare-workers-operations/actions/workflows/npm-publish.yml)

# cloudflare-worker-operations

Small wrapper around Cloudflare KV and Worker Bindings to keep track of Usage

```typescript
import Operations from 'cloudflare-worker-operations'

declare let KV: KVNamespace
declare let WORKER: Pick<ServiceWorkerGlobalScope, 'fetch'>

const operations = new Operations()

const kv = operations.forKV(KV)

/** use kv like normal */
const kvResults = await kv.get('myValue')

const worker = operations.forWorker(WORKER)
const workerResults = await worker.fetch('https://example.com')

const summary = operations.summary() // {"kv:get":1,"worker:fetch":1}
const totalOperations = operations.summary(false) // 2
```

## Development
To install test dependencies use `npm i`, test with `npm run test`