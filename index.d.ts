type Worker = Pick<ServiceWorkerGlobalScope, 'fetch'>;

export default class Operations {
    increment(name: string): void
    summary(verbose = true): Record<string, number> | number
    forKV(kv: KVNamespace): KVNamespace
    forWorker(worker: Worker): Worker
}