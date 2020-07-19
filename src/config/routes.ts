import { lazy } from 'react';
import { Route, MRouteItem } from '../types';

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

// export routes_
export default { routes, routes_ };
