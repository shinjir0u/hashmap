import Node from "./node.js";

class LinkedList {
  #head;

  constructor(array = []) {
    this.array = array;
    this.#head = this.buildLinkList(this.array);
  }

  buildLinkList(array) {
    if (array.length === 0) return null;
    let head = new Node(array[0]);
    head.nextNode = this.buildLinkList(array.slice(1));
    return head;
  }

  append(value, node = this.#head) {
    if (this.#head === null) {
      this.#head = new Node(value);
      return;
    }
    if (node === null) return new Node(value);
    node.nextNode = this.append(value, node.nextNode);
    return node;
  }

  prepend(value) {
    if (this.#head === null) {
      this.#head = new Node(value);
      return;
    }
    const node = new Node(value);
    [node.nextNode, this.#head] = [this.#head, node];
  }

  size(node = this.#head) {
    if (node === null) return 0;
    return 1 + this.size(node.nextNode);
  }

  head() {
    return this.#head;
  }

  tail(node = this.#head) {
    if (node.nextNode === null) return node;
    return this.tail(node.nextNode);
  }

  at(index, node = this.#head, currentIndex = 0) {
    if (index === currentIndex) return node;
    if (node === null) return new Error("Invalid Index");
    return this.at(index, node.nextNode, currentIndex + 1);
  }

  pop(node = this.#head) {
    if (node === null || node.nextNode === null) return null;
    node.nextNode = this.pop(node.nextNode);
    return node;
  }

  contains(value, node = this.#head) {
    if (node === null) return false;
    if (node.value === value) return true;
    return this.contains(value, node.nextNode);
  }

  find(value) {
    const index = this.#findHelper(value, this.#head);
    return Number.isInteger(index) ? index : null;
  }

  #findHelper(value, node) {
    if (node === null) return NaN;
    if (node === value) return 0;
    return 1 + this.#findHelper(value, node.nextNode);
  }

  toString(node = this.#head) {
    if (node === null) return node;
    return `( ${node.value} ) -> ` + this.toString(node.nextNode);
  }

  insertAt(value, index) {
    const valueNodeToInsert = new Node(value);
    if (index === 0) this.prepend(value);
    else {
      const previousNode = this.at(index - 1);
      [valueNodeToInsert.nextNode, previousNode.nextNode] = [
        previousNode.nextNode,
        valueNodeToInsert,
      ];
    }
  }

  removeAt(index) {
    if (index === 0) this.#head = this.#head.nextNode;
    else {
      const previousNode = this.at(index - 1);
      previousNode.nextNode = previousNode.nextNode.nextNode;
    }
  }
}

export default LinkedList;
