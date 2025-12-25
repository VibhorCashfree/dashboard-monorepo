import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Text, Space, Button } from '@cashfree-intl/coherent';
import _keyBy from 'lodash/keyBy';
import _omit from 'lodash/omit';

// ActionTypes
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Services
import {
  connect as connectFn,
  getAllFS,
  getAllFSCount,
} from 'services/fundSources';

// Actions
import fetchFundSourcesAction from 'redux/actions/fetchFundSources';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Alert from 'components/Alert';
import CanWrite from 'components/CanWrite';
import RegionBasedRenderer from 'components/RegionBasedRenderer';
import DataTableWithPagination from 'components/DataTableWithPagination';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Modals from './components/Modals';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';
import { useWeightage } from 'providers/WeightageProvider';

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT, REGION } from 'constants/common';
import EVENTS from 'constants/events';
import { BANK_CODE } from 'constants/banks';
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import {
  filtersConfig,
  labelByStatus,
  ACTION_TYPE,
  MODAL_TYPE,
  STATUS,
} from './constants';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Utils
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import Banks from 'utils/banks';
import { emitUserValidation, joinWithAnd } from 'utils/common';
import hasPermission from 'utils/hasPermission';
import { getNewFundSources } from './utils';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer } from 'styled/common';

// Types
import type { AllFundSourcesProps } from './types';

