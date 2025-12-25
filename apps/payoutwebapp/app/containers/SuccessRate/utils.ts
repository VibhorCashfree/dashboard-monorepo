import _get from 'lodash/get';

// Constants
import { COLLATE_MAP } from './constants';

// Types
import type { BankStatusDetail, DataElement, StatusMaps } from './types';

export const getStatusMaps = (data: DataElement[]): StatusMaps => {
  const statusDateMap: Record<string, Record<string, number>> = {};
  const bankStatusDateMap: Record<
    string,
    Record<string, Record<string, number>>
  > = {};

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    statusDateMap[element.status] = statusDateMap[element.status] || {};

    for (let j = 0; j < element.dateDetail.length; j++) {
      const subElement = element.dateDetail[j];

      statusDateMap[element.status][subElement.addedDate] =
        subElement.statusRate;

      bankStatusDateMap[element.status] =
        bankStatusDateMap[element.status] || {};

      for (let k = 0; k < subElement.bankStatusDetail.length; k++) {
        const value = subElement.bankStatusDetail[k];

        const collatedBankStatus = _get(COLLATE_MAP, [
          element.status,
          value.bankStatus,
        ]);
        const bankStatus = collatedBankStatus || value.bankStatus;

        bankStatusDateMap[element.status][bankStatus] =
          bankStatusDateMap[element.status][bankStatus] || {};

        if (
          bankStatusDateMap[element.status][bankStatus][subElement.addedDate]
        ) {
          bankStatusDateMap[element.status][bankStatus][subElement.addedDate] +=
            Number(value.totalTransfer);
        } else {
          bankStatusDateMap[element.status][bankStatus][subElement.addedDate] =
            Number(value.totalTransfer);
        }
      }
    }
  }

  return {
    statusDateMap,
    bankStatusDateMap,
  };
};

export const getTotalByDate = (
  bankStatusDateMap: Record<string, Record<string, Record<string, number>>>,
  dateString: string,
): number =>
  Object.keys(bankStatusDateMap)
    .map((status) => Object.values(bankStatusDateMap[status]))
    .flat()
    .reduce(function (acc: number, curr: Record<string, number>) {
      acc += Number(_get(curr, [dateString], 0));
      return acc;
    }, 0);

export const getTotalByDateForStatus = (
  data: DataElement[],
  dateString: string,
  status: string,
): number => {
  try {
    // @ts-ignore
    const { dateDetail } = data.find((d) => d.status === status);

    const { bankStatusDetail } = dateDetail.find(
      (d: AnyObject) => d.addedDate === dateString,
    );

    return bankStatusDetail.reduce(function (
      acc: number,
      curr: BankStatusDetail,
    ) {
      acc += Number(curr.totalTransfer);
      return acc;
    },
    0);
  } catch (error) {
    return 0;
  }
};
