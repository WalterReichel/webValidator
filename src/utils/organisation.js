export const getDocumentFileName = (document) => (document.url ? document.url.replace(/\/$/, '').split('/').pop() : '');
