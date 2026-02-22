// Third-party Imports
import styled from '@emotion/styled';
// Util Imports
import {menuClasses} from '../../utils/menuClasses';

const StyledVerticalMenu = styled.nav`
  display: flex;
  & > ul > :first-of-type {
    margin-block-start: 0;
  }
  &.${menuClasses.root} {
    ${({rootStyles}) => rootStyles}
  }
`;

export default StyledVerticalMenu;
