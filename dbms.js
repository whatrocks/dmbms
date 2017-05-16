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
const {records} = require('./test_data.js');
const {selector} = require('./selector.js');

const x = selector(buildScanner(records)[Symbol.iterator](), equal("url", TEST_NAME));
console.log(x.next());
console.log(x.next());
console.log(x.next());
