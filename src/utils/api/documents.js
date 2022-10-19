import { SERVICES_URL, getDefaultServicesAPIOptions } from '.';

export const getDocumentURLWithID = (documentID) => `${SERVICES_URL}/pvt/documents/${documentID}`;
export const getDocumentURL = (documentName) => `${SERVICES_URL}/pvt/documents/${documentName}?lookupKey=name`;
export const fetchDocumentByID = async (documentID) => {
  const url = getDocumentURLWithID(documentID);
  const response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();

    return data[0];
  }

  return null;
};

export const fetchDocumentByName = async (documentName) => {
  const url = getDocumentURL(documentName);
  const response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();

    return data[0];
  }

  return null;
};

export const validationReportURL = (documentName, isTestFile = false) =>
  `${SERVICES_URL}/pub/validation/existing?${isTestFile ? 'testfile' : 'name'}=${documentName}`;
export const fetchValidationReport = async (documentName, isTestFile = false) => {
  const url = validationReportURL(documentName, isTestFile);
  const response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();

    return data;
  }

  return null;
};
