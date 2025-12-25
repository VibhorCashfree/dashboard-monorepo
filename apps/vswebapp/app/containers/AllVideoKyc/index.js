import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Space,
  DateFilter,
  Icon as CoherentIcon,
  Text,
  Card,
} from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _isEmpty from 'lodash/isEmpty';
import _capitalize from 'lodash/capitalize';

// Components
import Modals from './Modals';
import Icon from 'components/Icon';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import PaginatedTable from 'components/PaginatedTable';
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';

// Constants
import EVENTS from 'constants/analytics';
import { DATE_OPTIONS, DEFAULT_VALUE, FORMATS } from 'constants/date';
import {
  filtersConfig,
  labelByStatus,
  options,
  TAB_KEY,
  COLUMN_ID,
} from './constants';
import { MODAL_TYPES } from 'containers/ModalsKycLink/constants';

// Styled
import { FilterRowContainer, PageHeading } from 'styled/common';

// Providers
import { ListContext } from 'providers/ListProvider';
import { AccountContext } from 'providers/AccountProvider';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation, formatFiltersFromQuery } from 'utils/common';
import { getChips } from 'utils/chips';
import { getCursor, getPaginationInfo } from 'utils/pagination';

// Services
import {
  getAllVerification,
  getAllVerificationCount,
  getAllVerificationStatus,
} from 'services/vkyc';

// Helpers
import { formattedDate } from 'helpers/common';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

const AllVideoKyc = () => {
  const queryFilters = formatFiltersFromQuery();

  const [modalType, setModalType] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [stats, setStats] = useState([]);

  const navigate = useNavigate();
  const { state, dispatch } = useContext(ListContext);

  const {
    dateValue,
    limit,
    currentPage,
    filters,
    searchBy,
    key,
    data,
    reset,
  } = state;

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    if (hasMount) {
      return;
    }

    dispatch({
      type: 'RESET',
      key: TAB_KEY,
    });
  }, [fetchCounter]);

  useEffect(() => {
    (async function fetchData() {
      if ((hasMount && data) || !_isEmpty(queryFilters)) {
        return;
      }

      const status = Object.keys(filters);

      const queryObj = {
        status: status.filter(v => v !== 'search'),
        size: limit,
      };

      if (filters.search) {
        queryObj[searchBy] = filters.search;
      }

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = formattedDate(
          startDate,
          FORMATS.DATE_WITHOUT_TIME,
        );
        queryObj.endDate = formattedDate(endDate, FORMATS.DATE_WITHOUT_TIME);
      }

      const isFirstPage = currentPage === 1;

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      setLoading(true);

      const statsPromise = getAllVerificationStatus(queryObj);
      const dataPromise = getAllVerification(queryObj);
      const countPromise = isFirstPage && getAllVerificationCount(queryObj);

      const response = await dataPromise;
      const statsResponse = await statsPromise;

      dispatch({
        type: 'SET_DATA',
        key: TAB_KEY,
        payload: response,
      });

      if (!statsResponse.error) {
        setStats(statsResponse?.statusCounts);
      }

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        dispatch({
          type: 'SET_DATA',
          key: TAB_KEY,
          payload: countResponse,
        });
      }
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter, key, reset]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = [...COLUMN_ID];

  const handleDateChange = dateValue => {
    dispatch({ type: 'SET_DATE_VALUE', key: TAB_KEY, payload: dateValue });

    Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
      section: 'FORMS',
      sub_section: 'All',
      date_value: dateValue,
    });
  };

  const handleRemove = key => {
    const isRangeFilter = key === 'RANGE';

    const type = isRangeFilter ? 'SET_DATE_VALUE' : 'SET_FILTERS';
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'FORMS',
      sub_section: 'All',
    });

    dispatch({
      type,
      key: TAB_KEY,
      payload,
    });
  };

  const handleFiltersChange = (filters, searchBy) => {
    dispatch({ type: 'SET_FILTERS', key: TAB_KEY, payload: filters });
    dispatch({ type: 'SET_SEARCH_BY', key: TAB_KEY, payload: searchBy });

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'FORMS',
      sub_section: 'All',
      filters,
      search_by: searchBy,
    });
  };

  const onLimitChange = (e, data) => {
    dispatch({ type: 'SET_LIMIT', key: TAB_KEY, payload: data.value });

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const onPageChange = type =>
    dispatch({ type: 'SET_CURRENT_PAGE', key: TAB_KEY, payload: type });

  const handleRowClick = (row, rowIndex) => {
    navigate(`${row.referenceId}/details`, {
      state: { rowDetails: row },
    });
  };

  return (
    <>
      <PageHeader>Video KYC - All Verifications</PageHeader>
      <MetaTags title="Secure ID – Video KYC" />
      <Space
        justifyContent="space-between"
        alignItems="center"
        className="mb-4"
      >
        <Space direction="column" gap={0.5}>
          <Text variant="h16" color="bodyLight">
            View and manage all your video kyc applications.
          </Text>
        </Space>
        <Space gap={2} alignItems="center">
          <Button primary onClick={() => setModalType('CREATE_LINK')}>
            Generate Verification Link
          </Button>
        </Space>
      </Space>

      <div>
        <Space direction="column" gap={3}>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            options={DATE_OPTIONS}
            onSelect={handleDateChange}
          />

          <Space gap={1.5} alignItems="center" wrap>
            {stats?.map(stat => (
              <Card
                style={{ width: '120px', minWidth: '120px' }}
                className="p-2 m-0"
              >
                <Space direction="column" gap={0.5}>
                  <Text
                    variant="b12"
                    color="bodyLight"
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {_capitalize(_startCase(stat?.status))}
                  </Text>
                  <Text variant="h20">{stat?.count}</Text>
                </Space>
              </Card>
            ))}
          </Space>
        </Space>
        <FilterRowContainer>
          <div>
            <FilterPopover
              config={filtersConfig}
              labelByStatus={labelByStatus}
              searchOptions={options}
              value={filters}
              onChange={handleFiltersChange}
            />
            <FilterChips
              chips={getChips(
                { dateValue, filters, searchBy },
                options,
                labelByStatus,
              )}
              onRemove={handleRemove}
            />
          </div>
        </FilterRowContainer>

        <PaginatedTable
          data={rowData}
          limit={limit}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          onRowClick={handleRowClick}
          tableHeading={FORMATTED_COLUMN_ID}
          fetching={loading}
          emptyTableComponent={{
            text: 'Get started with Video KYC',
            description:
              'Begin verifying customers by sending them a secure KYC link. Track their progress and manage verifications seamlessly from here.',
            icon: <CoherentIcon name="noRecordsTableIcon" />,
          }}
          {...paginationInfo}
        />
      </div>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
        />
      )}
    </>
  );
};

export default AllVideoKyc;
