import {
  FLEXX_MENU_ITEM_IDS,
  FlexxMenuItem,
} from '@components/FlexxLayout/FlexxVerticalLayout/FlexxSideBarMenu/flexx-sidebar-menu.domain';

interface FlexxMenuItemsGroup {
  id: string;
  items: FlexxMenuItem[];
}

const HomeMenuItem: FlexxMenuItem = {
  id: FLEXX_MENU_ITEM_IDS.HOME,
  icon: 'fluent--home-12-regular',
  title: 'Home',
  href: '/home',
};

const AccountsMenuItem: FlexxMenuItem = {
  id: FLEXX_MENU_ITEM_IDS.ACCOUNTS,
  icon: 'fluent--building-bank-16-regular',
  title: 'Accounts',
  href: '/accounts',
};

const TopGroup: FlexxMenuItemsGroup = {
  id: 'top-group',
  items: [HomeMenuItem, AccountsMenuItem],
};

export const FlexxMenuGroups: Array<FlexxMenuItemsGroup> = [TopGroup];

export const FlexxBottomMenuGroups: Array<FlexxMenuItemsGroup> = [];
