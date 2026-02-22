interface ProducerSettings {
  recurrence_payout_enabled?: boolean;
  default_recurrence_payout_day?: number;
  default_minimal_monthly_threshold?: number;
  default_notifications_email_enabled?: boolean;
  default_notifications_email_template?: string;
  transfer_speed?: string;
}

interface CarrierSettings {
  recurrence_payout_enabled?: boolean;
  default_recurrence_payout_day?: number;
  default_notifications_email_enabled?: boolean;
  default_notifications_email_template?: string;
  transfer_speed?: string;
}

interface UpdateTenantRequest {
  legal_name?: string;
  company_name?: string;
  federal_ein?: string;
  phone_number?: string;
  email?: string;
  address1?: string;
  address2?: string;
  address_state?: string;
  city?: string;
  zip_code?: string;
  country?: string;
  company_name_on_invoices?: string;
  cheques_payable_recipient?: string;
  cheques_payable_address1?: string;
  cheques_payable_address2?: string;
  cheques_payable_address_state?: string;
  cheques_payable_city?: string;
  cheques_payable_zip_code?: string;
  cheques_payable_country?: string;
  alert_reminder_in_days_1?: number;
  alert_reminder_in_days_2?: number;
  producer_settings?: ProducerSettings;
  carrier_settings?: CarrierSettings;
  checkout_redirect_url?: string;
}

interface Tenant extends UpdateTenantRequest {
  tenant_id: string;
  logo_url?: string;
  onboarded?: boolean;
  onboarded_at?: string;
  invoice_sender_email?: string;
}

interface TenantCheckoutInfo {
  legal_name: string;
  company_name: string;
  phone_number: string;
  email: string;
  address1: string | null;
  address2: string | null;
  address_state: string | null;
  city: string | null;
  zip_code: string | null;
  country: string | null;
  logo_url: string;
  merchant_id: string;
}

enum TenantFeatureName {
  CREATE_PLAN = 'enable_plan_creation',
  PAYMENT_REQUEST = 'enable_payment_request',
}

interface TenantFeature {
  name: TenantFeatureName;
  enabled: boolean;
  message?: string;
}

interface TenantFeaturesResponse {
  features: TenantFeature[];
}

interface TenantSignupRequest {
  tenant_type: TenantType;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  share_account_id?: string;
}

enum TenantType {
  AGENCY = 'Agency',
  CARRIER = 'Carrier',
  UNDEFINED = 'Undefined',
}

enum UserRole {
  CHECK_DEPOSITOR = 'check_depositor',
  ADMIN = 'admin',
  USER = 'user',
  BOOKKEEPER = 'bookkeeper',
  SYSTEM = 'system',
  UNDEFINED = 'undefined',
}

export type {
  Tenant,
  TenantFeature,
  CarrierSettings,
  ProducerSettings,
  TenantCheckoutInfo,
  UpdateTenantRequest,
  TenantSignupRequest,
  TenantFeaturesResponse,
};
export {UserRole, TenantType, TenantFeatureName};
