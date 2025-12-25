import React, { useEffect, useState } from 'react';
import CommsPrefModal from './CommsPrefModal';
import { Conditional } from '@cashfree-intl/coherent';

import { getUserNotificationDetails } from 'services/settings';

const AddRecipientModal = ({
  loading,
  type,
  data,
  onSubmit,
  onClose,
  activeNotificationTab,
  selectedAccountId,
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [email, setEmail] = useState('');
  const [appendedData, setAppendedData] = useState([]);

  const onEmailSubmit = async emailId => {
    setEmail(emailId.email);

    const payload = {
      channelValue: emailId.email,
      notificationTabGroup: activeNotificationTab,
    };

    const response = await getUserNotificationDetails(
      payload,
      selectedAccountId,
    );
    if ('error' in response) {
      return;
    }

    setAppendedData(
      data.map(datum => {
        const findRelatedItem = response?.data?.find(notification => {
          return (
            notification?.notificationSubscription?.notificationTypeId ===
            datum.id
          );
        });
        return {
          ...datum,
          id: datum.id,
          title: datum.metadata.displayName,
          description: datum.metadata.description,
          isActive: findRelatedItem?.active || false,
          email: emailId.email,
        };
      }),
    );

    setActiveStep(2);
  };

  const onBack = () => {
    setActiveStep(1);
  };

  const handlePreferenceChange = preferences => {
    setAppendedData(prevData =>
      prevData.map(item => {
        const updatedPreference = preferences.id === item.id;
        return updatedPreference
          ? { ...item, isActive: !!preferences.isActive }
          : item;
      }),
    );
  };

  const handleSubmit = () => {
    onSubmit(appendedData);
  };

  return (
    <div>
      <CommsPrefModal
        type={type}
        loading={loading}
        onClose={onClose}
        activeStep={activeStep}
      >
        <Conditional if={activeStep === 1}>
          <CommsPrefModal.Step1
            type={type}
            initialAccount={{ email }}
            loading={loading}
            onCancel={onClose}
            onSubmit={onEmailSubmit}
          />
        </Conditional>
        <Conditional if={activeStep === 2}>
          <CommsPrefModal.Step2
            loading={loading}
            email={email}
            showEmailBanner
            mode="Set"
            heading={'Secure Id'}
            visibleChannels={['EMAIL']}
            data={appendedData}
            onChange={handlePreferenceChange}
            onBack={onBack}
            onSubmit={handleSubmit}
          />
        </Conditional>
      </CommsPrefModal>
    </div>
  );
};

export default AddRecipientModal;
