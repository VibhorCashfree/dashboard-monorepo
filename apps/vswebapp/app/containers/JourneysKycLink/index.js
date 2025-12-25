import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Space,
  DateFilter,
  Icon as CoherentIcon,
  EllipsisPopup,
  toast,
} from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _startCase from 'lodash/startCase';
import _get from 'lodash/get';

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
  ACTION_TYPES,
  publishedActions,
  draftActions,
  COLUMN_ID,
} from './constants';
import { MODAL_TYPES } from 'containers/ModalsKycLink/constants';

// Styled
import { Action, FilterRowContainer } from 'styled/common';

// Providers
import { ListContext } from 'providers/ListProvider';
import { AccountContext } from 'providers/AccountProvider';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation } from 'utils/common';
import { getChips } from 'utils/chips';
import { getPaginationInfo, getCursor } from 'utils/pagination';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Helpers
import { formattedDate } from 'helpers/common';

// Services
import { getJourney, getJourneyCount, deleteJourney } from 'services/forms';

const Journey = () => {
  const [modalType, setModalType] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [draftId, setDraftId] = useState();
  const [action, setAction] = useState();
  const { state, dispatch } = useContext(ListContext);
  const { preferences } = useContext(AccountContext);

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
      if (hasMount && data) {
        return;
      }

      const status = Object.keys(filters);

      const queryObj = {
        status: status.filter(v => v !== 'search'),
        size: limit,
        productType: 'VRS_FORM',
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

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage = currentPage === 1;

      setLoading(true);

      const dataPromise = getJourney(queryObj);
      const countPromise = isFirstPage && getJourneyCount(queryObj);

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

  const handleDeleteJourney = async row => {
    setDraftId(row);
    setModalType(MODAL_TYPES.DELETE);
  };

  const handleDelete = async () => {
    const response = await deleteJourney(draftId.id);

    if (response) {
      toast.success(response.message);

      setModalType();
      setDraftId();
      setFetchCounter(fetchCounter + 1);
    }
  };

  const handleViewJourney = async row => {
    setAction('VIEW');
    setDraftId(row);
    setModalType(MODAL_TYPES.CREATE_JOURNEY);
  };

  const handleEditJourney = async row => {
    setAction('EDIT');
    setDraftId(row);
    setModalType(MODAL_TYPES.CREATE_JOURNEY);
  };

  const FORMATTED_COLUMN_ID = [
    ...COLUMN_ID,
    {
      accessorKey: 'action',
      header: ' ',
      cell: row => {
        const onItemClick = (_, itemSelected) => {
          switch (itemSelected) {
            case ACTION_TYPES.VIEW_JOURNEY:
              handleViewJourney(row);

              return;
            case ACTION_TYPES.EDIT_JOURNEY:
              handleEditJourney(row);

              return;
            case ACTION_TYPES.DELETE:
              handleDeleteJourney(row);

              return;
          }
        };

        return (
          <Space justifyContent="flex-end" className="pr-2">
            {row.status === 'DRAFT' ? (
              <EllipsisPopup menuItems={draftActions} onClick={onItemClick} />
            ) : (
              <EllipsisPopup
                menuItems={publishedActions}
                onClick={onItemClick}
              />
            )}
          </Space>
        );
      },
    },
  ];

  const handleDateChange = dateValue => {
    dispatch({ type: 'SET_DATE_VALUE', key: TAB_KEY, payload: dateValue });

    Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
      section: 'FORMS',
      sub_section: 'Journey',
      date_value: dateValue,
    });
  };

  const handleRemove = key => {
    const isRangeFilter = key === 'RANGE';

    const type = isRangeFilter ? 'SET_DATE_VALUE' : 'SET_FILTERS';
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'FORMS',
      sub_section: 'Journey',
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
            onClick={() => setModalType(MODAL_TYPES.CREATE_JOURNEY)}
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
        fetching={loading}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        tableHeading={FORMATTED_COLUMN_ID}
        {...paginationInfo}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          draftId={draftId}
          setDraftId={setDraftId}
          action={action}
          setAction={setAction}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Journey;
