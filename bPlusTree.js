const {LinkedList} = require('./linkedList.js');

module.exports.BPlusTree = function BPlusTree(order) {
  this.order = order;
  this.root = new Leaf();
};

BPlusTree.prototype.find = function BPlusFind(val) {
  return this.root.find(val);
};

function Leaf() {
  this.parent = null;
  this.data = new LinkedList();
}

Leaf.prototype.insert = function leafInsert() {
  // TODO: implement
};

Leaf.prototype.find = function leafFind(val) {
  return this.data.findNode(val);
};

function InternalNode(child) {
  this.child = child;
  this.parent = null;
}

InternalNode.prototype.insert = function leafInsert() {
  // TODO: implement
};

InternalNode.prototype.find = function leafFind(val) {
  // TODO: implement
};
