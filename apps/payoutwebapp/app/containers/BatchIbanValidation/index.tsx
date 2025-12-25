import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  DateFilter,
  SampleFileDropdown,
} from '@cashfree-intl/coherent';
import moment from 'moment';
import _omit from 'lodash/omit';
import _keys from 'lodash/keys';
import _without from 'lodash/without';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Services
import {
  getIbanBatches,
  getIbanBatchesCount,
  downloadIbanBatchReport,
} from 'services/beneficiaries';
import { getSampleFile } from 'services/misc';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useList } from 'providers/ListProvider';

// Utils
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import {
  getFileName,
  triggerDownload,
  emitUserValidation,
  decodeFile,
} from 'utils/common';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { BENE_PURPOSE } from 'constants/common';
import EVENTS from 'constants/events';
import { DEFAULT_VALUE, FORMATS, DATE_RANGE_OPTIONS } from 'constants/date';
import {
  filtersConfig,
  labelByStatus,
  options,
  MODAL_TYPE,
  BulkIbanFileType,
} from './constants';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import PageHeader from 'components/PageHeader';
import CanWrite from 'components/CanWrite';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import DataTableWithPagination from 'components/DataTableWithPagination';
import Modals from './components/Modals';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer } from 'styled/common';

const BatchIbanValidation: React.FC = () => {
  const { preferences } = useAccount();
  const { state, dispatch } = useList();

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [fetchCounter, setFetchCounter] = useState(0);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [loading, setLoading] = useState(false);

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
        return;
      }

      const status = _without(_keys(filters), 'search', ..._keys(BENE_PURPOSE));

      const queryObj: PaginationQueryObj = {
        status,
        purpose: Object.keys(filters).filter(
          (key) => BENE_PURPOSE[key as keyof typeof BENE_PURPOSE],
        ),
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

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getIbanBatches(queryObj);
      const countPromise = isFirstPage && getIbanBatchesCount(queryObj);

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

  const handleDownload = (row: AnyObject) => async (e: React.MouseEvent) => {
    e.stopPropagation();

    const response = await downloadIbanBatchReport(row.id);

    Analytics.track(EVENTS.DOWNLOAD_REPORT, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_IBAN],
    });

    if (!('error' in response)) {
      if (response.fileUrl) {
        triggerDownload({ type: 'URL', payload: response.fileUrl });
      } else {
        triggerDownload(
          { type: 'DATA', payload: decodeFile(response.file) },
          getFileName(row.name, row.id, row.status),
        );
      }
    }
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

  const handleRemove = (key: string) => {
    const isRangeFilter = key === 'RANGE';

    const type = isRangeFilter
      ? COMMON_ACTION_TYPE.SET_DATE_VALUE
      : COMMON_ACTION_TYPE.SET_FILTERS;
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_IBAN],
      type: 'individual',
    });

    dispatch({
      type,
      payload,
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
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_IBAN],
      filters,
      search_by: searchBy,
    });
  };

  const handleDateChange = (dateValue: DateRangeValue) => {
    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_IBAN],
      date_value: dateValue,
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
      payload: dateValue,
    });
  };

  const downloadSampleFile = async (type: string) => {
    const queryObj = {
      fileType: BulkIbanFileType,
      type,
    };

    const response = await getSampleFile(queryObj);

    Analytics.track(EVENTS.DOWNLOAD_SAMPLE, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_IBAN],
    });

    if (!('error' in response)) {
      triggerDownload({ type: 'URL', payload: response.fileUrl });
    }
  };

  const canUpload: boolean = preferences.beneficiaries.purpose.others;

  return (
    <>
      <PageHeader>{LABEL_BY_SUBMENU[SUBMENU.BATCH_IBAN]}</PageHeader>

      <Text className="my-2" color="bodyLight">
        All batch IBAN files are shown here.{' '}
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
            labelByStatus={{
              ...labelByStatus,
            }}
            searchOptions={options}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ dateValue, filters, searchBy }, options, {
              ...labelByStatus,
            })}
            onRemove={handleRemove}
          />
        </div>
        {canUpload && (
          <CanWrite code={20008}>
            <div>
              <SampleFileDropdown
                className="mr-2"
                onDownloadClick={downloadSampleFile}
              />
              <Button
                data-event-name="Primary_Button"
                primary
                className="ml-2"
                onClick={() =>
                  emitUserValidation(() => setModalType(MODAL_TYPE.UPLOAD))
                }
              >
                Upload File
              </Button>
            </div>
          </CanWrite>
        )}
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData(handleDownload)}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          downloadSampleFile={downloadSampleFile}
        />
      )}
    </>
  );
};

export default withReadPermission(BatchIbanValidation, {
  code: 20003,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.BATCH_IBAN]} ${
    LABEL_BY_MENU[MENU.BENEFICIARIES]
  }`,
});
