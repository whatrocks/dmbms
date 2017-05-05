const columns = [
  "title",
  "url",
  "filefilefilefilefilefile",
  "document_type",
  "collection",
  "document_number",
  "release_decision",
  "document_page_count",
  "document_creation_date",
  "document_publication_date",
  "sequence_number",
  "case_number",
  "publication_date",
  "content_type",
  "more1_title",
  "more1_link",
  "more2_title",
  "more2_link",
  "more3_title",
  "more3_link",
  "more4_title",
  "more4_link",
  "more5_title",
  "more5_link"
];

module.exports.columns = columns;

module.exports.equal = function(colName, value) {
  return (row) => {
    return row[columns.indexOf(colName)] === value;
  }
}
