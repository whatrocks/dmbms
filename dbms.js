/* Overall plan:

  ROOT: () => SELECTION(PROJECTION())
  PROJECTION: ([]columns, record) => []columns
  SELECTION: ([(predicates)..], scanner) => record | null
  SCAN: () => record

*/
var TEST_NAME = "https://www.cia.gov/library/readingroom/document/cia-rdp80-00810a002400700005-2";
var {equal} = require('./util.js');
var {makeIterator} = require('./test_data');
var {rows} = require('./test_data');
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

function hasher(table, property) {
  let idx = columns.indexOf(property);
  return table.reduce((hashMap, record) => {
    let colValue = record[idx];
    let previousValues = hashMap[colValue] || [];
    hashMap[colValue] = [...previousValues, record];
    return hashMap;

    return hashMap;
  } ,{})
}

// console.log(hasher(rows, "url"))

function joinRecords (record1, record2, columnJoinedOn) {
  let idx = columns.indexOf(columnJoinedOn);
  const record1WithoutTheColumn = record1.slice(0, idx).concat(record1.slice(idx+1));
  const record2WithoutTheColumn = record1.slice(0, idx).concat(record1.slice(idx+1));
  return [columnJoinedOn, record1WithoutTheColumn, record2WithoutTheColumn];
}

function joiner(hashMap, property, scanner, theta=x=>true) {
  const record = scanner.next().value;
  let idx = columns.indexOf(property);
  const colValue = record[idx];
  const hashedRecords = hashMap[colValue];
  const numberOfReturnedJoinedRows = 0;
  return function next () {
    if (numberOfReturnedJoinedRows >= hashedRecords.length) {
      return {done: true}
    }
    return joinRecords(record, hashedRecords[numberOfReturnedJoinedRows++]);
  }
}

// const x = selector(equal("url", TEST_NAME), makeIterator()[Symbol.iterator]());
// for (let record of makeIterator()) {
//   console.log(record);
// }
// console.log(x.next());
// console.log(x.next());
// console.log(x.next());
