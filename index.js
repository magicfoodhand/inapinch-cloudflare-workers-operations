class PinchKV {
  constructor(operations, kv) {
    this.kv = kv;
    this.operations = operations;
  }

  delete(name) {
    this.operations.increment('kv:delete');
    return this.kv.delete(name);
  }

  get(key, options) {
    this.operations.increment('kv:get');
    return this.kv.get(key, options);
  }

  getWithMetadata(key, options) {
    this.operations.increment('kv:get');
    return this.kv.getWithMetadata(key, options);
  }

  list(options) {
    this.operations.increment('kv:list');
    return this.kv.list(options);
  }

  put(key, value, options) {
    this.operations.increment('kv:put');
    return this.kv.put(key, value, options);
  }
}

class PinchWorker {
  constructor(operations, worker) {
    this.worker = worker;
    this.operations = operations;
  }

  fetch(
    request,
    requestInitr,
  ) {
    this.operations.increment('worker:fetch');
    return this.worker.fetch(request, requestInitr);
  }
}

export default class Operations {
  constructor({
    initialValue = 0,
    values = {},
  } = {}) {
    this.initialValue = initialValue;
    this.values = values;
  }

  increment(name) {
    if (this.values[name]) {
      this.values[name]++;
    } else {
      this.values[name] = 1;
    }
  }

  summary(verbose = true) {
    return verbose
      ? this.values
      : Object.values(this.values).reduce(
          (sum, next) => sum + next,
          this.initialValue,
        );
  }

  forKV(kv) {
    return new PinchKV(this, kv);
  }

  forWorker(worker) {
    return new PinchWorker(this, worker);
  }
}