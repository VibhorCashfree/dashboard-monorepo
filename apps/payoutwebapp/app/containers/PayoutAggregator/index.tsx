import React, { useState, useEffect } from 'react';

// Components
import FormWizard from 'components/FormWizard';

// Constants
import { STATUS } from 'containers/AllFundSources/constants';

// Providers
import { PayoutAggregatorContext } from './providers';

// Helpers
import { getFormWizardItems } from './helpers';

// Services
import { getGateway } from 'services/fundSources';

// Types
import type { WizardDataState, PayoutAggregatorProps } from './types';

const PayoutAggregator: React.FC<PayoutAggregatorProps> = ({
  selectedRow,
  fundSources,
  fetchFundSources,
  setModalType,
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

      case STATUS.SKIP_UAT:
      case STATUS.UAT_CREDS_VERIFIED:
      case STATUS.PROD_CREDS_VERIFIED:
        initialActiveIndex = 2;
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
    wizardData,
    fundSources,
    setModalType,
  });

  return (
    <PayoutAggregatorContext.Provider value={{ wizardData, setWizardData }}>
      <FormWizard
        header={{
          title: 'Add Payout Aggregator',
          subTitle: '',
        }}
        closeConfirm={{
          title: 'Cancel Fund Source Addition',
          body: 'Are you sure you want to cancel the addition now? You can always resume the journey from Fund Sources list page.',
        }}
        items={items}
        activeIndex={activeIndex}
        onStepChange={handleStepChange}
        onClose={() => handleClose()}
      />
    </PayoutAggregatorContext.Provider>
  );
};

export default PayoutAggregator;
