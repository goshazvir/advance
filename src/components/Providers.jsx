// Styled Component Imports
import ThemeProvider from '@components/theme';
// Config Imports
import themeConfig from '@configs/themeConfig';
import {TenantType, UserRole} from '@/domain/Tenant';
import AppReactToastify from '@/libs/styles/AppReactToastify';
import {SettingsProvider} from '@core/contexts/settingsContext';
import {VerticalNavProvider} from '@menu/contexts/verticalNavContext';
import {GlobalSearchProvider} from '@/@core/contexts/GlobalSearchContext';
import {UserSessionProvider} from '@components/UserSessionProvider/UserSessionProvider';
// Util Imports
import {
  getDemoName,
  getMode,
  getSettingsFromCookie,
  getSystemMode,
} from '@core/utils/serverHelpers';

const Providers = async props => {
  // Props
  const {children, direction} = props;

  // Vars
  const mode = await getMode();
  const settingsCookie = await getSettingsFromCookie();
  const demoName = await getDemoName();
  const systemMode = await getSystemMode();

  return (
    <UserSessionProvider
      tenant_type={TenantType.AGENCY}
      email='candidate@example.com'
      user_role={UserRole.ADMIN}
      tenant_id='interview-tenant'
      onboarded={true}
      user_onboarded={true}
      user_consent_status={true}
    >
      <VerticalNavProvider>
        <GlobalSearchProvider>
          <SettingsProvider
            settingsCookie={settingsCookie}
            mode={mode}
            demoName={demoName}
          >
            <ThemeProvider direction={direction} systemMode={systemMode}>
              {children}
              <AppReactToastify
                position={themeConfig.toastPosition}
                hideProgressBar
                rtl={direction === 'rtl'}
              />
            </ThemeProvider>
          </SettingsProvider>
        </GlobalSearchProvider>
      </VerticalNavProvider>
    </UserSessionProvider>
  );
};

export default Providers;
