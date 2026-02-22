interface FilterChip {
  id: string;
  label: string;
  onClick?: () => void;
  count?: number;
  shouldShowCount?: boolean;
  danger?: boolean;
  disabled?: boolean;
  shouldRender?: boolean;
}

interface ChipConfig<T> {
  id: T | string;
  label: string;
}

export type {ChipConfig, FilterChip};
