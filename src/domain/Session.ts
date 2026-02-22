import {TenantType, UserRole} from '@/domain/Tenant';

interface Session {
  name?: string;
  token?: string;
  tenant_type?: TenantType;
  email?: string;
  user_role?: UserRole;
  tenant_id?: string;
  onboarded?: boolean;
  user_onboarded?: boolean;
  user_consent_status?: boolean;
}

export type {Session};
