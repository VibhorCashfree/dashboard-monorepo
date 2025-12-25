import React from 'react';
import moment from 'moment';
import { Grid, Row, Column, Image, Text } from '@cashfree-intl/coherent';

// Constants
import { FORMATS } from 'constants/date';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Types
import type { Props } from './types';

const DetailsApprovals = ({ data }: Props) => (
  <>
    <Text variant="h16" strong className="my-3">
      Approvals
    </Text>

    <Grid>
      <Row>
        {data.map((item, index) => (
          <React.Fragment key={item.name}>
            <Column width={3}>
              <Text variant="p14" color="bodyLight">
                Approver {index + 1}
              </Text>
            </Column>
            <Column width={4} className="mb-2">
              {item.name}
              <Image
                inline
                className="ml-1"
                src={getAlertIcon(item.type, 'sm')}
              />
              <br />
              <Text variant="p14" color="bodyLight">
                {moment(item.date).format(FORMATS.TIMESTAMP)}
              </Text>
            </Column>
          </React.Fragment>
        ))}
      </Row>
    </Grid>
  </>
);

export default DetailsApprovals;
