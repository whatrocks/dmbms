/* Overall plan:

  ROOT: () => SELECTION(PROJECTION())
  PROJECTION: ([]columns, record) => []columns
  SELECTION: ([(predicates)..], scanner) => record | null
  SCAN: () => record

*/
var TEST_NAME = "https://www.cia.gov/library/readingroom/document/cia-rdp80-00810a002400700005-2";
var {equal} = require('./util.js');
var {makeIterator} = require('./test_data');
var {columns} = require('./util');

var selector = (predicate, scanner) => ({
  next () {
    const row = scanner.next().value;
    if (row === undefined) {return {done: true}}
    if (predicate(row)) {
      return row;
    }
  }
});

const x = selector(equal("url", TEST_NAME), makeIterator()[Symbol.iterator]());
console.log(x.next());
console.log(x.next());
console.log(x.next());
