/* Overall plan:

  ROOT: () => SELECTION(PROJECTION())
  PROJECTION: ([]columns, record) => []columns
  SELECTION: ([(predicates)..], record) => record | null
  SCAN: () => record

*/
var recordIndex = 0;
var {makeIterator} = require('./test_data');
var {columns} = require('./test_data');

// records.forEach(record => {
//   // record.applyProjection(userProjection).applySelection(userSelection);
// });

var scanner = makeIterator()[Symbol.iterator]();

console.log(scanner.next());
console.log(scanner.next());
console.log(scanner.next());
