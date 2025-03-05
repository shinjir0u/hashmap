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

  set(key, value) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let bucket = this.buckets[index];
    if (!bucket) {
      this.buckets[index] = [{ key, value }];
      return;
    }
    for (let entry of bucket) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }
    this.buckets[index].push({ key, value });
    if (this.capacity * this.loadFactor > this.buckets.length) console.log();
    // increase the hashmap and reallocate the items
  }

  get(key) {
    const index = this.#hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let bucket = this.buckets[index];
    if (bucket) {
      for (let entry of bucket) if (entry.key === key) return entry.value;
      return null;
    }
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
