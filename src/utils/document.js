export const getDocumentFileName = (document) => (document.url ? document.url.replace(/\/$/, '').split('/').pop() : '');
export const compareDocumentSeverity = (docOne, docTwo) => getDocumentSeverity(docOne) - getDocumentSeverity(docTwo);

export const hasProperLink = (document) =>
  document.validation_created === null ||
  document.download_error !== null ||
  document.downloaded === null ||
  document.hash === '';

export const getDocumentDownloadStatus = (document) => {
  if (document.validation_created === null && document.downloaded !== null) {
    return 'Pending Validation';
  }
  const downloadErrorString = getDownloadErrorString(document);
  if (document.validation_created === null && document.downloaded === null) {
    if (downloadErrorString === '0') {
      return 'Failed Download (Connection Error)';
    }
    if (downloadErrorString === '1') {
      return 'Failed Download (SSL Issue)';
    }
    if (downloadErrorString === '2') {
      return 'Failed Download (Character Encoding Issue)';
    }
    if (downloadErrorString === '3') {
      return 'Failed Download (Invalid URL)';
    }
    if (
      ['400', '401', '403', '404', '500', '501', '502', '503', '504', '505', '506', '507', '509', '510'].includes(
        downloadErrorString
      )
    ) {
      return `Failed Download (HTTP Error ${document.download_error})`;
    }
    if (
      ![
        '0',
        '1',
        '2',
        '3',
        '400',
        '401',
        '403',
        '404',
        '500',
        '501',
        '502',
        '503',
        '504',
        '505',
        '506',
        '507',
        '509',
        '510',
      ].includes(downloadErrorString)
    ) {
      return 'Pending Download';
    }
  }
};

export const getDocumentValidationStatus = (document) => {
  const { report } = document;
  const { valid } = report || { valid: null };
  const { error, warning } = report ? report.summary : { error: -1, warning: -1 };

  if (document.report === null) {
    return { value: 'normal', caption: 'N/A' };
  }
  if (valid === true && error === 0 && warning === 0) {
    return { value: 'success', caption: 'Success' };
  }
  if (valid === true && error === 0) {
    return { value: 'warning', caption: 'Warning' };
  }
  if (valid === true) {
    return { value: 'error', caption: 'Error' };
  }
  if (valid === false) {
    return { value: 'critical', caption: 'Critical' };
  }

  return { value: 'normal', caption: 'N/A' };
};

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

const getDownloadErrorString = (document) => (document.download_error ? document.download_error.toString() : '');
