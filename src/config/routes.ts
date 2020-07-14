import { lazy } from 'react';
import { Route, MRouteItem, SlideBarConfig, MenuRouter } from '../types';

const routes: MRouteItem[] = [
  {
    path: '/home', // 主页
    view: 'home/index',
    breadcrumbName: '主页',
  },
  // ------components------
  {
    path: '/clock',
    components: 'clock/clock',
    breadcrumbName: '时钟',
  },
  {
    path: '/drawer',
    components: 'drawer/index',
    breadcrumbName: '抽屉',
  },
  {
    path: '/print',
    components: 'printA4/print',
    breadcrumbName: 'print',
  },
  {
    path: '/baseForm',
    components: 'baseForm',
    breadcrumbName: 'baseForm',
  },
  {
    path: '/useAntdTable01',
    components: 'useAntdTable/useAntdTable01',
    breadcrumbName: 'useAntdTable01',
  },
  {
    path: '/addworkRecord',
    components: 'workRecords/form',
    breadcrumbName: '添加工作记录',
  },
  {
    path: '/workRecords',
    components: 'workRecords/records',
    breadcrumbName: '工作记录',
  },
  {
    path: '/workRecordShow',
    components: 'workRecords/recordShow',
    breadcrumbName: '工作记录展示',
  },
  {
    path: '/ahooks/useRequest',
    components: 'ahooks/useRequest',
    breadcrumbName: 'useRequest',
  },
  {
    path: '/ahooks/lifeCycle',
    components: 'ahooks/lifeCycle',
    breadcrumbName: 'lifeCycle',
  },
  {
    path: '/menu',
    components: 'menu/menu',
    breadcrumbName: 'menu',
  },
  {
    path: '/redux-test',
    components: 'reduxTest',
    breadcrumbName: 'reduxTest',
  },
];
const routes_: Route[] = routes.map((route) => {
  const obj: Route = {
    path: route.path, // 主页
    breadcrumbName: route.breadcrumbName,
  };
  return obj;
});
for (const item of routes) {
  if (item.view) {
    item.component = lazy(() => import(('../views/' + item.view) as string));
  }
  if (item.components) {
    item.component = lazy(() =>
      import(('../components/' + item.components) as string)
    );
  }
}

const slideBarConfig: SlideBarConfig[] = [
  {
    key: '/home',
    name: 'home',
    icon: 'home',
    path: '/home',
  },
  {
    key: '/clock',
    icon: 'clock',
    name: '时钟',
    path: '/clock',
  },
  {
    key: '/workRecord',
    title: '工作记录',
    icon: 'record',

    path: '/workRecord',
    children: [
      {
        key: '/addworkRecord',
        name: '添加记录',
        path: '/addworkRecord',
      },
      {
        key: '/workRecords',

        name: '记录管理',
        path: '/workRecords',
      },
      {
        key: '/workRecordShow',
        name: '记录展示',
        path: '/workRecordShow',
      },
    ],
  },
  {
    key: '/redux-test',
    icon: 'redux',
    name: 'redux',
    path: '/redux-test',
  },
];

const menuRouter: MenuRouter[] = [
  {
    favicon: '',
    menuIcon: '',
    prefix: '',
    serviceGroup: '',
    pId: 0,
    sort: 1,
    nameEn: '',
    title: '',
    type: 0,
    url: '/home',
    router: null,
    children: [],
    serverType: 0,
    name: 'home',
    logo: '',
    id: 1,
  },
  {
    favicon: '',
    menuIcon: '',
    prefix: '',
    serviceGroup: '',
    pId: 0,
    sort: 1,
    nameEn: '',
    title: '',
    type: 0,
    url: '/clock',
    router: null,
    children: [],
    serverType: 0,
    name: '时钟',
    logo: '',
    id: 2,
  },
  {
    favicon: '',
    menuIcon: '',
    prefix: '',
    serviceGroup: '',
    pId: 0,
    sort: 1,
    nameEn: '',
    title: '工作记录',
    type: 0,
    url: '/workRecord',
    router: null,
    serverType: 0,
    name: '工作记录',
    logo: '',
    id: 3,

    children: [
      {
        favicon: '',
        menuIcon: '',
        prefix: '',
        serviceGroup: '',
        pId: 0,
        sort: 1,
        nameEn: '',
        title: '',
        type: 0,
        url: '/addworkRecord',
        router: null,
        children: [],
        serverType: 0,
        name: '添加记录',
        logo: '',
        id: 31,
      },
      {
        favicon: '',
        menuIcon: '',
        prefix: '',
        serviceGroup: '',
        pId: 0,
        sort: 1,
        nameEn: '',
        title: '',
        type: 0,
        url: '/workRecords',
        router: null,
        children: [],
        serverType: 0,
        name: '记录管理',
        logo: '',
        id: 32,
      },
      {
        favicon: '',
        menuIcon: '',
        prefix: '',
        serviceGroup: '',
        pId: 0,
        sort: 1,
        nameEn: '',
        title: '',
        type: 0,
        url: '/workRecordShow',
        router: null,
        children: [],
        serverType: 0,
        name: '记录展示',
        logo: '',
        id: 32,
      },
    ],
  },
  {
    favicon: '',
    menuIcon: '',
    prefix: '',
    serviceGroup: '',
    pId: 0,
    sort: 1,
    nameEn: '',
    title: '',
    type: 0,
    url: '/redux-test',
    router: null,
    children: [],
    serverType: 0,
    name: 'redux-test',
    logo: '',
    id: 4,
  },
];

// export routes_
export default { routes, routes_, slideBarConfig, menuRouter };
