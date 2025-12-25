import React from 'react';
import {
  Space,
  Text,
  Paper,
  Divider,
  Conditional,
  Popup,
  Icon,
  Loader,
} from '@cashfree-intl/coherent';

// Styled
import { StyledVerticalDivider } from '../styled';

// Types
import type { SubCardInsights, InsightsCardProps } from '../types';

const InsightsCard: React.FC<InsightsCardProps> = ({
  title,
  infoDescription,
  loading,
  childElements,
}) => (
  <Paper className="px-0 py-2">
    <Space direction="column">
      <Space gap={1} className="px-3 py-0" alignItems="center">
        <Text color="bodyLight">{title}</Text>
        <Conditional if={infoDescription}>
          <Popup
            position="top center"
            content={<Text>{infoDescription}</Text>}
            trigger={
              <Space>
                <Icon name="info-small" />
              </Space>
            }
          />
        </Conditional>
      </Space>
      <Divider className="p-0" />
      <Space className="px-1">
        {childElements.map(
          (subCardInsights: SubCardInsights, index: number) => (
            <Space key={index}>
              <Space direction="column" gap={1} className="px-2">
                {subCardInsights.header}
                <Conditional if={loading}>
                  <Space className="py-3">
                    <Loader active inline />
                  </Space>
                </Conditional>
                <Conditional if={!loading}>
                  <Text variant="h28">{subCardInsights.body}</Text>
                  <Text color="bodyLight">{subCardInsights.footer}</Text>
                </Conditional>
              </Space>
              <Conditional if={index !== childElements.length - 1}>
                <StyledVerticalDivider />
              </Conditional>
            </Space>
          ),
        )}
      </Space>
    </Space>
  </Paper>
);

export default InsightsCard;
