import _keyBy from 'lodash/keyBy';
import _mapValues from 'lodash/mapValues';

// Simple pure function to get query string from object
export const getQueryString = (obj: Record<string, any>) =>
  Object.keys(obj).reduce((acc, key) => {
    let str = acc;
    const value = obj[key];

    if (Array.isArray(value)) {
      if (value.length) {
        str += `${value
          .map((v) => `${key}=${encodeURIComponent(v)}&`)
          .join('')}`;
      }
    } else if (value) {
      str += `${key}=${encodeURIComponent(value)}&`;
    }

    return str;
  }, '');

export const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    // console.log('Error copying to clipboard');
  }
};

export const getSizeText = (size: number) => {
  if (size) {
    const k = 1024;
    const suffix = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(k));

    return `${parseFloat((size / k ** i).toFixed(1))} ${suffix[i]}`;
  }

  return '0 Byte';
};

export const formatNumber = (num: number) => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }

  return num;
};

export const decodeFile = (str = '') => {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString();
  } else {
    return atob(str);
  }
};

export const arrayToObject = (arr: any[], idKey: string, valueKey: string) =>
  _mapValues(_keyBy(arr, idKey), valueKey);

export const joinWithAnd = (arr: string[]) => {
  const returnArr = [...arr];

  if (returnArr.length > 1) {
    const last = returnArr.pop();
    return `${returnArr.join(', ')} and ${last}`;
  }

  return returnArr.join(', ');
};

export const getFileName = (fileName: string, id: string, status: string) => {
  const idx = fileName.lastIndexOf('.');
  const prefix = fileName.slice(0, idx);
  const suffix = id;
  const extension = fileName.slice(idx);

  if (status === 'PROCESSING') {
    return `${prefix}(${suffix})_pending${extension}`;
  }

  return `${prefix}(${suffix})${extension}`;
};

export const downloadText = (fileName: string, text: string) => {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
  );
  element.setAttribute('download', fileName);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const triggerDownload = (
  dataObj: { type: string; payload: string },
  name = '',
) => {
  if (!window.URL || !window.URL.createObjectURL) {
    return;
  }

  const link = document.createElement('a');
  const zipFile = window.URL.createObjectURL(
    new Blob([dataObj.payload], { type: 'octet/stream' }),
  );

  link.href = dataObj.type === 'URL' ? dataObj.payload : zipFile;

  link.setAttribute('download', name);
  link.setAttribute('target', '_blank');

  document.body.appendChild(link);

  link.click();
  link.remove();
};

export const showDownload = (status: string) => status !== 'APPROVED';
