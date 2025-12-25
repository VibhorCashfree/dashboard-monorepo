import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, Paper } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import _get from 'lodash/get';

// Constants
import { options, COLUMN_ID } from './constants';
import EVENTS from 'constants/analytics';

// Helpers
import { hasMounted, getQuery } from 'helpers/common';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Components
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import StatusStats from 'components/StatusStats';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import BatchInfo from 'components/BatchInfo';
import PaginatedTable from 'components/PaginatedTable';

// Services
import {
  getBatchEntries,
  getBatchEntriesCount,
  getBatchStats,
} from 'services/PAN';

// Providers
import { BatchDetailsContext } from 'providers/BatchDetailsProvider';

// Styled
import {
  BackButtonWrapper,
  Divider,
  BatchDetailsFilterWrapper,
} from 'styled/common';

// Utils
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import { getFilterMap } from './utils';
import Analytics from 'utils/analytics';

const BatchPanDetails = () => {
  const { state, dispatch } = useContext(BatchDetailsContext);

  const { limit, currentPage, data, filters, searchBy } = state;

  const [statsData, setStatsData] = useState({});

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();
  const location = useLocation();

  const batchRowDetails = _get(location.state, 'batchRowDetails', {});

  const { labelByStatus, filtersConfig } = getFilterMap();

  useEffect(() => {
    (async function fetchData() {
      if (!Object.keys(batchRowDetails).length) {
        return;
      }

      const response = await getBatchStats(batchRowDetails.id);

      setStatsData(response);
    })();
  }, []);

  useEffect(() => {
    (async function fetchData() {
      hasMounted(hasMount, data);

      const isFirstPage = currentPage === 1;

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      const queryObj = getQuery(filters, searchBy, limit);

      queryObj[cursorKey] = cursorValue;

      const dataPromise = getBatchEntries(batchRowDetails.id, queryObj);
      const countPromise =
        isFirstPage && getBatchEntriesCount(batchRowDetails.id, queryObj);

      const response = await dataPromise;

      dispatch({
        type: 'SET_DATA',
        payload: response,
      });

      const countResponse = await countPromise;

      if (isFirstPage) {
        dispatch({
          type: 'SET_DATA',
          payload: countResponse,
        });
      }
    })();
  }, [currentPage, limit, filters]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = [...COLUMN_ID];

  const onPageChange = type =>
    dispatch({ type: 'SET_CURRENT_PAGE', payload: type });

  const onLimitChange = (e, data) =>
    dispatch({ type: 'SET_LIMIT', payload: data.value });

  const handleRowClick = row => {
    const rowDetails = _find(data.data, { id: row.id });

    Analytics.track(EVENTS.TABLE_ROW, {
      section: 'PAN',
      sub_section: 'BatchDetails',
      row_id: row.id,
    });

    navigate(`/pan/${row.id}/details`, {
      state: { rowDetails },
    });
  };

  const handleFiltersChange = (filters, searchBy) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    dispatch({ type: 'SET_SEARCH_BY', payload: searchBy });
  };

  const handleRemove = key =>
    dispatch({ type: 'SET_FILTERS', payload: _omit(filters, key) });

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      <Paper>
        <BatchInfo
          fileName={batchRowDetails.filename}
          fileId={batchRowDetails.id}
          uploadedAt={batchRowDetails.addedOn}
          uploadedBy={batchRowDetails.uploadedBy}
          status={batchRowDetails.status}
        />

        <Divider />

        <StatusStats
          data={{ total: batchRowDetails.totalRecords, ...statsData }}
        />

        <div className="mt-2">
          <BatchDetailsFilterWrapper>
            <FilterPopover
              searchOptions={options}
              value={filters}
              onChange={handleFiltersChange}
              config={filtersConfig}
              labelByStatus={labelByStatus}
            />
            <FilterChips
              chips={getChips({ filters, searchBy }, options, labelByStatus)}
              onRemove={handleRemove}
            />
          </BatchDetailsFilterWrapper>

          <PaginatedTable
            data={rowData}
            limit={limit}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
            tableHeading={FORMATTED_COLUMN_ID}
            onRowClick={handleRowClick}
            {...paginationInfo}
          />
        </div>
      </Paper>
    </>
  );
};

export default BatchPanDetails;
