import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { DataTable, Text, Space, Button } from '@cashfree-intl/coherent';

// Services
import { connect as connectFn, getAllLeads } from 'services/fundSources';

// Actions
import fetchFundSourcesAction from 'redux/actions/fetchFundSources';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Icon from 'components/Icon';
import CanWrite from 'components/CanWrite';
import DropdownButton from 'components/DropdownButton';
import RegionBasedRenderer from 'components/RegionBasedRenderer';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';

// Constants
import { REGION } from 'constants/common';
import { BANK_CODE } from 'constants/banks';
import { FS_DISPLAY_TYPE, AGGREGATOR } from 'constants/fundSources';
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_SUBMENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';
import {
  ACTION_TYPE,
  MODAL_TYPE,
  STATUS,
} from 'containers/AllFundSources/constants';
import { addOptions } from './constants';

// Components
import Modals from 'containers/AllFundSources/components/Modals';

// Utils
import Analytics from 'utils/analytics';
import Banks from 'utils/banks';
import { emitUserValidation } from 'utils/common';
import Region from 'utils/region';

// Helpers
import { getFormattedRowData } from './helpers';

// Types
import type { AggregatorsProps } from './types';

const Aggregators: React.FC<AggregatorsProps> = ({
  fundSources,
  downtimes,
  fetchFundSources,
}) => {
  const { merchantDetails, restrictionCodes } = useMerchant();
  const { preferences } = useAccount();

  const [leads, setLeads] = useState<AnyObject[]>([]);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [modalData, setModalData] = useState<AnyObject>();
  const [selectedRow, setSelectedRow] = useState<AnyObject | undefined>();

  const navigate = useNavigate();

  const region: string = Region.get();

  useEffect(() => {
    (async function fetchData() {
      const response = await getAllLeads({ size: 100 });

      if (!('error' in response)) {
        setLeads(response.data.filter((lead: any) => !lead.fundSourceId));
      }
    })();
  }, []);

  const handleAction =
    (row: AnyObject) =>
    async (e: React.MouseEvent, itemSelected: ACTION_TYPE) => {
      e.stopPropagation();

      setSelectedRow(row);

      switch (itemSelected) {
        case ACTION_TYPE.CONNECT:
          if (row.connBankName === AGGREGATOR.RAZORPAY) {
            setModalType(MODAL_TYPE.CREATE_AGGREGATOR);
          } else {
            setModalType(MODAL_TYPE.CREATE_ROUTER_BANK_ACCOUNT);
          }
          break;

        case ACTION_TYPE.UPDATE_DETAILS:
          setModalType(MODAL_TYPE.UPDATE_DETAILS);
          break;

        case ACTION_TYPE.APPROVE:
          {
            const bankCode: string = Banks.getCode(row.ifsc);

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
          }

          break;
      }
    };

  const handleRowClick = (row: AnyObject) => {
    if (row.fundSourceId) {
      navigate(
        `/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${row.fundSourceId}/details`,
      );
    }
  };

  const handleCreate = (value: string) => {
    emitUserValidation(() => {
      switch (value) {
        case FS_DISPLAY_TYPE.BANK_ACCOUNT:
          setModalType(MODAL_TYPE.CREATE_ROUTER_BANK_ACCOUNT);
          break;

        case 'AGGREGATOR':
          setModalType(MODAL_TYPE.CREATE_AGGREGATOR);
          break;
      }
    });

    Analytics.track('Dropdown_Add_Fundsource', {
      value,
    });
  };

  return (
    <>
      <PageHeader>Router – {LABEL_BY_SUBMENU[SUBMENU.AGGREGATORS]}</PageHeader>
      <MetaTags title={`Router – ${LABEL_BY_SUBMENU[SUBMENU.AGGREGATORS]}`} />
      <Text className="mt-2 mb-4" color="bodyLight">
        {region === REGION.AE
          ? 'Add and connect your bank accounts with Cashfree Payments to make payouts.'
          : 'Add/manage payout aggregators or bank accounts to configure your payment routing preferences.'}
      </Text>

      <RegionBasedRenderer regions={[REGION.IN]}>
        <Space
          gap={4}
          alignItems="center"
          justifyContent="flex-end"
          className="pb-3"
        >
          <CanWrite code={27001} remove>
            <CanWrite code={27002} remove>
              {fundSources.length > 1 && (
                <Link
                  to={`/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
                    PATH_BY_SUBMENU[SUBMENU.CONFIGURATIONS]
                  }`}
                  className="link"
                >
                  Routing Configurations
                </Link>
              )}
            </CanWrite>
          </CanWrite>

          <CanWrite code={27003} remove>
            <DropdownButton options={addOptions} onClick={handleCreate}>
              {(open: boolean) => (
                <Button
                  data-event-name="Primary_Button"
                  primary
                  iconPosition="right"
                  icon={
                    <Icon
                      name={open ? 'chevron-up' : 'chevron-down'}
                      fill="white"
                      className="ml-1"
                    />
                  }
                >
                  Add Bank / Aggregator
                </Button>
              )}
            </DropdownButton>
          </CanWrite>
        </Space>
      </RegionBasedRenderer>

      <DataTable
        columns={getFormattedRowData(
          downtimes,
          restrictionCodes,
          merchantDetails.userType,
          preferences,
          handleAction,
        )}
        records={fundSources.concat(leads)}
        onRowClick={(row: AnyObject) => handleRowClick(row.original)}
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

export default withConnect(Aggregators);
