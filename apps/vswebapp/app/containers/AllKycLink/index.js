import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Space,
  DateFilter,
  Icon as CoherentIcon,
} from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _isEmpty from 'lodash/isEmpty';

// Components
import Icon from 'components/Icon';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import PaginatedTable from 'components/PaginatedTable';

// Containers
import Modals from 'containers/ModalsKycLink';

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
import { FilterRowContainer } from 'styled/common';

// Providers
import { ListContext } from 'providers/ListProvider';
import { AccountContext } from 'providers/AccountProvider';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation, formatFiltersFromQuery } from 'utils/common';
import { getChips } from 'utils/chips';
import { getCursor, getPaginationInfo } from 'utils/pagination';

// Services
import { getAll, getAllCount } from 'services/forms';

// Helpers
import { formattedDate } from 'helpers/common';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

const AllKycLink = () => {
  const queryFilters = formatFiltersFromQuery();

  const [modalType, setModalType] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);

  const navigate = useNavigate();
  const { preferences } = useContext(AccountContext);
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
        source: 'KYC_STUDIO'
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

      const dataPromise = getAll(queryObj);
      const countPromise = isFirstPage && getAllCount(queryObj);

      const response = await dataPromise;

      dispatch({
        type: 'SET_DATA',
        key: TAB_KEY,
        payload: response,
      });

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

  const handleRowClick = row => {
    const rowDetails = _find(data.data, { id: row.id });

    navigate(`/kyc-link/${row.id}/details`, {
      state: {
        rowDetails,
      },
    });
  };

  return (
    <div className="mt-4">
      <FilterRowContainer>
        <div>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            options={DATE_OPTIONS}
            onSelect={handleDateChange}
          />
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

        <Space gap={2}>
          <Button
            secondary
            icon={<CoherentIcon name="add" />}
            onClick={() =>
              emitUserValidation(() => setModalType(MODAL_TYPES.CREATE_JOURNEY))
            }
          >
            Create KYC Template
          </Button>

          {_get(preferences, 'forms.upload', false) && (
            <>
              <Button
                primary
                data-event-name="Primary_Button"
                onClick={() =>
                  emitUserValidation(() =>
                    setModalType(MODAL_TYPES.SEND_JOURNEY),
                  )
                }
                icon={<Icon name="send-kyc-forms" />}
              >
                Send KYC Link
              </Button>
            </>
          )}
        </Space>
      </FilterRowContainer>

      <PaginatedTable
        data={rowData}
        limit={limit}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        tableHeading={FORMATTED_COLUMN_ID}
        fetching={loading}
        onRowClick={handleRowClick}
        {...paginationInfo}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
        />
      )}
    </div>
  );
};

export default AllKycLink;
