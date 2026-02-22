import {UserRole} from '@/domain/Tenant';
import {Session} from '@/domain/Session';

enum ENVIRONMENT {
  PROD = 'advance_env_production',
  STAGE = 'advance_env_stage',
  DEV = 'advance_env_dev',
}

const isDevEnv = process.env.NEXT_PUBLIC_ENVIRONMENT === ENVIRONMENT.DEV;
const isStageEnv = process.env.NEXT_PUBLIC_ENVIRONMENT === ENVIRONMENT.STAGE;
const isProdEnv = process.env.NEXT_PUBLIC_ENVIRONMENT === ENVIRONMENT.PROD;
const ADVANCE_URL =
  process.env.NEXT_PUBLIC_ADVANCE_URL || 'https://advancehq.com';

const generatePaymentLinkUrl = ({
  checkout_id,
  isDemo,
}: {
  checkout_id: string;
  isDemo?: boolean;
}) => {
  const demoParam = isDemo ? `?demo=${isDemo}` : '';
  return `${process.env.NEXT_PUBLIC_APP_URL}/checkout/${checkout_id}${demoParam}`;
};

const isMobileDevice = (userAgent: string): boolean => {
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
};

const isUserCompliant = (session?: Session): boolean => {
  return (
    session?.user_consent_status === true &&
    session?.onboarded === true &&
    session?.user_onboarded === true
  );
};

const DEMO_TENANTS: Record<string, boolean> = {};

const SHADOW_DOMAINS = ['advancehq.com', 'getflexx.com'];

enum FEATURE_TOGGLE_IDS {
  DEV_MODE = 'dev-mode',
  LOGIN_WITH_GOOGLE = 'login-with-google',
  UPLOAD_PRODUCER_PAYOUTS = 'upload-producer-payouts',
  ANALYTICS_MENU_ITEM = 'analytics-menu-item',
  EXPERIMENTAL_UPLOAD_INVOICE_FLOW = 'experimental-upload-invoice-flow',
  ACCOUNT_DRAWER_HEALTH_SCORE = 'account-drawer-health-score',
  ACCOUNTS_DRAWER_PAID_OUT_TAB = 'accounts-drawer-paid-out-tab',
  TENANT_SETTINGS_PAYABLE_RULES = 'tenant-settings-payable-rules',
  TENANT_SETTINGS_PAYMENT_ACCEPTANCE = 'tenant-settings-payment-acceptance',
  RECENT_TRANSACTIONS_CARD = 'recent-transactions-card',
  RECENT_ACTIVITY_CARD = 'recent-activity-card',
  AI_RECONCILE_PAYABLES = 'reconcile-payables',
  AI_ASSISTANT = 'ai-assistant',
  MOCK_NOVELLA = 'is-novella',
  DISABLE_PRODUCTION_WARNING_BANNER = 'disable-production-warning-banner',
  TASKS_MANAGEMENT = 'tasks-management',
  PRODUCERS_DRAWER_TRANSACTIONS_TAB = 'producers-drawer-transactions-tab',
  TAX_DOCUMENTS_DOWNLOAD = 'tax-documents-download',
}

const FEATURE_TOGGLE_DESCRIPTIONS: Record<FEATURE_TOGGLE_IDS, string> = {
  [FEATURE_TOGGLE_IDS.DEV_MODE]:
    'Enable development features and testing tools',
  [FEATURE_TOGGLE_IDS.LOGIN_WITH_GOOGLE]:
    'Enable Google SSO authentication option',
  [FEATURE_TOGGLE_IDS.UPLOAD_PRODUCER_PAYOUTS]:
    'Enable bulk upload functionality for producer payouts',
  [FEATURE_TOGGLE_IDS.ANALYTICS_MENU_ITEM]: 'Enable analytics dashboard access',
  [FEATURE_TOGGLE_IDS.EXPERIMENTAL_UPLOAD_INVOICE_FLOW]:
    'Enable new experimental invoice upload workflow',
  [FEATURE_TOGGLE_IDS.ACCOUNT_DRAWER_HEALTH_SCORE]:
    'Show health score in account drawer',
  [FEATURE_TOGGLE_IDS.ACCOUNTS_DRAWER_PAID_OUT_TAB]:
    'Show paid out tab in accounts drawer',
  [FEATURE_TOGGLE_IDS.TENANT_SETTINGS_PAYABLE_RULES]:
    'Enable configuration of payable rules in tenant settings',
  [FEATURE_TOGGLE_IDS.TENANT_SETTINGS_PAYMENT_ACCEPTANCE]:
    'Show payment acceptance section in tenant settings',
  [FEATURE_TOGGLE_IDS.RECENT_TRANSACTIONS_CARD]:
    'Enable recent transactions card',
  [FEATURE_TOGGLE_IDS.RECENT_ACTIVITY_CARD]: 'Enable recent activity card',
  [FEATURE_TOGGLE_IDS.AI_ASSISTANT]: 'Enable AI Assistant chatbot feature',
  [FEATURE_TOGGLE_IDS.AI_RECONCILE_PAYABLES]: 'AI reconciliation of payables',
  [FEATURE_TOGGLE_IDS.MOCK_NOVELLA]: 'Mocks as if you are Novella',
  [FEATURE_TOGGLE_IDS.DISABLE_PRODUCTION_WARNING_BANNER]:
    'Disable production warning banner',
  [FEATURE_TOGGLE_IDS.TASKS_MANAGEMENT]:
    'Enable Task Management (For You) menu item',
  [FEATURE_TOGGLE_IDS.TAX_DOCUMENTS_DOWNLOAD]:
    'Account documents Enable tax documents download',
  [FEATURE_TOGGLE_IDS.PRODUCERS_DRAWER_TRANSACTIONS_TAB]:
    'Enable producers drawer transactions tab',
};

