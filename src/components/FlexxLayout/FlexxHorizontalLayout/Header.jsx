'use client';

// Component Imports
import Navigation from './Navigation';
import NavbarContent from './NavbarContent';
import Navbar from '@layouts/components/horizontal/Navbar';
// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav';
import LayoutHeader from '@layouts/components/horizontal/Header';

const Header = ({dictionary}) => {
  // Hooks
  const {isBreakpointReached} = useHorizontalNav();

  return (
    <>
      <LayoutHeader>
        <Navbar>
          <NavbarContent />
        </Navbar>
        {!isBreakpointReached && <Navigation dictionary={dictionary} />}
      </LayoutHeader>
      {isBreakpointReached && <Navigation dictionary={dictionary} />}
    </>
  );
};

export default Header;
