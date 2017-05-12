/* Overall plan:

  ROOT: () => SELECTION(PROJECTION())
  PROJECTION: ([]columns, record) => []columns
  SELECTION: ([(predicates)..], buildScanner) => record | null
  SCAN: () => record

*/
const TEST_NAME = "https://www.cia.gov/library/readingroom/document/cia-rdp80-00810a002400700005-2";
const {equal} = require('./util.js');
const {buildScanner} = require('./util.js');
const {columnNameToIndex} = require('./util.js');
const {hashJoin} = require('./hashJoin.js');

const selector = (predicate, scanner) => ({
  next () {
    const row = scanner.next().value;
    if (row === undefined) {return {done: true}}
    if (predicate(row)) {
      return row;
    }
  }
});

// const x = selector(equal("url", TEST_NAME), buildScanner()[Symbol.iterator]());
// for (let record of buildScanner()) {
//   console.log(record);
// }
// console.log(x.next());
// console.log(x.next());
// console.log(x.next());
