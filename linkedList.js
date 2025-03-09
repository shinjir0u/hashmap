import Node from "./node.js";

class LinkedList {
  head;

  constructor() {
    this.head = new Node();
  }

  append(value) {
    const valueNode = new Node(value);
    if (!this.head.value) this.head = valueNode;
    else {
      let temp = this.head;
      while (temp.nextNode) temp = temp.nextNode;
      temp.nextNode = valueNode;
    }
  }

  prepand(value) {
    const valueNode = new Node(value);
    if (!this.head.value) this.head = valueNode;
    else {
      valueNode.nextNode = this.head;
      this.head = valueNode;
    }
  }

  getSize() {
    let temp = this.head;
    let count = 0;
    while (temp) {
      count += 1;
      temp = temp.nextNode;
    }
    return count;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let temp = this.head;
    let tail;
    while (temp) {
      tail = temp;
      temp = temp.nextNode;
    }
    return tail;
  }

  at(index) {
    let traversedNodeCount = 0;
    let temp = this.head;
    while (traversedNodeCount < index) {
      traversedNodeCount += 1;
      temp = temp.nextNode;
    }
    return traversedNodeCount === index ? temp : new Error("Invalid Index");
  }

  pop() {
    if (this.getSize() === 1) {
        this.head = new Node();
        return;
    }
    let temp = this.head;
    let previousNode;
    while (temp !== this.getTail()) {
      previousNode = temp;
      temp = temp.nextNode;
    }
    previousNode.nextNode = null;
  }

  contains(value) {
    let temp = this.head;
    while (temp) {
      if (temp.value === value) return true;
      temp = temp.nextNode;
    }
    return false;
  }

  find(value) {
    let temp = this.head;
    let traversedNodeCount = 0;
    let valueFound = false;
    while (temp) {
      if (temp.value === value) {
        valueFound = true;
        break;
      }
      traversedNodeCount += 1;
      temp = temp.nextNode;
    }
    return valueFound ? traversedNodeCount : null;
  }

  toString() {
    let temp = this.head;
    let resultString = "";
    while (temp) {
      resultString += `( ${temp.value} ) -> `;
      temp = temp.nextNode;
    }
    resultString += null;
    return resultString;
  }

  insertAt(value, index) {
    const valueNodeToInsert = new Node(value, this.at(index));
    if (index === 0) this.prepand(value);
    else {
      const previousNode = this.at(index - 1);
      previousNode.nextNode = valueNodeToInsert;
    }
  }

  removeAt(index) {
    if (index === 0) this.pop();
    else {
      const previousNode = this.at(index - 1);
      previousNode.nextNode = previousNode.nextNode.nextNode;
    }
  }
}

export default LinkedList;