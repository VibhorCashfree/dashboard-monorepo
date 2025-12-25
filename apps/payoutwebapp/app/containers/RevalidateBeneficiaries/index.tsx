import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Loader, Button, DateFilter } from '@cashfree-intl/coherent';
import moment from 'moment';
import _size from 'lodash/size';
import _omit from 'lodash/omit';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useList } from 'providers/ListProvider';

// Services
import {
  getAll,
  getAllCount,
  revalidateBeneficiaries,
} from 'services/beneficiaries';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation } from 'utils/common';
import hasPermission from 'utils/hasPermission';
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import { getSearchOptions } from 'containers/AllBeneficiaries/utils';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import DataTableWithPagination from 'components/DataTableWithPagination';
import Modals from './components/Modals';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { DEFAULT_VALUE, FORMATS, DATE_RANGE_OPTIONS } from 'constants/date';
import { MODAL_TYPE, primaryKey } from './constants';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer, BtnContainer } from 'styled/common';

const RevalidateBeneficiaries: React.FC = () => {
  const { merchantDetails, restrictionCodes } = useMerchant();
  const { state, dispatch } = useList();

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
        return;
      }

      const queryObj: any = {
        status: ['INVALID'],
        size: limit,
      };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = moment(startDate).format(FORMATS.START_DATE);
        queryObj.endDate = moment(endDate).format(FORMATS.END_DATE);
      }

      if (filters.search && searchBy) {
        queryObj[searchBy] = filters.search;
      }

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage = currentPage === 1;

      setLoading(true);
      setSelectedRecords([]);

      const dataPromise = getAll(queryObj);
      const countPromise = isFirstPage && getAllCount(queryObj);

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
    navigate(`/${PATH_BY_MENU[MENU.BENEFICIARIES]}/${row.id}/details`, {
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
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.REVALIDATE],
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
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.REVALIDATE],
      type: 'individual',
    });

    dispatch({
      type,
      payload,
    });
  };

  const handleAction = async () => {
    if (modalType === MODAL_TYPE.REVALIDATE_ALL) {
      const body = {
        cfBeneIDs: [],
        reValidateAll: true,
      };

      setActionLoading(true);

      const response = await revalidateBeneficiaries(body);

      setActionLoading(false);

      setModalType(MODAL_TYPE.EMPTY);

      if ('error' in response) {
        toast.error((response.error as { message: string }).message);
      } else {
        toast.success(response.message);
      }

      return;
    }

    const selectedIds = selectedRecords.map((record) => Number(record.id));

    const body = { cfBeneIDs: selectedIds };

    const response = await revalidateBeneficiaries(body);

    if ('error' in response) {
      toast.error((response.error as { message: string }).message);
      return;
    }

    if (response.status === 'FAILED') {
      setModalType(MODAL_TYPE.REVALIDATED_FAILED);
    } else {
      setModalType(MODAL_TYPE.REVALIDATED_SUCCESS);
    }

    setCount(Object.keys(response.beneStatus).length);

    dispatch({
      type: COMMON_ACTION_TYPE.SET_FILTERS,
      payload: {},
    });
  };

  const handleDateChange = (dateValue: DateRangeValue) => {
    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.REVALIDATE],
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

  const disabled = _size(selectedRecords) === 0;

  const canVerify = hasPermission(restrictionCodes, merchantDetails.userType, [
    20008,
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
          primary
          disabled={disabled}
          onClick={() =>
            emitUserValidation(() => {
              setModalType(MODAL_TYPE.REVALIDATE);

              const count = _size(selectedRecords);
              setCount(count);
            })
          }
        >
          Revalidate
        </Button>
      </BtnContainer>
    ),
  };

  const options = getSearchOptions();

  if (actionLoading) {
    return <Loader active />;
  }

  return (
    <>
      <PageHeader>
        {LABEL_BY_SUBMENU[SUBMENU.REVALIDATE]}{' '}
        {LABEL_BY_MENU[MENU.BENEFICIARIES]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.REVALIDATE]} ${
          LABEL_BY_MENU[MENU.BENEFICIARIES]
        }`}
      />

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

        <Button
          data-event-name="Primary_Button"
          primary
          className="ml-2"
          onClick={() =>
            emitUserValidation(() => setModalType(MODAL_TYPE.REVALIDATE_ALL))
          }
        >
          Revalidate All
        </Button>
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

export default withReadPermission(RevalidateBeneficiaries, {
  code: 20008,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.REVALIDATE]} ${
    LABEL_BY_MENU[MENU.BENEFICIARIES]
  }`,
});
