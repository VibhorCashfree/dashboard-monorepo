import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, Grid, Column, Row } from '@cashfree-intl/coherent';

// Helpers
import { formattedDate } from 'helpers/common';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

const DetailsApprovals = ({ data }) => (
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
                {formattedDate(item.date)}
              </Text>
            </Column>
          </React.Fragment>
        ))}
      </Row>
    </Grid>
  </>
);

DetailsApprovals.propTypes = {
  data: PropTypes.array,
};

export default DetailsApprovals;
