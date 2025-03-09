import LinkedList from "./linkedList.js";

class HashMap {
  constructor() {
    this.buckets = new Array(16);
    this.capacity = this.buckets.length;
    this.loadFactor = 0.75;
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
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (!this.buckets[index]) this.buckets[index] = new LinkedList();
    return this.buckets[index];
  }

  #entry(bucket, key) {
    let currentEntry = bucket.getHead();
    while (currentEntry !== null && currentEntry.value !== null) {
      if (currentEntry.value.key === key) return currentEntry.value;
      else currentEntry = currentEntry.nextNode;
    }
    return null;
  }

  set(key, value) {
    const bucket = this.#bucket(key);
    const entry = this.#entry(bucket, key);
    if (entry) entry.value = value;
    else bucket.append({ key, value });

    if (this.length() > this.capacity * this.loadFactor) {
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
      if (bucket) length += bucket.getSize();
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
        for (let entry of bucket) keys.push(entry.key);
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let entry of bucket) values.push(entry.value);
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        let currentEntry = bucket.getHead();
        while (currentEntry !== null && currentEntry.value !== null) {
          let entry = currentEntry.value;
          entries.push([entry.key, entry.value]);
          currentEntry = currentEntry.nextNode;
        }
      }
    }
    return entries;
  }

  log() {
    console.dir(this.buckets);
  }
}

export default HashMap;
