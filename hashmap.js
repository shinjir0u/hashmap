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
    if (this.capacity * this.loadFactor > this.buckets.length) console.log();
    // increase the hashmap and reallocate the items
  }

  get(key) {
    const bucket = this.#bucket(key);
    const entry = this.#entry(bucket, key);
    return entry;
  }

  log() {
    console.log(this.buckets);
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
test.log();
console.log(test.get("lon"));
