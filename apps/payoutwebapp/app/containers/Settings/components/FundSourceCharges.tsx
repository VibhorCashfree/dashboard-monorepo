import React from 'react';
import { Paper, Text } from '@cashfree-intl/coherent';
import _size from 'lodash/size';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Utils
import { formatAmount } from 'utils/common';

// Constants
import { keyByLevel, LEVEL } from '../constants';

// Styled
import { StyledTable } from '../styled';

// Types
import type { FundSourceChargesProps } from '../types';

const FundSourceCharges: React.FC<FundSourceChargesProps> = ({
  fundSource,
  mode,
}) => {
  const { preferences, slabCharges } = useAccount();

  const fundSourceLevelModeRate = fundSource.modeRates.find(
    (modeRate: ModeRate) => modeRate.mode === mode,
  );

  const accountLevelModeRate = preferences.modeByName[mode];

  let level: string = LEVEL.ACCOUNT;
  let modeRate: any = accountLevelModeRate;
  let modeId: number = accountLevelModeRate.ModeID;

  if (fundSourceLevelModeRate) {
    level = LEVEL.FUNDSOURCE;
    modeRate = fundSourceLevelModeRate;
    modeId = fundSourceLevelModeRate.modeId;
  }

  const fundSourceLevelSlabCharges = fundSource.fsSlabCharges.filter(
    (slabCharge: FsSlabCharge) => slabCharge.modeId === modeId,
  );

  const accountLevelSlabCharges = slabCharges.filter(
    (slabCharge: AccountSlabCharge) => slabCharge.modeId === modeId,
  );

  return (
    <Paper style={{ width: 400 }}>
      <Text variant="h16">{fundSource.displayName}</Text>

      {parseInt(
        modeRate[keyByLevel[level as keyof typeof keyByLevel].fixedCharge],
      ) === -1 ? (
        <>
          {_size(fundSourceLevelSlabCharges) > 0 && (
            <div className="my-2">
              <Text variant="b12" color="bodyLight" className="mb-1">
                FUNDSOURCE LEVEL
              </Text>
              <StyledTable>
                <thead>
                  <tr>
                    <th>Upper Bound</th>
                    <th>Lower Bound</th>
                    <th>Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {fundSourceLevelSlabCharges.map(
                    (slabCharge: FsSlabCharge) => (
                      <tr key={slabCharge.id}>
                        <td>{slabCharge.uBound}</td>
                        <td>{slabCharge.lBound}</td>
                        <td>{slabCharge.charge}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </StyledTable>
            </div>
          )}

          {_size(accountLevelSlabCharges) > 0 && (
            <div className="my-2">
              <Text variant="b12" color="bodyLight" className="mb-1">
                ACCOUNT LEVEL
              </Text>
              <StyledTable>
                <thead>
                  <tr>
                    <th>Lower Bound</th>
                    <th>Upper Bound</th>
                    <th>Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {accountLevelSlabCharges.map((slabCharge) => (
                    <tr key={slabCharge.modeId}>
                      <td>{formatAmount(slabCharge.lBound)}</td>
                      <td>{formatAmount(slabCharge.uBound)}</td>
                      <td>{formatAmount(slabCharge.charge)}</td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </div>
          )}

          {_size(fundSourceLevelSlabCharges) === 0 &&
            _size(accountLevelSlabCharges) === 0 && (
              <Text variant="b12" color="bodyLight" className="mt-1">
                Mode is not active.
              </Text>
            )}
        </>
      ) : (
        <>
          {fundSourceLevelModeRate && (
            <div className="my-2">
              <Text variant="b12" color="bodyLight" className="mb-1">
                FUNDSOURCE LEVEL
              </Text>
              <StyledTable className="my-2">
                <thead>
                  <tr>
                    <th>Floor</th>
                    <th>TDR</th>
                    <th>Fixed Charge</th>
                    <th>Capped At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {formatAmount(
                        modeRate[
                          keyByLevel[level as keyof typeof keyByLevel].floor
                        ],
                      )}
                    </td>
                    <td>
                      {
                        modeRate[
                          keyByLevel[level as keyof typeof keyByLevel].tdr
                        ]
                      }
                    </td>
                    <td>
                      {formatAmount(
                        modeRate[
                          keyByLevel[level as keyof typeof keyByLevel]
                            .fixedCharge
                        ],
                      )}
                    </td>
                    <td>
                      {formatAmount(
                        modeRate[
                          keyByLevel[level as keyof typeof keyByLevel].cappedAt
                        ],
                      )}
                    </td>
                  </tr>
                </tbody>
              </StyledTable>
            </div>
          )}

          {accountLevelModeRate && (
            <div className="my-2">
              <Text variant="b12" color="bodyLight" className="mb-1">
                ACCOUNT LEVEL
              </Text>
              <StyledTable className="my-2">
                <thead>
                  <tr>
                    <th>Floor</th>
                    <th>TDR</th>
                    <th>Fixed Charge</th>
                    <th>Capped At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {formatAmount(
                        modeRate[
                          keyByLevel[level as keyof typeof keyByLevel].floor
                        ],
                      )}
                    </td>
                    <td>
                      {
                        modeRate[
                          keyByLevel[level as keyof typeof keyByLevel].tdr
                        ]
                      }
                    </td>
                    <td>
                      {formatAmount(
                        modeRate[
                          keyByLevel[level as keyof typeof keyByLevel]
                            .fixedCharge
                        ],
                      )}
                    </td>
                    <td>
                      {formatAmount(
                        modeRate[
                          keyByLevel[level as keyof typeof keyByLevel].cappedAt
                        ],
                      )}
                    </td>
                  </tr>
                </tbody>
              </StyledTable>
            </div>
          )}

          {fundSourceLevelModeRate && accountLevelModeRate && (
            <Text variant="b12" color="bodyLight" className="mt-1">
              Mode is not active.
            </Text>
          )}
        </>
      )}
    </Paper>
  );
};

export default withErrorBoundary(FundSourceCharges);
