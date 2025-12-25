// Constants
import { COLUMN_ID } from './constants';

export const getTableHeadings = enableNameMatch => {
  if (enableNameMatch) {
    return COLUMN_ID;
  }

  return COLUMN_ID.filter(heading => heading.key !== 'nameMatchResult');
};
