import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, Text, Button, DateFilter } from '@cashfree-intl/coherent';
import moment from 'moment';
import _size from 'lodash/size';
import _omit from 'lodash/omit';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { DEFAULT_VALUE, FORMATS } from 'constants/date';
import { DATE_RANGE_OPTIONS } from 'containers/AllTransfers/constants';
import { options, MODAL_TYPE, primaryKey } from './constants';

// Hooks
import useHasMount from 'hooks/useHasMount';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useList } from 'providers/ListProvider';

// Services
import { getAll, getAllCount, update } from 'services/transfers';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation } from 'utils/common';
import hasPermission from 'utils/hasPermission';
import { getChips } from 'utils/chips';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import DataTableWithPagination from 'components/DataTableWithPagination';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Modals from './components/Modals';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer, BtnContainer } from 'styled/common';

const ApproveTransfers: React.FC = () => {
  const { merchantDetails, restrictionCodes } = useMerchant();
  const { state, dispatch } = useList();

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [loading, setLoading] = useState(false);

  const hasMount = useHasMount();

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
        return;
      }

      const queryObj: any = {
        status: ['APPROVAL_PENDING'],
        size: limit,
        num: currentPage,
      };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = moment(startDate).format(FORMATS.DATE);
        queryObj.endDate = moment(endDate).format(FORMATS.DATE);
      }

      if (filters.search && searchBy) {
        queryObj[searchBy] = filters.search;
      }

      setLoading(true);
      setSelectedRecords([]);

      const [response, countResponse] = await Promise.all([
        getAll(queryObj),
        getAllCount(queryObj),
      ]);

      {
        const data = ('error' in response ? [] : response.data).map(
          (item: AnyObject) => ({
            ...item,
            id: item[primaryKey],
          }),
        );

        let hasNext: boolean;

        if (!response || 'error' in response || !response.cursor) {
          hasNext = false;
        } else {
          hasNext = !JSON.parse(atob(response.cursor)).searchAfter.empty;
        }

        dispatch({
          type: COMMON_ACTION_TYPE.SET_DATA,
          payload: {
            data,
            hasNext,
            count: 'error' in countResponse ? 0 : countResponse.count,
          },
        });
      }
      setLoading(false);
    })();
  }, [currentPage, limit, dateValue, filters, key]);

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
    navigate(`/${PATH_BY_MENU[MENU.TRANSFERS]}/${row.id}/details`, {
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
      section: LABEL_BY_MENU[MENU.TRANSFERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.APPROVE],
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = (key: string) => {
    const isRangeFilter = key === 'RANGE';

    const type = isRangeFilter
      ? COMMON_ACTION_TYPE.SET_DATE_VALUE
      : COMMON_ACTION_TYPE.SET_FILTERS;
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.TRANSFERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.APPROVE],
      type: 'individual',
    });

    dispatch({
      type,
      payload,
    });
  };

  const handleAction = async () => {
    const action = modalType === MODAL_TYPE.VERIFY ? 'approved' : 'rejected';

    const selectedIdsWithAction = selectedRecords.map((record) => ({
      [primaryKey]: String(record[primaryKey]),
      state: action,
    }));

    const body = { action: 'approval', transfers: selectedIdsWithAction };

    const response = await update(body);

    if ('error' in response) {
      return;
    }

    const newModalType =
      modalType === MODAL_TYPE.VERIFY
        ? MODAL_TYPE.VERIFIED
        : MODAL_TYPE.REJECTED;

    setModalType(newModalType);

    dispatch({
      type: COMMON_ACTION_TYPE.SET_FILTERS,
      payload: {},
    });
  };

  const handleDateChange = (dateValue: DateRangeValue) => {
    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.TRANSFERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.APPROVE],
      date_value: dateValue,
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
      payload: dateValue,
    });
  };

  if (!data) {
    return <Loader active />;
  }

  const count: number = _size(selectedRecords);

  const disabled = count === 0;

  const canVerify: boolean = hasPermission(
    restrictionCodes,
    merchantDetails.userType,
    [21004],
  );

  const selectProps = {
    primaryKey,
    selectedRecordIds: selectedRecords.reduce((acc, record) => {
      acc[record[primaryKey]] = true;
      return acc;
    }, {}),
    onChange: (updatedSelectedRecordIds: Record<string, boolean>) =>
      setSelectedRecords(
        data.data.filter(
          (record: AnyObject) => updatedSelectedRecordIds[record[primaryKey]],
        ),
      ),
    renderRowSelectionAction: () => (
      <BtnContainer className="mt-0">
        <Button
          data-event-name="Primary_Button"
          danger
          disabled={disabled}
          onClick={() =>
            emitUserValidation(() => setModalType(MODAL_TYPE.REJECT))
          }
        >
          Reject
        </Button>
        <Button
          data-event-name="Primary_Button"
          primary
          className="ml-4"
          disabled={disabled}
          onClick={() =>
            emitUserValidation(() => setModalType(MODAL_TYPE.VERIFY))
          }
        >
          Approve
        </Button>
      </BtnContainer>
    ),
  };

  return (
    <>
      <PageHeader>
        {LABEL_BY_SUBMENU[SUBMENU.APPROVE]} {LABEL_BY_MENU[MENU.TRANSFERS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.APPROVE]} ${
          LABEL_BY_MENU[MENU.TRANSFERS]
        }`}
      />

      <Text className="my-2" color="bodyLight">
        Showing all transfers for approval.{' '}
      </Text>

      <FilterRowContainer>
        <div>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            options={DATE_RANGE_OPTIONS}
            min={new Date(2024, 0, 1)}
            alertText="Data available for transfers initiated on or after 1st Jan 2024"
            onSelect={handleDateChange}
          />
          <FilterPopover
            searchOptions={options}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ dateValue, filters, searchBy }, options)}
            onRemove={handleRemove}
          />
        </div>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData()}
        selectProps={_size(data.data) && canVerify ? selectProps : null}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        onRowClick={handleRowClick}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          count={count}
          handleAction={handleAction}
        />
      )}
    </>
  );
};

export default withReadPermission(
  withReadPermission(ApproveTransfers, {
    code: 21004,
    description: 'approve Transfer',
  }),
  {
    code: 21005,
    description: 'approve Transfer',
  },
);
