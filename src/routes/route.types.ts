import { ComponentType } from 'react';

interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: React.ReactNode;
  locale?: string;
  name?: string;
  key?: string;
  path?: string;
  [key: string]: any;
  parentKeys?: string[];
  // 路由
  component?: ComponentType;
  exact?: boolean;
  strict?: boolean;
}
export default MenuDataItem;
