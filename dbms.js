/* Overall plan:

  ROOT: () => SELECTION(PROJECTION())
  PROJECTION: ([]columns, record) => []columns
  SELECTION: ([(columnName, operator, columnValue)], record) => record | null
  SCAN: () => record

*/

var {COLUMNS} = require('./test_data');

console.log(COLUMNS);
