import _capitalize from 'lodash/capitalize';

// Images
import smWarningIcon from 'images/alerts/small/warning.svg';
import smSuccessIcon from 'images/alerts/small/success.svg';
import smDangerIcon from 'images/alerts/small/danger.svg';
import smInfoIcon from 'images/alerts/small/info.svg';
import mdWarningIcon from 'images/alerts/medium/warning.svg';
import mdSuccessIcon from 'images/alerts/medium/success.svg';
import mdDangerIcon from 'images/alerts/medium/danger.svg';
import mdInfoIcon from 'images/alerts/medium/info.svg';
import lgWarningIcon from 'images/alerts/large/warning.svg';
import lgSuccessIcon from 'images/alerts/large/success.svg';
import lgDangerIcon from 'images/alerts/large/danger.svg';
import lgInfoIcon from 'images/alerts/large/info.svg';
import xlgWarningIcon from 'images/alerts/xlarge/warning.svg';
import xlgSuccessIcon from 'images/alerts/xlarge/success.svg';
import xlgDangerIcon from 'images/alerts/xlarge/danger.svg';
import xlgInfoIcon from 'images/alerts/xlarge/info.svg';

const map: AnyObject = {
  smWarningIcon,
  smSuccessIcon,
  smDangerIcon,
  smInfoIcon,
  mdWarningIcon,
  mdSuccessIcon,
  mdDangerIcon,
  mdInfoIcon,
  lgWarningIcon,
  lgSuccessIcon,
  lgDangerIcon,
  lgInfoIcon,
  xlgWarningIcon,
  xlgSuccessIcon,
  xlgDangerIcon,
  xlgInfoIcon,
};

const getAlertIcon = (type: string, size = 'xlg') =>
  map[`${size}${_capitalize(type)}Icon`];

export default getAlertIcon;
