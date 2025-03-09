class HashSet {
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

  set(key) {
    const bucket = this.#bucket(key);
    const entry = this.#entry(bucket, key);
    if (!entry) bucket.push({ key });

    if (this.length() > this.capacity * this.loadFactor) {
      const entries = this.entries();
      this.buckets = new Array(32);
      this.capacity = this.buckets.length;
      for (let entry of entries) this.set(entry[0]);
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

  entries() {
    let entries = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let entry of bucket) entries.push([entry.key]);
      }
    }
    return entries;
  }

  log() {
    console.log(this.length(), this.buckets);
  }
}