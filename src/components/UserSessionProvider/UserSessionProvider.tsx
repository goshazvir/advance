'use client';
import React, {createContext, useContext, useState} from 'react';

import {Session} from '@/domain/Session';
import {Tenant, TenantType, UserRole} from '@/domain/Tenant';

export interface UserSessionContextValue extends Session {
  overrideTenantType: (type: TenantType) => void;
  overrideUserRole: (role: UserRole) => void;
  overrideOnboarded: (status: boolean) => void;
  overrideUserOnboarded: (status: boolean) => void;
  overrideUserConsentStatus: (status: boolean) => void;
  resetOverrides: () => void;
}

const UserSessionContext = createContext<UserSessionContextValue>({
  overrideTenantType: () => {},
  overrideUserRole: () => {},
  overrideOnboarded: () => {},
  overrideUserOnboarded: () => {},
  overrideUserConsentStatus: () => {},
  resetOverrides: () => {},
});

const useUserSession = () => {
  const context = useContext(UserSessionContext);

  if (!context) {
    throw new Error('no context');
  }

  const stubTenant: Tenant = {
    tenant_id: context.tenant_id ?? 'interview-tenant',
    legal_name: 'Interview Co.',
    company_name: 'Interview Co.',
  };

  return {
    tenant_type: context.tenant_type,
    email: context.email,
    user_role: context.user_role,
    tenant_id: context.tenant_id,
    onboarded: context.onboarded,
    user_onboarded: context.user_onboarded,
    user_consent_status: context.user_consent_status,
    tenant: stubTenant,
    isDemoTenant: false,
    isLoadingTenant: false,
    overrideTenantType: context.overrideTenantType,
    overrideUserRole: context.overrideUserRole,
    overrideOnboarded: context.overrideOnboarded,
    overrideUserOnboarded: context.overrideUserOnboarded,
    overrideUserConsentStatus: context.overrideUserConsentStatus,
    resetOverrides: context.resetOverrides,
  };
};

interface UserSessionProviderProps extends Session {
  children: React.ReactNode;
}

const UserSessionProvider = ({
  children,
  tenant_type: initialTenantType,
  email,
  tenant_id,
  onboarded: initialOnboardedStatus = true,
  user_onboarded: initialUserOnboardedStatus = true,
  user_consent_status: initialUserConsentStatus = true,
  user_role: initialUserRole,
}: UserSessionProviderProps) => {
  const [tenant_type, setTenantType] = useState<TenantType | undefined>(
    initialTenantType,
  );
  const [user_role, setUserRole] = useState<UserRole | undefined>(
    initialUserRole,
  );
  const [onboarded, setOnboarded] = useState<boolean | undefined>(
    initialOnboardedStatus,
  );

  const [user_onboarded, setUserOnboarded] = useState<boolean | undefined>(
    initialUserOnboardedStatus,
  );

  const [user_consent_status, setUserConsentStatus] = useState<
    boolean | undefined
  >(initialUserConsentStatus);

  const overrideTenantType = (type: TenantType) => {
    setTenantType(type);
  };

  const overrideUserRole = (role: UserRole) => {
    setUserRole(role);
  };

  const overrideOnboarded = (status: boolean) => {
    setOnboarded(status);
  };

  const overrideUserOnboarded = (status: boolean) => {
    setUserOnboarded(status);
  };

  const overrideUserConsentStatus = (status: boolean) => {
    setUserConsentStatus(status);
  };

  const resetOverrides = () => {
    setTenantType(initialTenantType);
    setUserRole(initialUserRole);
    setOnboarded(initialOnboardedStatus);
    setUserOnboarded(initialUserOnboardedStatus);
    setUserConsentStatus(initialUserConsentStatus);
  };

  return (
    <UserSessionContext.Provider
      value={{
        tenant_type,
        email,
        user_role,
        tenant_id,
        onboarded,
        user_onboarded,
        user_consent_status,
        overrideTenantType,
        overrideUserRole,
        overrideOnboarded,
        overrideUserOnboarded,
        overrideUserConsentStatus,
        resetOverrides,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export {useUserSession, UserSessionProvider};
