/* Overall plan:

  ROOT: () => SELECTION(PROJECTION())
  PROJECTION: ([]columns, record) => []columns
  SELECTION: ([(predicates)..], scanner) => record | null
  SCAN: () => record

*/
const TEST_NAME = "https://www.cia.gov/library/readingroom/document/cia-rdp80-00810a002400700005-2";
const {equal} = require('./util.js');
const {makeIterator} = require('./test_data');
const {rows} = require('./test_data');
const {columns} = require('./util');

const selector = (predicate, scanner) => ({
  next () {
    const row = scanner.next().value;
    if (row === undefined) {return {done: true}}
    if (predicate(row)) {
      return row;
    }
  }
});


/* TODO: The structure of hasher/joiner will change. It will just be:
    HashJoin
      |
      |------> FileScan1 (build hash)
          |
          |---------> FileScan2 (return 1 record of FileScan1 on KEY joined with FileScan2 record)

  So, root will call HashJoin.next():
    - The `init` will be FileScan1 building the hash and beginning FileScan2, returning one record at a time.
    - `next` will then continue to return one joined record a time until FileScan2 is exhausted.
*/

function hasher(table, property, theta=(record1, record2)=>true) {
  const colIdx = columns[property];
  return table.reduce(
    (hashMap, record) => {
      let colValue = record[colIdx];
      let previousValues = hashMap[colValue] || [];
      if (theta(colValue, record)) {
        hashMap[colValue] = [...previousValues, record];
      }

      return hashMap;
    },
    {}
  );

  return hashMap;
}

// console.log(hasher(rows, "url"))

function joiner(scanner, hashMap, property) {
  const record = scanner.next().value;

  const colIdx = columns[property];
  const colValue = record[colIdx];

  const hashedRecords = hashMap[colValue];
  const numberOfReturnedJoinedRows = 0;
  return {
    next () {
      if (numberOfReturnedJoinedRows >= hashedRecords.length) {
        return {done: true}
      }
      return [ record, hashedRecords[numberOfReturnedJoinedRows++] ];
    }
  }
}

// const x = selector(equal("url", TEST_NAME), makeIterator()[Symbol.iterator]());
// for (let record of makeIterator()) {
//   console.log(record);
// }
// console.log(x.next());
// console.log(x.next());
// console.log(x.next());
