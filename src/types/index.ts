import { RouteProps } from 'react-router';

export interface Route {
  path: string;
  breadcrumbName: string;
  children?: Omit<Route, 'children'>[];
}
export interface MRouteItem extends RouteProps {
  view?: string;
  path: string;
  components?: string;
  breadcrumbName: string;
}

export interface SlideBarConfig {
  key: string;
  name?: any;
  icon?: string;
  path: string;
  title?: any;
  hidden?: boolean;
  children?: SlideBarConfig[];
}

export interface MenuRouter {
  favicon: string;
  menuIcon: string;
  prefix: string;
  serviceGroup: string;
  pId: number;
  sort: number;
  nameEn: string;
  title: string;
  type: number;
  url: string;
  router: object | null;
  children: any[];
  serverType: number;
  name: string;
  logo: string;
  id: number;
}
