import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Text, Paper, Icon as CoherentIcon } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _startCase from 'lodash/startCase';
import _find from 'lodash/find';

// Componenets
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import BatchInfo from 'components/BatchInfo';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import PaginatedTable from 'components/PaginatedTable';

// Styles
import {
  BackButtonWrapper,
  BatchDetailsFilterWrapper,
  Divider,
} from 'styled/common';

// Utils
import Analytics from 'utils/analytics';
import { getChips } from 'utils/chips';
import { getPaginationInfo } from 'utils/pagination';

// Constants
import { filtersConfig, labelByStatus, options, COLUMN_ID } from './constants';
import EVENTS from 'constants/analytics';

// Helpers
import { getQuery, hasMounted } from 'helpers/common';

// Services
import { getBatchEntries, getBatchEntriesCount } from 'services/forms';

// Providers
import { BatchDetailsContext } from 'providers/BatchDetailsProvider';
import { AccountContext } from 'providers/AccountProvider';

// Hooks
import useHasMount from 'hooks/useHasMount';

const BatchKycLinkDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hasMount = useHasMount();

  const batchRowDetails = _get(location.state, 'batchRowDetails', {});

  const { state, dispatch } = useContext(BatchDetailsContext);

  const { limit, currentPage, data, filters, searchBy } = state;

  useEffect(() => {
    (async function fetchData() {
      hasMounted(hasMount, data);

      const isFirstPage = currentPage === 1;

      const queryObj = getQuery(filters, searchBy, limit);

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

  const handleFiltersChange = (filters, searchBy) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    dispatch({ type: 'SET_SEARCH_BY', payload: searchBy });

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'KYC_LINK',
      sub_section: 'Batch Details',
      filters,
      search_by: searchBy,
    });
  };

  const onPageChange = type =>
    dispatch({ type: 'SET_CURRENT_PAGE', payload: type });

  const onLimitChange = (e, data) => {
    dispatch({ type: 'SET_LIMIT', payload: data.value });

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRowClick = row => {
    const rowDetails = _find(data.data, { id: row.id });
    navigate(`/kyc-link/${row.id}/details`, { state: { rowDetails } });
  };

  const handleRemove = key => {
    dispatch({ type: 'SET_FILTERS', payload: _omit(filters, key) });

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'KYC_LINK',
      sub_section: 'Batch Details',
      type: 'individual',
    });
  };

  const FORMATTED_COLUMN_ID = [...COLUMN_ID];

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

        {/* <Space justifyContent="space-between">
          <Space gap={6}>
            <div>
              <Text color="bodyLight" className="mb-1">
                File Name
              </Text>

              <Text variant="h16" className="text-ellipsis">
                {batchRowDetails.filename}
              </Text>
            </div>

            <div>
              <Text color="bodyLight" className="mb-1">
                Uploaded On
              </Text>

              <Text variant="h16">{batchRowDetails.id}</Text>
            </div>

            <div>
              <Text color="bodyLight" className="mb-1">
                Uploaded Records
              </Text>

              <Text variant="h16">
                {formattedDate(batchRowDetails.addedOn)}
              </Text>
            </div>

            <div>
              <Text color="bodyLight" className="mb-1">
                Completed
              </Text>

              <Text variant="h16">{batchRowDetails.uploadedBy || '–'}</Text>
            </div>
          </Space>

          <Space gap={4}>
            <div className="text-right">
              <Button primary icon={<Icon fill="white" name="download" />}>
                Download CSV
              </Button>
            </div>
          </Space>
        </Space> */}

        <Divider />

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

export default BatchKycLinkDetails;
