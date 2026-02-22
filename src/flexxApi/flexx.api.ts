import {Tenant} from '@/domain/Tenant';

const fetchTenant = async (): Promise<Tenant> => {
  const tenant = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pages/tenant/fetch-tenant`,
  ).then(res => res.json());

  return tenant;
};

export {fetchTenant};
