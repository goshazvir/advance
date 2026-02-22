import {usePathname, useRouter, useSearchParams} from 'next/navigation';

const useFlexxFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const params = Object.fromEntries(searchParams.entries());

  // eslint-disable-next-line
  const selectedFilters = Object.entries(params).reduce<Record<string, any>>(
    (acc, [id, value]) => {
      let parsedValue;

      try {
        parsedValue = JSON.parse(value);
      } catch {
        parsedValue = value;
      }

      acc[id] = parsedValue;

      return acc;
    },
    {},
  );

  // eslint-disable-next-line
  const updateFilter = (filter: {id: string; value?: any}) => {
    const newParams = {
      ...params,
      [filter.id]: JSON.stringify(filter.value),
    };

    const queryString = new URLSearchParams(newParams).toString();
    const url = `${pathName}?${queryString}`;

    router.push(url);
  };

  const clearFilters = () => {
    router.push(pathName);
  };

  const deleteFilter = (filterId: string) => {
    const newParams = {...params};

    delete newParams[filterId];

    const queryString = new URLSearchParams(newParams).toString();
    const url = `${pathName}?${queryString}`;

    router.push(url);
  };

  return {
    selectedFilters,
    updateFilter,
    clearFilters,
    deleteFilter,
  };
};

export {useFlexxFilters};
