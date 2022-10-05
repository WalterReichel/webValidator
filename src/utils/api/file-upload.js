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
