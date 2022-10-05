import { last } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { getDefaultServicesAPIOptions, SERVICES_URL } from '.';

export const uploadFile = async (file, tmpWorkspaceId) => {
  if (!file) {
    return null;
  }

  const url = `${SERVICES_URL}/pvt/adhoc/upload?sessionId=${tmpWorkspaceId}&filename=${file.name}&guid=${uuidv4()}`;
  const uploadData = new FormData();
  uploadData.append('file', file, file.name);

  const req = await window.fetch(url, { ...getDefaultServicesAPIOptions(), method: 'post', body: uploadData });

  return last(req.json());
};

export const getTempWorkspaceURL = (workspaceID) => `${SERVICES_URL}/pvt/adhoc/session/?sessionId=${workspaceID}`;
export const fetchTempWorkspace = async (workspaceID) => {
  const url = getTempWorkspaceURL(workspaceID);

  const response = await window.fetch(url, getDefaultServicesAPIOptions());
  if (response.status === 200) {
    const data = await response.json();

    return data;
  }

  return null;
};

export const fileStatus = (dataset) => {
  let error = -1;
  let warning = -1;
  let valid = null;

  if (dataset.report !== null) {
    ({ valid } = dataset.report);
    error = dataset.report.summary.error;
    warning = dataset.report.summary.warning;
  }

  if (dataset.report === null) {
    return 'normal';
  } else if (valid === true && error === 0 && warning === 0) {
    return 'success dqf';
  } else if (valid === true && error === 0) {
    return 'warning dqf';
  } else if (valid === true) {
    return 'error dqf';
  } else if (valid === false) {
    return 'critical dqf';
  } else {
    return 'normal';
  }
};
