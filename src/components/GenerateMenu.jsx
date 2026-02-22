'use client';

// Next Imports

// Util Imports
import {getLocalizedUrl} from '@/utils/i18n';
// Component Imports
import {
  MenuItem as HorizontalMenuItem,
  SubMenu as HorizontalSubMenu,
} from '@menu/horizontal-menu';
import {
  MenuSection,
  MenuItem as VerticalMenuItem,
  SubMenu as VerticalSubMenu,
} from '@menu/vertical-menu';

// Generate a menu from the menu data array
export const GenerateVerticalMenu = ({menuData}) => {
  // Hooks

  const renderMenuItems = data => {
    // Use the map method to iterate through the array of menu data
    return data.map((item, index) => {
      const menuSectionItem = item;
      const subMenuItem = item;
      const menuItem = item;
      const icon = <i className={menuItem.icon} />;

      // Check if the current item is a section
      if (menuSectionItem.isSection) {
        const {children, ...rest} = menuSectionItem;

        // If it is, return a MenuSection component and call generateMenu with the current menuSectionItem's children
        return (
          <MenuSection key={index} {...rest}>
            {children && renderMenuItems(children)}
          </MenuSection>
        );
      }

      // Check if the current item is a sub menu
      if (subMenuItem.children) {
        const {children, ...rest} = subMenuItem;

        // If it is, return a SubMenu component and call generateMenu with the current subMenuItem's children
        return (
          <VerticalSubMenu key={index} {...rest} icon={icon}>
            {children && renderMenuItems(children)}
          </VerticalSubMenu>
        );
      }

      // Localize the href
      const href = menuItem.href?.startsWith('http')
        ? menuItem.href
        : menuItem.href && getLocalizedUrl(menuItem.href);

      // If the current item is neither a section nor a sub menu, return a MenuItem component
      return (
        <VerticalMenuItem key={index} {...menuItem} href={href} icon={icon}>
          {menuItem.label}
        </VerticalMenuItem>
      );
    });
  };

  return <>{renderMenuItems(menuData)}</>;
};

// Generate a menu from the menu data array
export const GenerateHorizontalMenu = ({menuData}) => {
  // Hooks

  const renderMenuItems = data => {
    // Use the map method to iterate through the array of menu data
    return data.map((item, index) => {
      const subMenuItem = item;
      const menuItem = item;
      const icon = <i className={menuItem.icon} />;

      // Check if the current item is a sub menu
      if (subMenuItem.children) {
        const {children, ...rest} = subMenuItem;

        // If it is, return a SubMenu component and call generateMenu with the current subMenuItem's children
        return (
          <HorizontalSubMenu key={index} {...rest} icon={icon}>
            {children && renderMenuItems(children)}
          </HorizontalSubMenu>
        );
      }

      // Localize the href
      const href = menuItem.href?.startsWith('http')
        ? menuItem.href
        : menuItem.href && getLocalizedUrl(menuItem.href);

      // If the current item is not a sub menu, return a MenuItem component
      return (
        <HorizontalMenuItem key={index} {...menuItem} href={href} icon={icon}>
          {menuItem.label}
        </HorizontalMenuItem>
      );
    });
  };

  return <>{renderMenuItems(menuData)}</>;
};
