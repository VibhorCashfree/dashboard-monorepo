// Utils
import AccountId from 'utils/accountId';
// Constants
import { FORMATS } from 'constants/date';

// Helpers
import { formattedDate } from 'helpers/common';

export const getExpiryDate = days => {
  const currentDate = new Date();
  const exipryDate = new Date(
    currentDate.setDate(currentDate.getDate() + days),
  );

  return formattedDate(exipryDate, FORMATS.DATE_WITHOUT_TIME);
};

export const getChannels = channels => {
  const email = channels.includes('email');
  const sms = channels.includes('sms');
  const whatsapp = channels.includes('whatsapp');

  return { email, sms, whatsapp };
};

export const getFormObj = (
  formData,
  expiryDateStr,
  { email, sms, whatsapp },
  mode,
) => {
  const formObj = new FormData();

  if (mode === 'batch') {
    formObj.append('file', formData.file);
    formObj.append('templateName', formData.journeyName);
    formObj.append('linkExpiry', expiryDateStr);
    formObj.append('sendEmail', email);
    formObj.append('sendSMS', sms);
    formObj.append('sendWhatsApp', whatsapp);
    formObj.append('userId', AccountId.get());

    return formObj;
  }

  const payload = {};

  payload.template_name = formData.journeyName;
  payload.link_expiry = expiryDateStr;
  payload.phone = formData.phone;
  if (formData.email) {
    payload.email = formData.email;
  }
  if (formData.name) {
    payload.name = formData.name;
  }
  payload.verification_id = AccountId.get();

  const notification_types = [];

  if (email) {
    notification_types.push('email');
  }
  if (sms) {
    notification_types.push('sms');
  }
  if (whatsapp) {
    notification_types.push('whatsapp');
  }

  payload.notification_types = notification_types;

  return payload;
};
