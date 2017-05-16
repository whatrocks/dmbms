module.exports.selector = function selector (scanner, predicate) {
  return {
    next () {
      const row = scanner.next().value;
      if (row === undefined) {return {done: true}}
      if (predicate(row)) {
        return row;
      }
      return false;
    }
  }
};
