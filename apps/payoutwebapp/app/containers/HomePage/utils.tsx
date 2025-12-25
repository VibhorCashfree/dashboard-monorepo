import _identity from 'lodash/identity';

// Components
import {
  Summary,
  Beneficiaries,
  Transfers,
  Cashgrams,
  Account,
  OneEscrow,
  Router,
  FundSources,
  Downtimes,
  ERP,
  Reports,
  Payouts,
  Developers,
  RiskShield,
} from 'components/SidebarIcons';

// Constants
import { PO_RISK_SHIELD, REGION } from 'constants/common';
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';

// Utils
import Region from 'utils/region';
import Env from 'utils/env';

export const getMenuItems = (
  cfProductStatus: { CSP: string },
  featureFlags: { [x: string]: any },
  preferences: {
    beneficiaries: { purpose: { amazonUPI: any } };
    transfers: { batch: any; approve: any };
    cashgrams: { batch: any; verify: any };
    enableOneEscrow: boolean;
    enableRouter: boolean;
  },
) => {
  const isPayoutActivated = cfProductStatus.CSP === 'APPROVED';
  const region = Region.get();

  if (!(Env.isTest() || isPayoutActivated)) {
    return {
      features: {
        items: [
          {
            displayText: 'Payouts',
            name: PATH_BY_MENU[MENU.SUMMARY],
            icon: Payouts,
            rank: 1,
            key: PATH_BY_MENU[MENU.SUMMARY],
            isNew: false,
            isDisabled: false,
            isVisible: true,
            isParent: false,
          },
          {
            displayText: LABEL_BY_MENU[MENU.CASHGRAMS],
            name: PATH_BY_MENU[MENU.CASHGRAMS],
            icon: Cashgrams,
            rank: 2,
            key: PATH_BY_MENU[MENU.CASHGRAMS],
            isNew: false,
            isDisabled: false,
            isVisible: true,
            isParent: false,
          },
        ],
      },
    };
  }

  const beneficiariesChildren = [
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.ALL],
      name: PATH_BY_SUBMENU[SUBMENU.ALL],
      rank: 2,
      key: `${PATH_BY_MENU[MENU.BENEFICIARIES]}/${
        PATH_BY_SUBMENU[SUBMENU.ALL]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      name: PATH_BY_SUBMENU[SUBMENU.BATCH],
      rank: 2,
      key: `${PATH_BY_MENU[MENU.BENEFICIARIES]}/${
        PATH_BY_SUBMENU[SUBMENU.BATCH]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.BATCH_IBAN],
      name: PATH_BY_SUBMENU[SUBMENU.BATCH_IBAN],
      rank: 2,
      key: `${PATH_BY_MENU[MENU.BENEFICIARIES]}/${
        PATH_BY_SUBMENU[SUBMENU.BATCH_IBAN]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: region === REGION.AE,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.REVALIDATE],
      name: PATH_BY_SUBMENU[SUBMENU.REVALIDATE],
      rank: 2,
      key: `${PATH_BY_MENU[MENU.BENEFICIARIES]}/${
        PATH_BY_SUBMENU[SUBMENU.REVALIDATE]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: preferences.beneficiaries.purpose.amazonUPI,
      isParent: false,
    },
  ];

  const transfersChildren = [
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.ALL],
      name: PATH_BY_SUBMENU[SUBMENU.ALL],
      rank: 3,
      key: `${PATH_BY_MENU[MENU.TRANSFERS]}/${PATH_BY_SUBMENU[SUBMENU.ALL]}`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      name: PATH_BY_SUBMENU[SUBMENU.BATCH],
      rank: 3,
      key: `${PATH_BY_MENU[MENU.TRANSFERS]}/${PATH_BY_SUBMENU[SUBMENU.BATCH]}`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.APPROVE_BATCH],
      name: PATH_BY_SUBMENU[SUBMENU.APPROVE_BATCH],
      rank: 3,
      key: `${PATH_BY_MENU[MENU.TRANSFERS]}/${
        PATH_BY_SUBMENU[SUBMENU.APPROVE_BATCH]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: preferences.transfers.batch,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.APPROVE],
      name: PATH_BY_SUBMENU[SUBMENU.APPROVE],
      rank: 3,
      key: `${PATH_BY_MENU[MENU.TRANSFERS]}/${
        PATH_BY_SUBMENU[SUBMENU.APPROVE]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: preferences.transfers.approve,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.REVERSED],
      name: PATH_BY_SUBMENU[SUBMENU.REVERSED],
      rank: 3,
      key: `${PATH_BY_MENU[MENU.TRANSFERS]}/${
        PATH_BY_SUBMENU[SUBMENU.REVERSED]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
  ];

  const cashgramsChildren = [
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.ALL],
      name: PATH_BY_SUBMENU[SUBMENU.ALL],
      rank: 4,
      key: `${PATH_BY_MENU[MENU.CASHGRAMS]}/${PATH_BY_SUBMENU[SUBMENU.ALL]}`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      name: PATH_BY_SUBMENU[SUBMENU.BATCH],
      rank: 4,
      key: `${PATH_BY_MENU[MENU.CASHGRAMS]}/${PATH_BY_SUBMENU[SUBMENU.BATCH]}`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },

    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.APPROVE_BATCH],
      name: PATH_BY_SUBMENU[SUBMENU.APPROVE_BATCH],
      rank: 4,
      key: `${PATH_BY_MENU[MENU.CASHGRAMS]}/${
        PATH_BY_SUBMENU[SUBMENU.APPROVE_BATCH]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: preferences.cashgrams.batch,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY],
      name: PATH_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY],
      rank: 4,
      key: `${PATH_BY_MENU[MENU.CASHGRAMS]}/${
        PATH_BY_SUBMENU[SUBMENU.VERIFY_BENEFICIARY]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: preferences.cashgrams.verify,
      isParent: false,
    },
  ];

  const developersChildren = [
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.API_KEYS],
      name: PATH_BY_SUBMENU[SUBMENU.API_KEYS],
      rank: 10,
      key: `${PATH_BY_MENU[MENU.DEVELOPERS]}/${
        PATH_BY_SUBMENU[SUBMENU.API_KEYS]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.TWO_FACTOR_AUTH],
      name: PATH_BY_SUBMENU[SUBMENU.TWO_FACTOR_AUTH],
      rank: 10,
      key: `${PATH_BY_MENU[MENU.DEVELOPERS]}/${
        PATH_BY_SUBMENU[SUBMENU.TWO_FACTOR_AUTH]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.WEBHOOKS],
      name: PATH_BY_SUBMENU[SUBMENU.WEBHOOKS],
      rank: 10,
      key: `${PATH_BY_MENU[MENU.DEVELOPERS]}/${
        PATH_BY_SUBMENU[SUBMENU.WEBHOOKS]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.API_METRICS],
      name: PATH_BY_SUBMENU[SUBMENU.API_METRICS],
      rank: 10,
      key: `${PATH_BY_MENU[MENU.DEVELOPERS]}/${
        PATH_BY_SUBMENU[SUBMENU.API_METRICS]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_SUBMENU[SUBMENU.INTEGRATION_CHECKLIST],
      name: PATH_BY_SUBMENU[SUBMENU.INTEGRATION_CHECKLIST],
      rank: 10,
      key: `${PATH_BY_MENU[MENU.DEVELOPERS]}/${
        PATH_BY_SUBMENU[SUBMENU.INTEGRATION_CHECKLIST]
      }`,
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
  ];

  const items = [
    {
      displayText: LABEL_BY_MENU[MENU.SUMMARY],
      name: PATH_BY_MENU[MENU.SUMMARY],
      icon: Summary,
      rank: 1,
      key: PATH_BY_MENU[MENU.SUMMARY],
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: false,
    },
    {
      displayText: LABEL_BY_MENU[MENU.BENEFICIARIES],
      name: PATH_BY_MENU[MENU.BENEFICIARIES],
      icon: Beneficiaries,
      rank: 2,
      key: PATH_BY_MENU[MENU.BENEFICIARIES],
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: true,
      children: beneficiariesChildren,
    },
    {
      displayText: LABEL_BY_MENU[MENU.TRANSFERS],
      name: PATH_BY_MENU[MENU.TRANSFERS],
      icon: Transfers,
      rank: 3,
      key: PATH_BY_MENU[MENU.TRANSFERS],
      isNew: false,
      isDisabled: false,
      isVisible: true,
      isParent: true,
      children: transfersChildren,
    },
  ];

  const subProductItems = [
    {
      displayText: LABEL_BY_MENU[MENU.CASHGRAMS],
      name: PATH_BY_MENU[MENU.CASHGRAMS],
      icon: Cashgrams,
      rank: 4,
      key: PATH_BY_MENU[MENU.CASHGRAMS],
      isNew: false,
      isDisabled: false,
      isVisible: region === REGION.IN,
      isParent: true,
      children: cashgramsChildren,
    },
    {
      displayText: LABEL_BY_MENU[MENU.ONE_ESCROW],
      name: PATH_BY_MENU[MENU.ONE_ESCROW],
      icon: OneEscrow,
      rank: 6,
      key: PATH_BY_MENU[MENU.ONE_ESCROW],
      isNew: false,
      isDisabled: false,
      isVisible: preferences.enableOneEscrow,
      isParent: true,
      children: [
        {
          displayText: LABEL_BY_SUBMENU[SUBMENU.AGREEMENTS],
          name: PATH_BY_SUBMENU[SUBMENU.AGREEMENTS],
          rank: 6,
          key: `${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
            PATH_BY_SUBMENU[SUBMENU.AGREEMENTS]
          }`,
          isNew: false,
          isDisabled: false,
          isVisible: true,
          isParent: false,
        },
        {
          displayText: LABEL_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT],
          name: PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT],
          rank: 6,
          key: `${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
            PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]
          }`,
          isNew: false,
          isDisabled: false,
          isVisible: true,
          isParent: false,
        },
      ],
    },
    {
      displayText: LABEL_BY_MENU[MENU.RISK_SHIELD],
      name: PATH_BY_MENU[MENU.RISK_SHIELD],
      icon: RiskShield,
      rank: 7,
      key: PATH_BY_MENU[MENU.RISK_SHIELD],
      isNew: false,
      isDisabled: false,
      isVisible: featureFlags[PO_RISK_SHIELD],
      isParent: true,
      children: [
        {
          displayText: LABEL_BY_SUBMENU[SUBMENU.OVERVIEW],
          name: PATH_BY_SUBMENU[SUBMENU.OVERVIEW],
          rank: 7,
          key: `${PATH_BY_MENU[MENU.RISK_SHIELD]}/${
            PATH_BY_SUBMENU[SUBMENU.OVERVIEW]
          }`,
          isNew: false,
          isDisabled: false,
          isVisible: region === REGION.IN,
          isParent: false,
        },
        {
          displayText: LABEL_BY_SUBMENU.RISKY_TRANSFERS,
          name: PATH_BY_SUBMENU.RISKY_TRANSFERS,
          rank: 7,
          key: `${PATH_BY_MENU.RISK_SHIELD}/${PATH_BY_SUBMENU.RISKY_TRANSFERS}`,
          isNew: false,
          isDisabled: false,
          isVisible: true,
          isParent: false,
        },
        {
          displayText: LABEL_BY_SUBMENU.SMART_RULES,
          name: PATH_BY_SUBMENU.SMART_RULES,
          rank: 7,
          key: `${PATH_BY_MENU.RISK_SHIELD}/${PATH_BY_SUBMENU.SMART_RULES}`,
          isNew: false,
          isDisabled: false,
          isVisible: true,
          isParent: false,
        },
        {
          displayText: LABEL_BY_SUBMENU[SUBMENU.MY_LISTS],
          name: PATH_BY_SUBMENU[SUBMENU.MY_LISTS],
          rank: 7,
          key: `${PATH_BY_MENU[MENU.RISK_SHIELD]}/${
            PATH_BY_SUBMENU[SUBMENU.MY_LISTS]
          }`,
          isNew: false,
          isDisabled: false,
          isVisible: region === REGION.IN,
          isParent: false,
        },
      ],
    },
    {
      displayText: 'Router',
      name: PATH_BY_MENU[MENU.FUND_SOURCES],
      icon: Router,
      rank: 8,
      key: PATH_BY_MENU[MENU.FUND_SOURCES],
      isNew: true,
      isDisabled: false,
      isVisible: preferences.enableRouter && region === REGION.IN,
      isParent: true,
      children: [
        {
          displayText: LABEL_BY_SUBMENU[SUBMENU.AGGREGATORS],
          name: PATH_BY_SUBMENU[SUBMENU.AGGREGATORS],
          rank: 8,
          key: `${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
            PATH_BY_SUBMENU[SUBMENU.AGGREGATORS]
          }`,
          isNew: false,
          isDisabled: false,
          isVisible: true,
          isParent: false,
        },
        {
          displayText: LABEL_BY_SUBMENU.CONFIGURATIONS,
          name: PATH_BY_SUBMENU.CONFIGURATIONS,
          rank: 8,
          key: `${PATH_BY_MENU.FUND_SOURCES}/${PATH_BY_SUBMENU.CONFIGURATIONS}`,
          isNew: false,
          isDisabled: false,
          isVisible: true,
          isParent: false,
        },
      ],
    },
  ];

  const hasVisibleSubProductItems = subProductItems.some(
    (item) => item.isVisible,
  );

  return {
    features: { items },
    ...(hasVisibleSubProductItems && {
      subProducts: {
        label: 'PAYOUT PRODUCTS',
        items: subProductItems,
      },
    }),
    utilities: {
      items: [
        {
          displayText: LABEL_BY_MENU[MENU.FUND_SOURCES],
          name: PATH_BY_MENU[MENU.FUND_SOURCES],
          icon: FundSources,
          rank: 9,
          key: PATH_BY_MENU[MENU.FUND_SOURCES],
          isNew: false,
          isDisabled: false,
          isVisible: !preferences.enableRouter && region === REGION.IN,
          isParent: true,
          children: [
            {
              displayText: LABEL_BY_SUBMENU[SUBMENU.ALL],
              name: PATH_BY_SUBMENU[SUBMENU.ALL],
              rank: 9,
              key: `${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
                PATH_BY_SUBMENU[SUBMENU.ALL]
              }`,
              isNew: false,
              isDisabled: false,
              isVisible: true,
              isParent: false,
            },
            {
              displayText: LABEL_BY_SUBMENU[SUBMENU.LEADS],
              name: PATH_BY_SUBMENU[SUBMENU.LEADS],
              rank: 9,
              key: `${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
                PATH_BY_SUBMENU[SUBMENU.LEADS]
              }`,
              isNew: false,
              isDisabled: false,
              isVisible: true,
              isParent: false,
            },
            {
              displayText: LABEL_BY_MENU[MENU.DOWNTIMES],
              name: PATH_BY_MENU[MENU.DOWNTIMES],
              rank: 9,
              key: `${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
                PATH_BY_MENU[MENU.DOWNTIMES]
              }`,
              isNew: false,
              isDisabled: false,
              isVisible: true,
              isParent: false,
            },
          ],
        },
        {
          displayText: LABEL_BY_MENU[MENU.ERP],
          name: PATH_BY_MENU[MENU.ERP],
          icon: ERP,
          rank: 10,
          key: PATH_BY_MENU[MENU.ERP],
          isNew: false,
          isDisabled: false,
          isVisible: region === REGION.IN,
          isParent: false,
        },
        {
          displayText: LABEL_BY_MENU[MENU.DOWNTIMES],
          name: PATH_BY_MENU[MENU.DOWNTIMES],
          icon: Downtimes,
          rank: 11,
          key: PATH_BY_MENU[MENU.DOWNTIMES],
          isNew: false,
          isDisabled: false,
          isVisible: preferences.enableRouter && region === REGION.IN,
          isParent: false,
        },
        {
          displayText: LABEL_BY_MENU[MENU.ACCOUNT],
          name: PATH_BY_MENU[MENU.ACCOUNT],
          icon: Account,
          rank: 12,
          key: PATH_BY_MENU[MENU.ACCOUNT],
          isNew: false,
          isDisabled: false,
          isVisible: true,
          isParent: false,
        },
        {
          displayText: LABEL_BY_MENU[MENU.DEVELOPERS],
          name: PATH_BY_MENU[MENU.DEVELOPERS],
          icon: Developers,
          rank: 13,
          key: PATH_BY_MENU[MENU.DEVELOPERS],
          isNew: false,
          isDisabled: false,
          isVisible: true,
          isParent: true,
          children: developersChildren.filter(_identity),
        },
        {
          displayText: LABEL_BY_MENU[MENU.REPORTS],
          name: PATH_BY_MENU[MENU.REPORTS],
          icon: Reports,
          rank: 14,
          key: PATH_BY_MENU[MENU.REPORTS],
          isNew: false,
          isDisabled: false,
          isVisible: true,
          isParent: false,
        },
      ],
    },
  };
};
