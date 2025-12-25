import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, Button, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _isEmpty from 'lodash/isEmpty';

// Constants
import EVENTS from 'constants/analytics';
import { KNOW_MORE } from 'constants/urls';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { DEFAULT_VALUE, FORMATS, DATE_OPTIONS } from 'constants/date';
import {
  filtersConfig,
  labelByStatus,
  options,
  MODAL_TYPES,
  COLUMN_ID,
} from './constants';

// Helpers
import { formattedDate } from 'helpers/common';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Utils
import Analytics from 'utils/analytics';
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import { formatFiltersFromQuery } from 'utils/common';

// Services
import { getAll, getAllCount } from 'services/UPI';

// Components
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Modals from './components/Modals';
import PaginatedTable from 'components/PaginatedTable';

// Styled
import { FilterRowContainer } from 'styled/common';

const UPI = () => {
  const queryFilters = formatFiltersFromQuery();
  const [dateValue, setDateValue] = useState(DEFAULT_VALUE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [data, setData] = useState();
  const [filters, setFilters] = useState({});
  const [searchBy, setSearchBy] = useState();
  const [modalType, setModalType] = useState();
  const [fetchCounter, setFetchCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (_isEmpty(queryFilters)) {
      return;
    }

    navigate(location.pathname);

    const { range, statuses } = queryFilters;

    setDateValue({
      displayText: 'Custom',
      range: range.map(date => new Date(date)),
    });

    setFilters(statuses);
  }, []);

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

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = formattedDate(
          startDate,
          FORMATS.DATE_WITHOUT_TIME,
        );
        queryObj.endDate = formattedDate(endDate, FORMATS.DATE_WITHOUT_TIME);
      }

      if (filters.search) {
        queryObj[searchBy] = filters.search;
      }

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage = currentPage === 1;

      setLoading(true);

      const dataPromise = getAll(queryObj);
      const countPromise = isFirstPage && getAllCount(queryObj);

      const response = await dataPromise;

      setData(prev => ({
        ...prev,
        ...response,
      }));

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        setData(prev => ({
          ...prev,
          ...countResponse,
        }));
      }
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const onPageChange = type => {
    setCurrentPage(currentPage => {
      switch (type) {
        case 'NEXT':
          return currentPage + 1;
        case 'PREV':
          return currentPage - 1;
        default:
      }
    });
  };

  const onLimitChange = (e, data) => {
    setLimit(+data.value);
    setCurrentPage(1);

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRemove = key => {
    if (key === 'RANGE') {
      setDateValue(DEFAULT_VALUE);
    } else {
      setFilters(_omit(filters, key));
    }

    setCurrentPage(1);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'UPI',
      sub_section: 'All',
      type: 'individual',
    });
  };

  const handleFiltersChange = (filters, searchBy) => {
    setFilters(filters);
    setSearchBy(searchBy);
    setCurrentPage(1);

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'UPI',
      sub_section: 'All',
      filters,
      search_by: searchBy,
    });
  };

  const handleDateChange = dateValue => {
    setDateValue(dateValue);
    setCurrentPage(1);

    Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
      section: 'UPI',
      sub_section: 'All',
      date_value: dateValue,
    });
  };

  const FORMATTED_COLUMN_ID = [...COLUMN_ID];

  return (
    <>
      <Text className="my-2" color="bodyLight">
        UPI VPAs and the verification statuses are shown here.{' '}
        <a
          href={KNOW_MORE.BAV.VERIFY_UPI}
          target="_blank"
          data-event-name="Link"
        >
          Know more
        </a>
      </Text>

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
        <Button
          primary
          data-event-name="Primary_Button"
          onClick={() => setModalType(MODAL_TYPES.VERIFY)}
        >
          Verify UPI VPA
        </Button>
      </FilterRowContainer>

      <PaginatedTable
        data={rowData}
        limit={limit}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        tableHeading={FORMATTED_COLUMN_ID}
        fetching={loading}
        {...paginationInfo}
      />

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

export default UPI;
