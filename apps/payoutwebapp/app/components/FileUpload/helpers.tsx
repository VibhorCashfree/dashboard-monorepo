import React from 'react';
import { Image } from '@cashfree-intl/coherent';

// Constants
import { FILE_TYPE } from 'constants/common';
import { TYPE_BY_MIME } from './constants';

// Images
import csvIcon from 'images/mimes/csv.svg';
import xlsIcon from 'images/mimes/xls.svg';
import pdfIcon from 'images/mimes/pdf.svg';

const ICON_BY_TYPE = {
  [FILE_TYPE.CSV]: <Image inline src={csvIcon} className="mr-2" />,
  [FILE_TYPE.XLS]: <Image inline src={xlsIcon} className="mr-2" />,
  [FILE_TYPE.PDF]: <Image inline src={pdfIcon} className="mr-2" />,
};

export const getFileIcon = (type: keyof typeof TYPE_BY_MIME) =>
  ICON_BY_TYPE[TYPE_BY_MIME[type]];
