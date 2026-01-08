import { BANK_MODES as SHARED_BANK_MODES, BANK_CODE as SHARED_BANK_CODE } from '@dashboard-monorepo/shared';

export const BANK_MODES = SHARED_BANK_MODES;

export enum BANK_CODE {
  UTIB = 'UTIB',
  CITI = 'CITI',
  HDFC = 'HDFC',
  ICIC = 'ICIC',
  IDFB = 'IDFB',
  RBLB = 'RATN',
  KKBK = 'KKBK',
  SBIN = 'SBIN',
  SCBL = 'SCBL',
  YESB = 'YESB',
  INDB = 'INDB',
  ENBD = 'EBIL',
  CASH = 'CASH',
}
