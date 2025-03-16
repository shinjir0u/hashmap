import LinkedList from "./linkedList.js";

class HashMap {
  constructor() {
    this.buckets = new Array(16);
    this.capacity = this.buckets.length;
    this.LOAD_FACTOR = 0.75;
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  #bucket(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[index] === null || this.buckets[index] === undefined)
      this.buckets[index] = new LinkedList();
    return this.buckets[index];
  }

  #entry(bucket, key) {
    return this.#entryHelper(key, bucket.head());
  }

  #entryHelper(key, node) {
    if (node === null) return node;
    if (node.value.key === key) return node;
    return this.#entryHelper(key, node.nextNode);
  }

  set(key, value) {
    const bucket = this.#bucket(key);
    const entry = this.#entry(bucket, key);
    if (entry) entry.value.value = value;
    else bucket.append({ key, value });

    if (this.length() > this.capacity * this.LOAD_FACTOR) {
      const entries = this.entries();
      this.buckets = new Array(32);
      this.capacity = this.buckets.length;
      for (let entry of entries) this.set(entry[0], entry[1]);
    }
  }

  get(key) {
    const bucket = this.#bucket(key);
    const entry = this.#entry(bucket, key);
    return entry;
  }

  has(key) {
    const bucket = this.#bucket(key);
    const entry = this.#entry(bucket, key);
    return !!entry;
  }

  remove(key) {
    const bucket = this.#bucket(key);
    const entry = this.#entry(bucket, key);
    if (entry) {
      const entryIndex = bucket.find(entry);
      bucket.removeAt(entryIndex);
    }
    return !!entry;
  }

  length() {
    let length = 0;
    for (let bucket of this.buckets) {
      if (bucket) length += bucket.size();
    }
    return length;
  }

  clear() {
    this.buckets = new Array(16);
  }

  keys() {
    let keys = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        const bucketKeysHelper = this.#bucketEntryPropertyHelperFactory("key");
        keys = [...keys, ...bucketKeysHelper([], bucket.head())];
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        const bucketValuesHelper = this.#bucketEntryPropertyHelperFactory("value");
        values = [...values, ...bucketValuesHelper([], bucket.head())];
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        entries = [...entries, ...this.#bucketEntryHelper([], bucket.head())];
      }
    }
    return entries;
  }

  #bucketEntryPropertyHelperFactory(property) {
    return function bucketEntry(entries, node) {
      if (node === null) return;
      entries.push(node.value[property]);
      bucketEntry(entries, node.nextNode);
      return entries;
    }
  }

  #bucketEntryHelper(entries, node) {
    if (node === null) return;
    entries.push([node.value.key, node.value.value]);
    this.#bucketEntryHelper(entries, node.nextNode);
    return entries;
  }

  log() {
    console.dir(this.buckets);
  }
}

export default HashMap;
