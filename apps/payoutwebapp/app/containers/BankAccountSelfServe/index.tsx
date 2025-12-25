import React, { useState, useEffect } from 'react';
import { Button } from '@cashfree-intl/coherent';

// Components
import FormWizard from 'components/FormWizard';

// Images
import crownYellowImg from 'images/crown-yellow.svg';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { MODAL_TYPE, STATUS } from 'containers/AllFundSources/constants';
import { totalStepsByBank } from './constants';

// Providers
import { BankAccountSelfServeContext } from './providers';

// Helpers
import { getFormWizardItems } from './helpers';

// Services
import { getGateway } from 'services/fundSources';

// Types
import type { WizardDataState } from 'containers/PayoutAggregator/types';
// import type { BankAccountSelfServeProps } from './types';

type BankAccountSelfServeProps = {
  isRouter?: boolean;
  selectedRow?: AnyObject;
  fundSources: AnyObject[];
  fetchFundSources: () => void;
  setModalType: React.Dispatch<React.SetStateAction<MODAL_TYPE>>;
  modalData?: AnyObject;
  setModalData: React.Dispatch<React.SetStateAction<AnyObject>>;
  handleClose: () => void;
};

const BankAccountSelfServe: React.FC<BankAccountSelfServeProps> = ({
  isRouter,
  selectedRow,
  fundSources,
  fetchFundSources,
  setModalType,
  modalData,
  setModalData,
  handleClose,
}) => {
  let initialActiveIndex = 0;
  let initialBankName: string | undefined;
  let initialFundSourceId: number | undefined;

  let lead: AnyObject | null = null;

  if (selectedRow) {
    initialBankName = selectedRow.bankName || selectedRow.connBankName;
    initialFundSourceId = selectedRow.fundSourceId;

    lead = selectedRow.leadType ? selectedRow : null;

    switch (selectedRow.status) {
      case STATUS.AWAITING_CONNECTION:
        initialActiveIndex = 1;
        break;

      case STATUS.LEAD_APPROVED:
        initialActiveIndex = 1;
        break;

      case STATUS.SKIP_UAT:
      case STATUS.UAT_CREDS_VERIFIED:
        initialActiveIndex =
          totalStepsByBank[initialBankName as keyof typeof totalStepsByBank] -
          2;
        break;

      case STATUS.PROD_CREDS_VERIFIED:
        initialActiveIndex =
          totalStepsByBank[initialBankName as keyof typeof totalStepsByBank] -
          1;
        break;

      default:
        initialActiveIndex = 0;
        break;
    }
  }

  const [wizardData, setWizardData] = useState<WizardDataState>({
    bankName: initialBankName,
    fundSourceId: initialFundSourceId,
    lead,
  });

  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  useEffect(() => {
    if (!wizardData.bankName) {
      return;
    }

    (async function fetchData() {
      const response = await getGateway({ gatewayName: wizardData.bankName });

      if (!('error' in response)) {
        setWizardData((prev) => ({ ...prev, gateway: response }));
      }
    })();
  }, [wizardData.bankName]);

  const handleStepChange = (newActiveIndex: number): void => {
    setActiveIndex(newActiveIndex);
    fetchFundSources();
  };

  const items = getFormWizardItems({
    isRouter,
    wizardData,
    fundSources,
    setModalType,
    modalData,
    setModalData,
  });

  return (
    <BankAccountSelfServeContext.Provider value={{ wizardData, setWizardData }}>
      <FormWizard
        header={{
          title: 'Add Connected Account',
          subTitle: 'Add your existing current account as a fund source',
          actionButtons: isRouter
            ? undefined
            : ({
                setActionType,
              }: {
                setActionType: React.Dispatch<
                  React.SetStateAction<ACTION_TYPE>
                >;
              }) =>
                activeIndex === 0 && (
                  <Button
                    secondary
                    size="small"
                    className="mr-4"
                    icon={crownYellowImg}
                    iconPosition="left"
                    data-event-name="Secondary_Add_Bank_Account"
                    onClick={() => setActionType(ACTION_TYPE.HEADER_SETUP_FEE)}
                  >
                    Benefits of Connected Banking
                  </Button>
                ),
        }}
        closeConfirm={{
          title: 'Cancel Fund Source Addition',
          body: 'Are you sure you want to cancel the addition now? You can always resume the journey from Fund Sources list page.',
        }}
        items={items}
        activeIndex={activeIndex}
        onStepChange={handleStepChange}
        onClose={handleClose}
      />
    </BankAccountSelfServeContext.Provider>
  );
};

export default BankAccountSelfServe;
