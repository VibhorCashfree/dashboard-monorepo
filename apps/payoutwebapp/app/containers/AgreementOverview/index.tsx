import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Loader,
  Text,
  Space,
  Paper,
  Button,
  toast,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _groupBy from 'lodash/groupBy';

// Constants
import { STATUS, MODAL_TYPE } from '../AllAgreements/constants';

// Utils
import {
  formatAmount,
  triggerDownload,
  emitUserValidation,
} from 'utils/common';

// Services
import { getDetails, download, markTerminalStatus } from 'services/agreements';

// Components
import Copy from 'components/Copy';
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import CanWrite from 'components/CanWrite';
import EscrowParty from './components/EscrowParty';
import PartiesTransferDetails from './components/PartiesTransferDetails';
import Modals from '../AllAgreements/components/Modals';

// Styled
import { DetailsRow, Divider } from 'styled/common';

const AgreementOverview: React.FC = () => {
  const [data, setData] = useState<AnyObject | undefined>(undefined);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [fetchCounter, setFetchCounter] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    (async function fetchData() {
      const response = await getDetails(+id!);

      if (!('error' in response)) {
        setData(response);
      }
    })();
  }, [fetchCounter]);

  const downloadAgreement = async () => {
    const response = await download(id!);

    if (!('error' in response)) {
      triggerDownload({ type: 'URL', payload: response.file_url });
    }
  };

  const rejectAgreement = async () => {
    const response = await markTerminalStatus({
      agreement_id: data?.agreement_id,
      status: 'REJECTED',
    });

    if ('error' in response) {
      toast.error((response.error as { message: string }).message);
    } else {
      toast.success('Agreement Marked as Rejected');
    }

    window.location.reload();
  };

  if (!data) {
    return <Loader active />;
  }

  const { BUYER: buyers = [], SELLER: sellers = [] } = _groupBy(
    data.parties,
    'type',
  );

  let actions;

  switch (data.status) {
    case STATUS.INITIATED:
      actions = (
        <div className="text-right my-3">
          <CanWrite code={28502}>
            <Space gap={2} justifyContent="flex-end">
              <Button
                primary
                iconPosition="left"
                onClick={() => emitUserValidation(() => rejectAgreement())}
                icon={<Icon name={'stop'} fill="white" />}
              >
                Reject
              </Button>
            </Space>
          </CanWrite>
        </div>
      );
      break;

    case STATUS.REFUND:
    case STATUS.SUCCESS:
    case STATUS.SIGNED:
      actions = (
        <Space gap={2} justifyContent="flex-end" className="mt-3">
          <Button
            iconPosition="right"
            onClick={() => emitUserValidation(() => downloadAgreement())}
            icon={<Icon name="download" className="ml-1" />}
          >
            Download Agreement
          </Button>
          {data.status === STATUS.SIGNED && (
            <CanWrite code={28502}>
              <Button
                primary
                iconPosition="right"
                onClick={() =>
                  emitUserValidation(() =>
                    setModalType(MODAL_TYPE.MARK_TERMINAL_STATUS),
                  )
                }
              >
                Mark Terminal Status
              </Button>
            </CanWrite>
          )}
        </Space>
      );
      break;

    default:
      return null;
  }

  return (
    <>
      {actions}

      <Paper className="mt-3">
        <Space justifyContent="space-between" alignItems="center">
          <Space gap={5}>
            <div>
              <Text color="bodyLight" className="mb-1">
                Agreement ID
              </Text>
              <Text variant="h16">
                {data.agreement_id}
                <Copy value={data.agreement_id} />
              </Text>
            </div>
            <div>
              <Text color="bodyLight" className="mb-1">
                Amount
              </Text>
              <Text variant="h16">{formatAmount(data.total_amount)}</Text>
            </div>
          </Space>
          <Space>
            <div className="text-right">
              <Text color="bodyLight" className="mb-1">
                Agreement Status
              </Text>
              <StatusLabel className="mb-1" filled>
                {data.status}
              </StatusLabel>
            </div>
          </Space>
        </Space>

        <Text variant="h16" strong className="my-3">
          Basic Details
        </Text>

        <DetailsRow>
          <div>
            <Text color="bodyLight">Purpose</Text>
          </div>
          <div>
            <Text className="text-wrap">{data.purpose || '–'}</Text>
          </div>
          <div>
            <Text color="bodyLight">Start Date</Text>
          </div>
          <div>
            <Text className="text-wrap">
              {moment(data.start_date).format('DD MMM YYYY') || '–'}
            </Text>
          </div>
        </DetailsRow>
        <DetailsRow>
          <div>
            <Text color="bodyLight">End Date</Text>
          </div>
          <div>
            <Text className="text-wrap">
              {moment(data.expiry_date).format('DD MMM YYYY') || '–'}
            </Text>
          </div>
          <div />
          <div />
        </DetailsRow>

        <Divider />

        <Text variant="h16" strong className="my-3">
          Escrow Parties
        </Text>

        {buyers.map((party, index) => (
          <EscrowParty key={party.pan} data={party} index={index} />
        ))}

        {sellers.map((party, index) => (
          <EscrowParty key={party.pan} data={party} index={index} />
        ))}

        {[STATUS.REFUND, STATUS.SUCCESS].includes(data.status) && (
          <>
            <Divider />
            <Text variant="h16" strong className="my-3">
              Transfer Details
            </Text>
          </>
        )}

        {data.status === STATUS.REFUND &&
          buyers.map((buyer) => (
            <PartiesTransferDetails key={buyer.pan} data={buyer} />
          ))}

        {data.status === STATUS.SUCCESS && (
          <>
            {sellers.map((seller) => (
              <PartiesTransferDetails key={seller.pan} data={seller} />
            ))}

            {buyers
              .filter((buyer) => _get(buyer, 'transfer_detail.transfer_id'))
              .map((buyer) => (
                <PartiesTransferDetails key={buyer.pan} data={buyer} />
              ))}
          </>
        )}
      </Paper>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          data={data}
        />
      )}
    </>
  );
};

export default AgreementOverview;
