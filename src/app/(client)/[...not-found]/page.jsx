// Config Imports
import {i18n} from '@configs/i18n';
import NotFound from '@views/NotFound';
// Component Imports
import Providers from '@components/Providers';
import BlankLayout from '@layouts/BlankLayout';
// Util Imports
import {getServerMode, getSystemMode} from '@core/utils/serverHelpers';

const NotFoundPage = async props => {
  const params = await props.params;
  // Vars
  const direction = i18n.langDirection[params.lang];
  const systemMode = getSystemMode();
  const mode = getServerMode();

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>
        <NotFound mode={mode} />
      </BlankLayout>
    </Providers>
  );
};

export default NotFoundPage;