const AllFundSources: React.FC<AllFundSourcesProps> = ({
  fundSources,
  downtimes,
  fetchFundSources,
}) => {
  const { merchantDetails, restrictionCodes } = useMerchant();
  const { preferences } = useAccount();
  const { weightage } = useWeightage();

  const location = useLocation();

  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [modalData, setModalData] = useState<AnyObject | undefined>();
  const [selectedRow, setSelectedRow] = useState<AnyObject | undefined>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnyObject>();
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [filters, setFilters] = useState<AnyObject>({});

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();

  const fundSourceById = _keyBy(fundSources, 'fundSourceId');

  useEffect(() => {
    if (location.state) {
      const { modalType, lead } = location.state;

      setModalType(modalType);

      if (lead.fundSourceId) {
        const fundSource = fundSourceById[lead.fundSourceId];
        setSelectedRow(fundSource);
      }

      setModalData({ lead });

      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  useEffect(() => {
    (async function fetchData() {
      const status = Object.keys(filters);

      const queryObj: PaginationQueryObj = {
        status: status.filter((v) => v !== 'search'),
        withPagination: true,
        size: limit,
        product: 'CSP',
      };

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      setLoading(true);

      const response = await getAllFS(queryObj);
      const countResponse = await getAllFSCount(queryObj);

      if (!('error' in response || 'error' in countResponse)) {
        setData({
          data: response.data,
          count: countResponse.count,
          hasNext: response.hasNext,
        });
      } else {
        setData({
          data: [],
          count: 0,
          hasNext: false,
        });
      }

      setLoading(false);
    })();
  }, [currentPage, limit, filters, fundSources]);

  const handleAction =
    (row: AnyObject) =>
    async (e: React.MouseEvent, itemSelected: ACTION_TYPE) => {
      e.stopPropagation();

      setSelectedRow(row);

      const bankCode = Banks.getCode(row.ifsc);

      switch (itemSelected) {
        case ACTION_TYPE.CONNECT:
          setModalType(MODAL_TYPE.CREATE_BANK_ACCOUNT);
          break;

        case ACTION_TYPE.UPDATE_DETAILS:
          setModalType(MODAL_TYPE.UPDATE_DETAILS);
          break;

        case ACTION_TYPE.DEACTIVATE:
          emitUserValidation(() => setModalType(MODAL_TYPE.DEACTIVATE));
          break;

        case ACTION_TYPE.APPROVE:
          switch (bankCode) {
            case BANK_CODE.ICIC:
              setModalType(MODAL_TYPE.APPROVE_ICIC);
              break;

            case BANK_CODE.YESB:
              {
                const response = await connectFn(row.fundSourceId);

                if (!('error' in response)) {
                  if (response.status === STATUS.ACTIVE) {
                    fetchFundSources();
                  } else if (response.rawBankData) {
                    setModalData({
                      rawBankData: response.rawBankData,
                    });

                    setModalType(MODAL_TYPE.INVALID_ACCOUNT_YESB);
                  }
                } else {
                  setModalData({
                    url: (response.error as { title: string }).title,
                  });

                  setModalType(MODAL_TYPE.APPROVE_YESB);
                }
              }
              break;
          }
          break;
      }
    };

  const onPageChange = (
    type: COMMON_ACTION_TYPE.PREV | COMMON_ACTION_TYPE.NEXT,
  ) => {
    setCurrentPage((currentPage) => {
      switch (type) {
        case COMMON_ACTION_TYPE.NEXT:
          return currentPage + 1;
        case COMMON_ACTION_TYPE.PREV:
          return currentPage - 1;
        default:
          return currentPage;
      }
    });
  };

  const onLimitChange = (e: React.MouseEvent, data: { value: number }) => {
    setLimit(data.value);
    setCurrentPage(1);

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRowClick = (row: AnyObject) => {
    navigate(`/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${row.fundSourceId}/details`);
  };

  const handleCreate = () => {
    emitUserValidation(() => {
      setModalType(MODAL_TYPE.CREATE_BANK_ACCOUNT);
    });
  };

  const handleFiltersChange = (filters: AnyObject) => {
    setFilters(filters);
    setCurrentPage(1);

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      filters,
    });
  };

  const handleRemove = (key: string) => {
    setFilters(_omit(filters, key));
    setCurrentPage(1);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      type: 'individual',
    });
  };

  const newDisplayNames = getNewFundSources(fundSources);
  const joinedNewDisplayNames = joinWithAnd(newDisplayNames);

  const canVerify = hasPermission(restrictionCodes, merchantDetails.userType, [
    27001,
  ]);

  return (
    <>
      <PageHeader>
        {LABEL_BY_SUBMENU[SUBMENU.ALL]} {LABEL_BY_MENU[MENU.FUND_SOURCES]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.ALL]} ${
          LABEL_BY_MENU[MENU.FUND_SOURCES]
        }`}
      />

      <Text className="mt-2 mb-4" color="bodyLight">
        Add and connect your bank accounts with Cashfree Payments to make
        payouts.
      </Text>

      {newDisplayNames.length > 0 && (
        <Alert className="mb-3" type="success" bordered rounded>
          <Alert.Content size="md">
            {joinedNewDisplayNames}{' '}
            {newDisplayNames.length > 1
              ? 'are now active fund sources'
              : 'is now an active fund source'}
            . You can specify the percentage of transfers to be routed via this
            fund source.
          </Alert.Content>
          <Alert.Actions>
            <Button
              data-event-name="Primary_Button"
              primary
              size="small"
              onClick={() => setModalType(MODAL_TYPE.UPDATE_WEIGHTAGE)}
            >
              Update Weightage
            </Button>
          </Alert.Actions>
        </Alert>
      )}

      <FilterRowContainer>
        <div>
          <FilterPopover
            config={filtersConfig}
            labelByStatus={labelByStatus}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ filters }, [], labelByStatus)}
            onRemove={handleRemove}
          />
        </div>
        <RegionBasedRenderer regions={[REGION.IN]}>
          <Space gap={2} justifyContent="flex-end" className="pb-3">
            <CanWrite code={27001} remove>
              <CanWrite code={27002} remove>
                {fundSources.length > 1 && (
                  <Button
                    data-event-name="Primary_Button"
                    link
                    onClick={() => setModalType(MODAL_TYPE.UPDATE_WEIGHTAGE)}
                  >
                    Manage Fund Source Weightage
                  </Button>
                )}
              </CanWrite>
            </CanWrite>

            <CanWrite code={27003} remove>
              <Button
                data-event-name="Primary_Button"
                primary
                onClick={handleCreate}
              >
                Add Bank Account
              </Button>
            </CanWrite>
          </Space>
        </RegionBasedRenderer>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData(
          fundSources.length,
          canVerify,
          downtimes,
          weightage,
          restrictionCodes,
          merchantDetails.userType,
          preferences,
          handleAction,
        )}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        onRowClick={handleRowClick}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          modalData={modalData}
          setModalData={setModalData}
        />
      )}
    </>
  );
};

const mapStateToProps = ({
  fundSources,
  downtimes,
}: {
  fundSources: AnyObject[];
  downtimes: AnyObject[];
}) => ({
  fundSources,
  downtimes,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchFundSources: () => dispatch(fetchFundSourcesAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(AllFundSources);
