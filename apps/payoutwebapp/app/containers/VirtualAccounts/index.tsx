import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DataTable,
  Icon,
  Text,
  Space,
  Button,
  Popup,
} from '@cashfree-intl/coherent';

// Providers
import { useEscrowAccount } from 'pages/OneEscrow/providers';

// Utils
import { emitUserValidation } from 'utils/common';

// Components
import Modals from './components/Modals';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';
import { ACTION_TYPE, MODAL_TYPE } from './constants';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { BtnContainer } from 'styled/common';

const VirtualAccounts: React.FC = () => {
  const { virtualAccounts, setFetchCounter } = useEscrowAccount();

  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [selectedRow, setSelectedRow] = useState<AnyObject>({});

  const navigate = useNavigate();

  const handleAction =
    (row: AnyObject) => (e: React.MouseEvent, itemSelected: ACTION_TYPE) => {
      e.stopPropagation();

      switch (itemSelected) {
        case ACTION_TYPE.INTERNAL_FUND_TRANSFER:
        case ACTION_TYPE.INITIATE_PAYOUT:
        case ACTION_TYPE.DELETE:
          setSelectedRow(row);
          setModalType(itemSelected as unknown as MODAL_TYPE);
          break;
      }
    };

  const handleRowClick = (row: AnyObject) => {
    navigate(
      `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
        PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]
      }/${PATH_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS]}/${
        row.fundSourceId
      }/details`,
      {
        state: { rowDetails: row },
      },
    );
  };

  return (
    <>
      <Space
        justifyContent="space-between"
        alignItems="center"
        className="mt-3"
      >
        <div>
          <Text variant="h16" className="mt-3">
            List Of Created Virtual Accounts
          </Text>
          <Text variant="b12" color="bodyLight" className="mt-1 mb-2">
            Find and manage all the virtual accounts created on top of your
            escrow account.
          </Text>
        </div>
        <BtnContainer className="mt-0">
          <Popup
            hoverable
            content={
              <Text variant="b12" color="bodyLight">
                Move funds from your escrow to
                <br /> your virtual account effortlessly
              </Text>
            }
            trigger={
              <Button
                data-event-name="Secondary_Button"
                secondary
                className="ml-2"
                onClick={() =>
                  emitUserValidation(() =>
                    setModalType(MODAL_TYPE.ALLOCATE_FUNDS),
                  )
                }
              >
                Allocate Funds
              </Button>
            }
          />
        </BtnContainer>
      </Space>
      <DataTable
        columns={getFormattedRowData(virtualAccounts, handleAction)}
        records={virtualAccounts}
        noRecords={{
          text: 'No data found!',
          icon: <Icon name="noRecordsTableIcon" />,
        }}
        onRowClick={(row: AnyObject) => handleRowClick(row.original)}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};

export default VirtualAccounts;
