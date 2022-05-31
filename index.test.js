import { expect } from 'chai'

import Operations from './index.js';

const kvValues = {}

const KV = {
  get: (key) => kvValues[key],
  getWithMetadata: (key) => kvValues[key],
  put: (key, value) => kvValues[key] = value,
  delete: (key) => delete kvValues[key],
  list: (options) => ({})
}

describe('Operations', () => {
  it('default value - verbose', () => {
    const operations = new Operations();
    expect(operations.summary()).to.deep.equal({});
  });

  it('default value - not verbose', () => {
    const operations = new Operations();
    expect(operations.summary(false)).to.equal(0);
  });

  it('increment works', () => {
    const operations = new Operations();
    operations.increment('myKey');
    expect(operations.summary()['myKey']).to.equal(1);
  });

  describe('Operations:forKV', () => {
    it('increment for get', () => {
      const operations = new Operations();
      const kv = operations.forKV(KV)
      kv.get('hello')
      expect(operations.summary()['kv:get']).to.equal(1);
    });
    
    it('increment for getWithMetadata - treat as get', () => {
      const operations = new Operations();
      const kv = operations.forKV(KV)
      kv.getWithMetadata('hello')
      expect(operations.summary()['kv:get']).to.equal(1);
    });
    
    it('increment for put', () => {
      const operations = new Operations();
      const kv = operations.forKV(KV)
      kv.put('hello', 'world')
      expect(operations.summary()['kv:put']).to.equal(1);
    });

    it('increment for delete', () => {
      const operations = new Operations();
      const kv = operations.forKV(KV)
      kv.delete('hello')
      expect(operations.summary()['kv:delete']).to.equal(1);
    });
    
    it('increment for list', () => {
      const operations = new Operations();
      const kv = operations.forKV(KV)
      kv.list('hello')
      expect(operations.summary()['kv:list']).to.equal(1);
    });
  });

  describe('Operations:forWorker', () => {
    it('increment for fetch', () => {
      const operations = new Operations();
      const worker = operations.forWorker({
        fetch: () => ({})
      })
      worker.fetch()
      expect(operations.summary()['worker:fetch']).to.equal(1);
    });
  });
});
