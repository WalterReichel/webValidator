import { SERVICES_URL, getDefaultServicesAPIOptions } from '.';
import { compareDocumentSeverity } from '../organisation';

export const fetchOrganisations = async () => {
  const url = `${SERVICES_URL}/pvt/publishers`;
  const response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();
    return data.sort((a, b) =>
      (a.title || '')
        .toString()
        .toLowerCase()
        .localeCompare((b.title || '').toString().toLowerCase())
    );
  }

  return [];
};

export const fetchOrganisationByName = async (name) => {
  const url = `${SERVICES_URL}/pvt/publishers/${name}?lookupKey=name`;
  const response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();
    return data && data.length ? data[0] : null;
  }
};

export const fetchOrganisationDocuments = async (organisationID) => {
  const url = `${SERVICES_URL}/pvt/publishers/${organisationID}/documents`;
  const response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();

    if (data && data.length) {
      return data.sort(compareDocumentSeverity);
    }
  }

  return [];
};
