import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import _get from 'lodash/get';

// Constants

import EVENTS from 'constants/analytics';
import { KNOW_MORE } from 'constants/urls';
import { DEFAULT_VALUE, DATE_OPTIONS, MIN_DATE, FORMATS } from 'constants/date';
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
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';

// Providers
import { ListContext } from 'providers/ListProvider';

// Services
import { getAll, getAllCount } from 'services/okyc';

// Components
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Modals from './components/Modals';
import AadhaarOTPModal from './components/AadhaarOTPModal';
import PaginatedTable from 'components/PaginatedTable';

// Styled
import { FilterRowContainer } from 'styled/common';

const OKYC = () => {
  const { state, dispatch } = useContext(ListContext);

  const { dateValue, limit, currentPage, data, filters, searchBy } = state;

  const [modalType, setModalType] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [fetchCounter, setFetchCounter] = useState(0);

  const navigate = useNavigate();

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
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

      dispatch({
        type: 'SET_DATA',
        payload: response,
      });

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        dispatch({
          type: 'SET_DATA',
          payload: countResponse,
        });
      }
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = [...COLUMN_ID];

  const onPageChange = type =>
    dispatch({ type: 'SET_CURRENT_PAGE', payload: type });

  const onLimitChange = (e, data) => {
    dispatch({ type: 'SET_LIMIT', payload: data.value });
  };

  const handleFiltersChange = (filters, searchBy) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    dispatch({ type: 'SET_SEARCH_BY', payload: searchBy });
  };

  const handleDateChange = value =>
    dispatch({ type: 'SET_DATE_VALUE', payload: value });

  const handleRemove = key => {
    const isRangeFilter = key === 'RANGE';

    const type = isRangeFilter ? 'SET_DATE_VALUE' : 'SET_FILTERS';
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    dispatch({ type, payload });
  };

  const handleRowClick = row => {
    const rowDetails = _find(data.data, { refId: row.refId });

    Analytics.track(EVENTS.TABLE_ROW, {
      row_id: row.refId,
    });

    navigate(`/okyc/${row.refId}/details`, { state: { rowDetails } });
  };

  const handleValidAadhaar = data => {
    // @TODO: not validation
    setModalData(prev => ({ ...prev, ...data }));
  };

  const handleRedirect = modalData => {
    navigate(`/okyc/${modalData.refId}/details`, {
      state: { rowDetails: modalData },
    });
  };

  return (
    <>
      <Text className="my-2" color="bodyLight">
        Aadhaar and the verification statuses are shown here.{' '}
        <a
          href={KNOW_MORE.BAV.VERIFY_OKYC}
          target="_blank"
          data-event-name="Link"
        >
          Know more
        </a>
      </Text>

      <FilterRowContainer>
        <div>
          <DateFilter
            min={MIN_DATE}
            rangeSize={31}
            value={dateValue}
            options={DATE_OPTIONS}
            onSelect={handleDateChange}
          />
          <FilterPopover
            searchOptions={options}
            config={filtersConfig}
            labelByStatus={labelByStatus}
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
          Verify Aadhaar
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
        onRowClick={handleRowClick}
        {...paginationInfo}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          modalData={modalData}
          setModalData={setModalData}
          setFetchCounter={setFetchCounter}
          handleRedirect={handleRedirect}
        />
      )}

      {/* @TODO: why it is without `modalType`?  */}
      <AadhaarOTPModal
        aadhaarData={modalData}
        validAadhaar={handleValidAadhaar}
      />
    </>
  );
};

export default OKYC;
