import React, { createContext, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Loader } from '@cashfree-intl/coherent';
import _size from 'lodash/size';

// Services
import { getDetails, getServiceChargesCount } from 'services/fundSources';

// Constants
import { FORMATS } from 'constants/date';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import { INVOICING_TYPE } from 'containers/AllFundSources/constants';

// Utils
import FundSourcesUtil from 'utils/fundSources';

type ContextType = {
  details: AnyObject;
  showServiceCharges: boolean;
};

export const DetailsContext = createContext<ContextType | undefined>(undefined);

const Provider = ({
  fundSources,
  children,
}: {
  fundSources: AnyObject[];
  children: React.ReactNode;
}) => {
  const [contextData, setContextData] = useState<ContextType | undefined>(
    undefined,
  );

  const { id } = useParams();

  useEffect(() => {
    if (!_size(fundSources)) {
      return;
    }

    (async function fetchData() {
      const details = await getDetails(+id!);

      const queryObj = {
        startDate: moment('2023').format(FORMATS.START_DATE),
        endDate: moment().format(FORMATS.END_DATE),
      };

      const serviceCharges = await getServiceChargesCount(
        details.fundSourceId,
        queryObj,
      );

      const fsPreferences = FundSourcesUtil.getPreferences(
        fundSources,
        details.fundSourceId,
      );

      const showServiceCharges =
        details.fsDisplayType === FS_DISPLAY_TYPE.BANK_ACCOUNT &&
        (fsPreferences[INVOICING_TYPE.BANK_ACCOUNT] ||
          (serviceCharges as { count: number; totalAmount: number })
            .totalAmount > 0);

      setContextData({
        details,
        showServiceCharges,
      });
    })();
  }, [fundSources]);

  if (!contextData) {
    return <Loader active />;
  }

  return (
    <DetailsContext.Provider value={contextData}>
      {children}
    </DetailsContext.Provider>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export const DetailsProvider = withConnect(Provider);

export const useDetails = () => {
  const context = useContext(DetailsContext);

  if (context === undefined) {
    throw new Error('useDetails must be used within a DetailsProvider');
  }

  return context;
};
