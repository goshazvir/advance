// React Imports
import {useEffect, useRef} from 'react';

// Next Imports
import Link from 'next/link';
// Component Imports
import FlexxLogo from '@core/svg/Logo';
// Config Imports
// Util Imports
import {getLocalizedUrl} from '@/utils/i18n';
import {useSettings} from '@core/hooks/useSettings';
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav';

const Logo = () => {
  // Refs
  const logoTextRef = useRef(null);

  // Hooks
  const {isHovered, isCollapsed} = useVerticalNav();
  const {settings} = useSettings();

  // Vars
  const {layout} = settings;

  useEffect(() => {
    if (layout === 'horizontal' || !isCollapsed) {
      return;
    }

    if (logoTextRef && logoTextRef.current) {
      if (isCollapsed && !isHovered) {
        logoTextRef.current?.classList.add('hidden');
      } else {
        logoTextRef.current.classList.remove('hidden');
      }
    }
  }, [isHovered, isCollapsed]);

  // You may return any JSX here to display a logo in the sidebar header
  // return <Img src='/next.svg' width={100} height={25} alt='logo' /> // for example
  return (
    <Link
      href={getLocalizedUrl('/')}
      className='flex items-center min-bs-[24px]'
    >
      <FlexxLogo
        className='text-[22px] text-primary'
        isCollapsed={isCollapsed}
      />
    </Link>
  );
};

export default Logo;