const FEATURE_TOGGLES: Record<FEATURE_TOGGLE_IDS, boolean> = {
  [FEATURE_TOGGLE_IDS.DEV_MODE]: isDevEnv,
  [FEATURE_TOGGLE_IDS.LOGIN_WITH_GOOGLE]: isDevEnv,
  [FEATURE_TOGGLE_IDS.UPLOAD_PRODUCER_PAYOUTS]: false,
  [FEATURE_TOGGLE_IDS.ANALYTICS_MENU_ITEM]: isDevEnv,
  [FEATURE_TOGGLE_IDS.EXPERIMENTAL_UPLOAD_INVOICE_FLOW]: isDevEnv,
  [FEATURE_TOGGLE_IDS.ACCOUNT_DRAWER_HEALTH_SCORE]: isDevEnv,
  [FEATURE_TOGGLE_IDS.ACCOUNTS_DRAWER_PAID_OUT_TAB]: isDevEnv,
  [FEATURE_TOGGLE_IDS.TENANT_SETTINGS_PAYABLE_RULES]: true,
  [FEATURE_TOGGLE_IDS.TENANT_SETTINGS_PAYMENT_ACCEPTANCE]: isDevEnv,
  [FEATURE_TOGGLE_IDS.RECENT_TRANSACTIONS_CARD]: isDevEnv,
  [FEATURE_TOGGLE_IDS.RECENT_ACTIVITY_CARD]: isDevEnv,
  [FEATURE_TOGGLE_IDS.AI_ASSISTANT]: false,
  [FEATURE_TOGGLE_IDS.AI_RECONCILE_PAYABLES]: isDevEnv,
  [FEATURE_TOGGLE_IDS.MOCK_NOVELLA]: false,
  [FEATURE_TOGGLE_IDS.DISABLE_PRODUCTION_WARNING_BANNER]: false,
  [FEATURE_TOGGLE_IDS.TASKS_MANAGEMENT]: isDevEnv,
  [FEATURE_TOGGLE_IDS.PRODUCERS_DRAWER_TRANSACTIONS_TAB]: false,
  [FEATURE_TOGGLE_IDS.TAX_DOCUMENTS_DOWNLOAD]: false,
};

enum AccessPermission {
  CAN_VIEW_OPERATIONAL_ACCOUNTS = 'CAN_VIEW_OPERATIONAL_ACCOUNTS',
}
const permissionRoleMap: Record<AccessPermission, UserRole[]> = {
  [AccessPermission.CAN_VIEW_OPERATIONAL_ACCOUNTS]: [UserRole.ADMIN],
};

const OVERDUE_PLAN_THRESHOLD = 45;
const COUNT_THRESHOLD = 99;

export {
  isDevEnv,
  isProdEnv,
  isStageEnv,
  ADVANCE_URL,
  DEMO_TENANTS,
  isMobileDevice,
  SHADOW_DOMAINS,
  FEATURE_TOGGLES,
  isUserCompliant,
  COUNT_THRESHOLD,
  AccessPermission,
  permissionRoleMap,
  FEATURE_TOGGLE_IDS,
  OVERDUE_PLAN_THRESHOLD,
  generatePaymentLinkUrl,
  FEATURE_TOGGLE_DESCRIPTIONS,
};
