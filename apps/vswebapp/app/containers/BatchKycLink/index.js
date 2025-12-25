import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Space,
  DateFilter,
  Popup,
  Icon as CoherentIcon,
} from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';

// Constants
import EVENTS from 'constants/analytics';
import { DEFAULT_VALUE, FORMATS, DATE_OPTIONS } from 'constants/date';
import {
  filtersConfig,
  labelByStatus,
  options,
  TAB_KEY,
  COLUMN_ID,
} from './constants';
import { MODAL_TYPES } from 'containers/ModalsKycLink/constants';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Modals from 'containers/ModalsKycLink';
import PaginatedTable from 'components/PaginatedTable';

// Helpers
import { formattedDate } from 'helpers/common';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Utils
import Analytics from 'utils/analytics';
import { triggerDownload, emitUserValidation } from 'utils/common';
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { ListContext } from 'providers/ListProvider';

// Services
import {
  getBatches,
  getBatchesCount,
  downloadBatchReport,
} from 'services/forms';
import { getSampleFile } from 'services/misc';

// Styled
import { Action, FilterRowContainer } from 'styled/common';

const BatchKycLink = () => {
  const { preferences } = useContext(AccountContext);
  const { state, dispatch } = useContext(ListContext);

  const {
    dateValue,
    limit,
    currentPage,
    data,
    filters,
    searchBy,
    key,
    reset,
  } = state;

  const [fetchCounter, setFetchCounter] = useState(0);
  const [modalType, setModalType] = useState();
  const [loading, setLoading] = useState(false);

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();

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

      const dataPromise = getBatches(queryObj);
      const countPromise = isFirstPage && getBatchesCount(queryObj);

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

  const FORMATTED_COLUMN_ID = [
    ...COLUMN_ID,
    {
      accessorKey: 'action',
      header: ' ',
      cell: row => (
        <Space justifyContent="flex-end" className="pr-2">
          <Popup
            content="Download Report"
            trigger={
              <Action onClick={handleDownload(row)} data-testid="upload-btn">
                <Icon role="download" name="download" />
              </Action>
            }
          />
        </Space>
      ),
    },
  ];

  const onPageChange = type =>
    dispatch({ type: 'SET_CURRENT_PAGE', key: TAB_KEY, payload: type });

  const onLimitChange = (e, data) => {
    dispatch({ type: 'SET_LIMIT', key: TAB_KEY, payload: data.value });

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleDownload = row => async e => {
    e.stopPropagation();

    setLoading(true);

    const response = await downloadBatchReport(row.id);

    Analytics.track(EVENTS.DOWNLOAD_REPORT, {
      section: 'FORMS',
      sub_section: 'Batch',
    });

    if (response.fileUrl) {
      triggerDownload({ type: 'URL', payload: response.fileUrl });
    }

    setLoading(false);
  };

  const handleFiltersChange = (filters, searchBy) => {
    dispatch({ type: 'SET_FILTERS', key: TAB_KEY, payload: filters });
    dispatch({ type: 'SET_SEARCH_BY', key: TAB_KEY, payload: searchBy });

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'FORMS',
      sub_section: 'Batch',
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = key => {
    const isRangeFilter = key === 'RANGE';

    const type = isRangeFilter ? 'SET_DATE_VALUE' : 'SET_FILTERS';
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'FORMS',
      sub_section: 'Batch',
    });

    dispatch({
      type,
      key: TAB_KEY,
      payload,
    });
  };

  const handleDateChange = dateValue => {
    dispatch({ type: 'SET_DATE_VALUE', key: TAB_KEY, payload: dateValue });

    Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
      section: 'FORMS',
      sub_section: 'Batch',
      date_value: dateValue,
    });
  };

  const handleRowClick = row => {
    const rowDetails = _find(data.data, { id: row.id });

    navigate(`/kyc-link/batch/${row.id}/details`, {
      state: {
        batchRowDetails: rowDetails,
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

export default BatchKycLink;
