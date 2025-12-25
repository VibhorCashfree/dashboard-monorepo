import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Button,
  DateFilter,
  DownloadSamplePopup,
} from '@cashfree-intl/coherent';
import moment from 'moment';
import _omit from 'lodash/omit';
import _keys from 'lodash/keys';
import _without from 'lodash/without';

// ActionTypes
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Services
import {
  getBatches,
  getBatchesCount,
  downloadBatchReport,
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
import { getBenePurposeOptions } from './utils';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { BENE_PURPOSE } from 'constants/common';
import EVENTS from 'constants/events';
import { KNOW_MORE } from 'constants/urls';
import { DEFAULT_VALUE, FORMATS, DATE_RANGE_OPTIONS } from 'constants/date';
import { filtersConfig, labelByStatus, options, MODAL_TYPE } from './constants';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import MetaTags from 'components/MetaTags';
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

const BatchBeneficiaries: React.FC = () => {
  const { preferences } = useAccount();
  const { state, dispatch } = useList();

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [openSamplePopup, setSamplePopup] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);
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

      const status: string[] = _without(
        _keys(filters),
        'search',
        ..._keys(BENE_PURPOSE),
      );
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

      const dataPromise = getBatches(queryObj);
      const countPromise = isFirstPage && getBatchesCount(queryObj);

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

    const response = await downloadBatchReport(row.id);

    Analytics.track(EVENTS.DOWNLOAD_REPORT, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
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

  const handleRowClick = (row: { id: string }) => {
    navigate(`/${PATH_BY_MENU[MENU.BENEFICIARIES]}/batch/${row.id}/details`, {
      state: {
        batchRowDetails: row,
      },
    });
  };

  const handleRemove = (key: string) => {
    const isRangeFilter: boolean = key === 'RANGE';

    const type = isRangeFilter
      ? COMMON_ACTION_TYPE.SET_DATE_VALUE
      : COMMON_ACTION_TYPE.SET_FILTERS;
    const payload: any = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
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
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      filters,
      search_by: searchBy,
    });
  };

  const handleDateChange = (dateValue: DateRangeValue) => {
    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      date_value: dateValue,
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
      payload: dateValue,
    });
  };

  const downloadSampleFile = async (selected: string | null, type: string) => {
    if (!selected) {
      return;
    }

    const queryObj = {
      fileType: selected,
      type,
    };

    const response = await getSampleFile(queryObj);

    Analytics.track(EVENTS.DOWNLOAD_SAMPLE, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
    });

    if (!('error' in response)) {
      triggerDownload({ type: 'URL', payload: response.fileUrl });
    }

    setSamplePopup(false);
  };

  const canUpload: boolean = preferences.beneficiaries.purpose.others;

  const benePurposeOptions: any[] = getBenePurposeOptions(
    preferences.beneficiaries.purpose,
  );

  return (
    <>
      <PageHeader embedKey="BENE">
        {LABEL_BY_SUBMENU[SUBMENU.BATCH]} {LABEL_BY_MENU[MENU.BENEFICIARIES]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.BATCH]} ${
          LABEL_BY_MENU[MENU.BENEFICIARIES]
        }`}
      />

      <Text className="my-2" color="bodyLight">
        All Beneficiaries including batch are shown here.{' '}
        <a
          href={KNOW_MORE.BENEFICIARY.BATCH}
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
            labelByStatus={{
              ...labelByStatus,
              [BENE_PURPOSE.CORP_CC]: 'Corporate Credit Card',
              [BENE_PURPOSE.AMAZON_UPI_BENE]: 'Amazon Pay Wallet',
              [BENE_PURPOSE.BULK_BENE]: 'Others',
            }}
            searchOptions={options}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ dateValue, filters, searchBy }, options, {
              ...labelByStatus,
              [BENE_PURPOSE.CORP_CC]: 'Corporate Credit Card',
              [BENE_PURPOSE.AMAZON_UPI_BENE]: 'Amazon Pay Wallet',
              [BENE_PURPOSE.BULK_BENE]: 'Others',
            })}
            onRemove={handleRemove}
          />
        </div>
        {canUpload && (
          <CanWrite code={20008}>
            <div>
              <DownloadSamplePopup
                open={openSamplePopup}
                options={benePurposeOptions}
                onOpen={() => setSamplePopup((prev) => !prev)}
                onClose={() => setSamplePopup(false)}
                onDownloadClick={downloadSampleFile}
              />
              <Button
                data-event-name="Primary_Button"
                primary
                className="ml-4"
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
        onRowClick={handleRowClick}
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

export default withReadPermission(BatchBeneficiaries, {
  code: 20003,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.BATCH]} ${
    LABEL_BY_MENU[MENU.BENEFICIARIES]
  }`,
});
