import React from 'react';
import PropTypes from 'prop-types';
import { Space, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import ContentLoader from './ContentLoader';
import EmailChipGroup from 'components/EmailChipGroup';
import { StyledEmailTabContainer } from '../styled';

const EmailChannelTab = ({
  loading,
  data,
  onDeleteEmail,
  onResendApprovalEmail,
}) => {
  const emailList = data?.map(item => ({
    id: item.id,
    notificationSubscriptionId: item.notificationSubscriptionId,
    notificationTypeId: _get(
      item,
      'notificationSubscription.notificationTypeId',
      0,
    ),
    email: item.channelValue,
    verified: item.status === 'APPROVED',
  }));

  return (
    <StyledEmailTabContainer className="mt-2">
      <ContentLoader loading={loading}>
        {emailList?.length ? (
          <EmailChipGroup
            loading={loading}
            data={emailList}
            onDelete={onDeleteEmail}
            onResendApprovalEmail={onResendApprovalEmail}
          />
        ) : (
          <Space
            fullWidth
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="w-100"
          >
            No preferences created yet.
            <Text color="bodyLight" className="my-1">
              Use &lsquo;Manage Notifications&rsquo; to configure new preference
              on preferred channel.
            </Text>
          </Space>
        )}
      </ContentLoader>
    </StyledEmailTabContainer>
  );
};

EmailChannelTab.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  onDeleteEmail: PropTypes.func.isRequired,
  onResendApprovalEmail: PropTypes.func.isRequired,
};

export default EmailChannelTab;
