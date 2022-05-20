export const getDocumentFileName = (document) => (document.url ? document.url.replace(/\/$/, '').split('/').pop() : '');
export const compareDocumentSeverity = (docOne, docTwo) => getDocumentSeverity(docOne) - getDocumentSeverity(docTwo);

const getDocumentSeverity = (document) => {
  const { validation, valid } = document;
  const { error = -1, warning = -1 } = document.report && document.report.summary;

  if (!validation) {
    return 2;
  } else if (valid === true && error === 0 && warning === 0) {
    return 5;
  } else if (valid === true && error === 0) {
    return 4;
  } else if (valid === true) {
    return 3;
  } else if (valid === false) {
    return 1;
  }
  return 2;
};
