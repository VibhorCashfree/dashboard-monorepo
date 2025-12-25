import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';

// ActionTypes
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Builders
import QueryObjBuilder from 'builders/QueryObjBuilder';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { DEFAULT_VALUE, DATE_RANGE_OPTIONS } from 'constants/date';
import { KNOW_MORE } from 'constants/urls';
import { filtersConfig, labelByStatus, MODAL_TYPE } from './constants';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Providers
import { useList } from 'providers/ListProvider';

// Services
import { getAll, getAllCount } from 'services/beneficiaries';

// Utils
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import { emitUserValidation } from 'utils/common';
import { getSearchOptions } from './utils';

// Helpers
import { getFormattedRowData } from './helpers';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import CanWrite from 'components/CanWrite';
import DataTableWithPagination from 'components/DataTableWithPagination';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Modals from './components/Modals';

// Styled
import { FilterRowContainer } from 'styled/common';

const AllBeneficiaries: React.FC = () => {
  const { state, dispatch } = useList();

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [selectedRow, setSelectedRow] = useState<AnyObject | undefined>();
  const [loading, setLoading] = useState(false);

  const hasMount: boolean = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
        return;
      }

      const cursor = getCursor(data as TableData, previousPage, currentPage);

      const queryObj = new QueryObjBuilder()
        .withDateRange(dateValue)
        .withFilters(filters, searchBy)
        .withPagination(limit, cursor);

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getAll(queryObj as PaginationQueryObj);
      const countPromise = isFirstPage
        ? getAllCount(queryObj as PaginationQueryObj)
        : Promise.resolve(undefined);

      const response = await dataPromise;

      dispatch({
        type: COMMON_ACTION_TYPE.SET_DATA,
        payload: response,
      });

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        dispatch({
          type: COMMON_ACTION_TYPE.SET_DATA,
          payload: countResponse,
        });
      }
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter, key]);

  const handleAction = (row: AnyObject) => (e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedRow(row);
    setModalType(MODAL_TYPE.DELETE);
  };

  const onPageChange = (
    type: COMMON_ACTION_TYPE.PREV | COMMON_ACTION_TYPE.NEXT,
  ) =>
    dispatch({
      type: COMMON_ACTION_TYPE.SET_CURRENT_PAGE,
      payload: type,
    });

  const onLimitChange = (e: React.MouseEvent, data: { value: string }) => {
    dispatch({
      type: COMMON_ACTION_TYPE.SET_LIMIT,
      payload: data.value,
    });

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRowClick = (row: AnyObject) => {
    navigate(`/${PATH_BY_MENU[MENU.BENEFICIARIES]}/${row.id}/details`, {
      state: { rowDetails: row },
    });
  };

  const handleFiltersChange = (
    filters: AnyObject,
    searchBy: string | undefined,
  ) => {
    dispatch({
      type: COMMON_ACTION_TYPE.SET_FILTERS,
      payload: filters,
    });
    dispatch({
      type: COMMON_ACTION_TYPE.SET_SEARCH_BY,
      payload: searchBy,
    });

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = (key: string) => {
    const isRangeFilter: boolean = key === 'RANGE';

    const type = isRangeFilter
      ? COMMON_ACTION_TYPE.SET_DATE_VALUE
      : COMMON_ACTION_TYPE.SET_FILTERS;
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      type: 'individual',
    });

    dispatch({
      type,
      payload,
    });
  };

  const handleDateChange = (dateValue: DateRangeValue) => {
    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      date_value: dateValue,
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
      payload: dateValue,
    });
  };

  const options: any = getSearchOptions();

  return (
    <>
      <PageHeader embedKey="BENE">
        {LABEL_BY_SUBMENU[SUBMENU.ALL]} {LABEL_BY_MENU[MENU.BENEFICIARIES]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.ALL]} ${
          LABEL_BY_MENU[MENU.BENEFICIARIES]
        }`}
      />

      <Text className="my-2" color="bodyLight">
        All beneficiaries are shown here.{' '}
        <a
          href={KNOW_MORE.BENEFICIARY.ALL}
          target="_blank"
          rel="noopener noreferrer"
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
            options={DATE_RANGE_OPTIONS}
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
        <CanWrite code={20001}>
          <Button
            data-event-name="Primary_Button"
            primary
            onClick={() =>
              emitUserValidation(() => setModalType(MODAL_TYPE.ADD))
            }
          >
            Add Beneficiary
          </Button>
        </CanWrite>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData(handleAction)}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        onRowClick={handleRowClick}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          selectedRow={selectedRow}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
        />
      )}
    </>
  );
};

export default AllBeneficiaries;
