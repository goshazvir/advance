interface FlexxFilterChipInterface {
  id: string;
  label: string;
  filterType: filterType;
}

enum PredefinedFlexxFilterId {
  METHOD = 'method-filter',
  MERCHANT = 'merchant-filter',
  CARRIER = 'carrier',
  INSURED = 'insured',
}

enum FlexxFilterType {
  DATE_FILTER = 'date-filter',
  RANGE_FILTER = 'range-filter',
  LIST_FILTER = 'list-filter',
}

type DateFilterType = {
  type: FlexxFilterType.DATE_FILTER;
  range?: {minDate?: Date; maxDate?: Date};
  exactDate?: boolean;
};

type RangeFilterType = {
  type: FlexxFilterType.RANGE_FILTER;
  range?: {min?: number; max?: number};
  currency?: string;
};

type ListFilterType = {
  type: FlexxFilterType.LIST_FILTER;
  listItems: {id: string; label: string}[];
};

type PredefinedFlexxFilterIdType = {
  type: PredefinedFlexxFilterId;
};

export type {FlexxFilterChipInterface};

type filterType =
  | DateFilterType
  | RangeFilterType
  | ListFilterType
  | PredefinedFlexxFilterIdType;

export {FlexxFilterType, PredefinedFlexxFilterId};

export type {filterType, DateFilterType, ListFilterType, RangeFilterType};
