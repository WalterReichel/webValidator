import { SERVICES_URL, getDefaultServicesAPIOptions } from '.';

export const getDocumentURL = (value, lookupKey = 'name') =>
  `${SERVICES_URL}/pvt/documents/${value}?lookupKey=${lookupKey}`;
export const fetchDocumentByID = async (documentID) => {
  const url = getDocumentURL(documentID, 'id');
  const response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();

    return { status: 200, data: data[0] };
  }
  if (response.status === 404) {
    const responseByName = await fetchDocumentByID(documentID);

    return responseByName;
  }

  return { status: response.status, data: null };
};

export const fetchDocumentByName = async (documentName) => {
  const url = getDocumentURL(documentName);
  const response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();

    return { status: 200, data: data[0] };
  }
  if (response.status === 404) {
    const responseByID = await fetchDocumentByID(documentName);

    return responseByID;
  }

  return { status: response.status, data: null };
};

export const validationReportURL = (value, isTestFile = false, lookupKey = 'name') =>
  `${SERVICES_URL}/pub/validation/existing?${isTestFile ? 'testfile' : lookupKey}=${value}`;
export const fetchValidationReport = async (
  documentName,
  isTestFile = false,
  lookupKey = 'name',
  tryAlternateLookupKey = true
) => {
  let url = validationReportURL(documentName, isTestFile, lookupKey);
  let response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();

    return data;
  }
  if (response.status === 404 && !isTestFile && tryAlternateLookupKey) {
    // switch lookup key
    return await fetchValidationReport(documentName, isTestFile, lookupKey === 'name' ? 'id' : 'name', false);
  }

  return null;
};
