module.exports.LinkedList = function LinkedList() {
  this.length = 0;
  this.root = null;
};

LinkedList.prototype.push = function(val) {
  let node = new Node(val);
  if (!this.root) {
    this.root = node;
  }
  else {
    let currentNode = this.root;
    while(currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = node;
  }
  ++this.length;
};

LinkedList.prototype.findNode = function (predicateOrVal) {
  let predicate = typeof predicateOrVal !== "function" ?
    ({val: nodeValue}) => nodeValue === predicateOrVal : predicateOrVal;

  let currentNode = this.root;
  while(currentNode && currentNode.next) {
    if (predicate(currentNode)) return currentNode;
    currentNode = currentNode.next;
  }
  return predicate(currentNode) ? currentNode : null;
};

LinkedList.prototype.remove = function (val) {
  let previousNode = this.findNode(n => n.next && (n.next.val === val));
  if (!previousNode) {
    if (this.root.val === val) {
      this.root = this.root.next;
      --this.length;
    }
    else return false;
  }

  else {
    previousNode.next = previousNode.next.next;
    --this.length;
  }
};

function Node(val) {
  this.val = val;
  this.next = null;
}

// var l = new LinkedList();
// l.push(1);
// l.push(2);
// l.push(3);
// l.findNode(2);
// l.remove(2);
// l.remove(1);
// l.root.val === 3;
