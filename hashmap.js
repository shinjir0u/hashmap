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
    if (!this.buckets[index]) this.buckets[index] = [];
    return this.buckets[index];
  }

  #entry(bucket, key) {
    for (let entry of bucket) {
      if (entry.key === key) return entry;
    }
    return null;
  }

  set(key, value) {
    const bucket = this.#bucket(key);
    const entry = this.#entry(bucket, key);
    if (entry) entry.value = value;
    else bucket.push({ key, value });

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
      const entryIndex = bucket.findIndex((entry) => entry.key === key);
      bucket.splice(entry, 1);
    }
    return !!entry;
  }

  length() {
    let length = 0;
    for (let bucket of this.buckets) {
      if (bucket) length += bucket.length;
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
        for (let entry of bucket) entries.push([entry.key, entry.value]);
      }
    }
    return entries;
  }

  log() {
    console.log(this.length(), this.buckets);
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("me", "black");
