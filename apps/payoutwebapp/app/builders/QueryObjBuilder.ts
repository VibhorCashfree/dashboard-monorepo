import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';

class QueryObjBuilder {
  startDate?: string;
  endDate?: string;
  size?: number;
  status?: string[];

  [key: string]: any;

  constructor() {}

  withDateRange(
    dateValue: DateRangeValue,
    formats: string[] = ['START_DATE', 'END_DATE'],
  ): QueryObjBuilder {
    if (dateValue.range) {
      const [startDate, endDate] = dateValue.range;
      const [startFormat, endFormat] = formats;

      this.startDate = moment(startDate).format(
        FORMATS[startFormat as keyof typeof FORMATS],
      );
      this.endDate = moment(endDate).format(
        FORMATS[endFormat as keyof typeof FORMATS],
      );
    }

    return this;
  }

  withFilters(
    filters: { search?: string; [key: string]: any },
    searchBy: string | undefined,
    hasStatus = true,
  ): QueryObjBuilder {
    if (filters.search && searchBy) {
      this[searchBy] = filters.search;
    }

    if (hasStatus) {
      const keys = Object.keys(filters);
      this.status = keys.filter((key) => key !== 'search');
    }

    return this;
  }

  withPagination(limit: number, cursor: [string, any]): QueryObjBuilder {
    this.size = limit;

    const [cursorKey, cursorValue] = cursor;

    this[cursorKey] = cursorValue;

    return this;
  }

  withCustom(obj: AnyObject): QueryObjBuilder {
    Object.assign(this, obj);

    return this;
  }

  build(): QueryObjBuilder {
    return this;
  }
}

export default QueryObjBuilder;
