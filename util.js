Object.prototype.iteratorFinished = function () {return Object.keys(this).length === 1 && this.done === true}

const columnNameToIndex = {
  "title": 0,
  "url": 1,
  "filefilefilefilefilefile": 2,
  "document_type": 3,
  "collection": 4,
  "document_number": 5,
  "release_decision": 6,
  "document_page_count": 7,
  "document_creation_date": 8,
  "document_publication_date": 9,
  "sequence_number": 10,
  "case_number": 11,
  "publication_date": 12,
  "content_type": 13,
  "more1_title": 14,
  "more1_link": 15,
  "more2_title": 16,
  "more2_link": 17,
  "more3_title": 18,
  "more3_link": 19,
  "more4_title": 20,
  "more4_link": 21,
  "more5_title": 22,
  "more5_link": 23
};
module.exports.columnNameToIndex = columnNameToIndex;

const {records} = require('./test_data.js');

function buildScanner(records) {
  let idx = 0;
  return {
    [Symbol.iterator] () {
      return {
        next () { return idx < records.length ? {value: records[idx++], done: false} : {done: true} }
      }
    }
  }
}
module.exports.buildScanner = buildScanner;


module.exports.equal = function(colName, value) {
  return (row) => {
    return row[columnNameToIndex[colName]] === value;
  }
}

// for(let record of buildScanner(records)) {console.log(record[3])}
