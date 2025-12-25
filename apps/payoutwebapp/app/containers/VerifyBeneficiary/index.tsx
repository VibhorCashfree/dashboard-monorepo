import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, Text, Button, DateFilter } from '@cashfree-intl/coherent';
import _size from 'lodash/size';
import _omit from 'lodash/omit';

// Action Types
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
import { KNOW_MORE } from 'constants/urls';
import { DEFAULT_VALUE, DATE_RANGE_OPTIONS } from 'constants/date';
import { options, MODAL_TYPE, primaryKey } from './constants';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useList } from 'providers/ListProvider';

// Services
import {
  getVerifyBeneficiaries,
  getVerifyBeneficiariesCount,
  verifyBeneficiaries,
  rejectBeneficiaries,
} from 'services/cashgrams';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation } from 'utils/common';
import hasPermission from 'utils/hasPermission';
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import DataTableWithPagination from 'components/DataTableWithPagination';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Modals from './components/Modals';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer, BtnContainer } from 'styled/common';

const VerifyBeneficiary: React.FC = () => {
  const { merchantDetails, restrictionCodes } = useMerchant();
  const { state, dispatch } = useList();

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [loading, setLoading] = useState(false);

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
        return;
      }

      const cursor = getCursor(data as TableData, previousPage, currentPage);

      const queryObj = new QueryObjBuilder()
        .withDateRange(dateValue, ['DATE', 'DATE'])
        .withFilters(filters, searchBy)
        .withPagination(limit, cursor);

      const isFirstPage = currentPage === 1;

      setLoading(true);
      setSelectedRecords([]);

      const dataPromise = getVerifyBeneficiaries(
        queryObj as PaginationQueryObj,
      );
      const countPromise =
        isFirstPage &&
        getVerifyBeneficiariesCount(queryObj as PaginationQueryObj);

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
    navigate(`/${PATH_BY_MENU[MENU.CASHGRAMS]}/${row.id}/details`, {
      state: {
        rowDetails: row,
      },
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
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY],
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
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY],
      type: 'individual',
    });

    dispatch({
      type,
      payload,
    });
  };

  const handleAction = async () => {
    const actionFn =
      modalType === MODAL_TYPE.VERIFY
        ? verifyBeneficiaries
        : rejectBeneficiaries;

    const selectedIds = selectedRecords.map((record) => record[primaryKey]);
    const body = { cashgrams: selectedIds };

    await actionFn(body);

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
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY],
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

  const amount = selectedRecords.reduce(
    (totalAmount, record) => totalAmount + Number(record.amount),
    0,
  );

  const count = _size(selectedRecords);

  const disabled = count === 0;

  const canVerify = hasPermission(restrictionCodes, merchantDetails.userType, [
    21709,
  ]);

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
          Verify
        </Button>
      </BtnContainer>
    ),
  };

  return (
    <>
      <PageHeader embedKey="CASHGRAMS_VERIFY">
        {LABEL_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY]}
      </PageHeader>
      <MetaTags title={LABEL_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY]} />

      <Text className="my-2" color="bodyLight">
        Showing all cashgrams including batch cashgrams for approval.{' '}
        <a
          href={KNOW_MORE.CASHGRAMS.VERIFY}
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
          amount={amount}
          handleAction={handleAction}
        />
      )}
    </>
  );
};

export default withReadPermission(VerifyBeneficiary, {
  code: 21708,
  description: 'verify Beneficiary Name',
});
