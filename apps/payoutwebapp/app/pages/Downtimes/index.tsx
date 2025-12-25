import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, Text, Space, Paper, DataTable } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _capitalize from 'lodash/capitalize';
import _size from 'lodash/size';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';

// Actions
import fetchDowntimesAction from 'redux/actions/fetchDowntimes';

// Constants
import { REGION } from 'constants/common';
import { MENU, LABEL_BY_MENU } from 'constants/menuItems';
import EVENTS from 'constants/events';
import { filtersConfig, labelByStatus, STATUS } from './constants';

// Utils
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import Region from 'utils/region';
import FundSourcesUtil from 'utils/fundSources';

// Images
import successTickImg from 'images/success-tick.svg';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { Divider, FilterRowContainer } from 'styled/common';

// Types
import type { DowntimesProps } from './types';

const Downtimes: React.FC<DowntimesProps> = ({
  fundSources,
  downtimes,
  fetchDowntimes,
}) => {
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({
    UNSCHEDULED: true,
  });

  useEffect(() => {
    if (
      !(
        Region.get() === REGION.IN &&
        _size(FundSourcesUtil.getActives(fundSources))
      )
    ) {
      return;
    }

    const [key] = Object.keys(filters);

    const queryObj = { type: _capitalize(key) };

    fetchDowntimes(queryObj);
  }, [filters]);

  const handleFiltersChange = (filters: { [key: string]: boolean }) => {
    setFilters(filters);

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.DOWNTIMES],
      filters,
    });
  };

  const handleRemove = (key: string) => {
    setFilters(_omit(filters, key));

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.DOWNTIMES],
      type: 'individual',
    });
  };

  const activeCount = downtimes.reduce((acc, row) => {
    if (row.incidentType === STATUS.UNSCHEDULED) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const upcomingCount = downtimes.reduce((acc, row) => {
    if (row.incidentType === STATUS.SCHEDULED) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return (
    <>
      <PageHeader>{LABEL_BY_MENU[MENU.DOWNTIMES]}</PageHeader>
      <MetaTags title={LABEL_BY_MENU[MENU.DOWNTIMES]} />

      <Space gap={3} className="mb-4">
        <Paper style={{ width: 450 }}>
          <Text color="bodyLight">Active Downtimes</Text>
          <Divider />
          <Text variant="h28" className="mb-1">
            {activeCount}
          </Text>
          {activeCount === 0 && (
            <Text variant="b12" strong>
              <Image
                inline
                src={successTickImg}
                style={{ verticalAlign: 'sub' }}
              />{' '}
              All Payment Modes are working fine.
            </Text>
          )}
        </Paper>
        <Paper style={{ width: 450 }}>
          <Text color="bodyLight">Upcoming Scheduled Downtimes</Text>
          <Divider />
          <Text variant="h28" className="mb-1">
            {upcomingCount}
          </Text>
          {upcomingCount === 0 && (
            <Text variant="b12" strong>
              No upcoming scheduled downtimes.
            </Text>
          )}
        </Paper>
      </Space>

      <FilterRowContainer>
        <div>
          <FilterPopover
            config={filtersConfig}
            labelByStatus={labelByStatus}
            value={filters}
            onChange={handleFiltersChange}
            specialCase="DOWNTIMES"
          />
          <FilterChips
            chips={getChips({ filters }, [], labelByStatus)}
            onRemove={handleRemove}
          />
        </div>
      </FilterRowContainer>

      <DataTable columns={getFormattedRowData()} records={downtimes} />
    </>
  );
};

const mapStateToProps = ({
  fundSources,
  downtimes,
}: {
  fundSources: AnyObject[];
  downtimes: AnyObject[];
}) => ({
  fundSources,
  downtimes,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchDowntimes: (obj: { type: string }) =>
    dispatch(fetchDowntimesAction(obj)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Downtimes);
