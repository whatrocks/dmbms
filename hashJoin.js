const {columns} = require('./util');
const {columnNameToIndex} = require('./util.js');

module.exports.hashJoin = hashJoin;

// const {buildScanner} = require('./util.js');
// const {records} = require('./test_data.js');
// const builder = buildScanner([records[0], records[2]]);
// const prober = buildScanner([records[1]]);
// const buildOptions = {colName: 'url'};
// const probeOptions = {colName: 'url'};

// const joiner = hashJoin(builder, prober, buildOptions, probeOptions);
// for(let r of joiner) {
//   console.log(r);
// }

function hashJoin (builder, prober, buildOptions, probeOptions) {
  let hash = [...builder].reduce(
    (hashMap, record) => {
      const colIndex = columnNameToIndex[buildOptions.colName];
      const colValue = record[colIndex];
      const previousValues = hashMap[colValue] || [];
      hashMap[colValue] = [...previousValues, record];

      return hashMap;
    },
    {});

  return { [Symbol.iterator]: probeIterator(prober, probeOptions, hash) }
}


function probeIterator(prober, probeOptions, hash) {
  let probe = prober[Symbol.iterator]();
  let probeRecord;
  let probeColumnValue;
  let numReturnedJoinedRows = 0;

  return () => ({
    next () {

      if (hash[probeColumnValue] && numReturnedJoinedRows >= hash[probeColumnValue].length) {
        probeColumnValue = null;
        numReturnedJoinedRows = 0;
      }

      while (!hash[probeColumnValue]) {
        let probeRecordMetadata = probe.next();

        if (probeRecordMetadata.iteratorFinished()) {
          return { done: true }
        }

        else {
          probeRecord = probeRecordMetadata.value;
          probeColumnValue = probeRecord[columnNameToIndex[probeOptions.colName]];
        }
      }

      let joinedRow = [...hash[probeColumnValue][numReturnedJoinedRows++], ...probeRecord];
      return {value: joinedRow, done: false}
    }
  })
}
