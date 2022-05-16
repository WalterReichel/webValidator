import { SERVICES_URL, getDefaultServicesAPIOptions } from '.';

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
