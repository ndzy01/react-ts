import { RouteProps } from 'react-router';
import { lazy } from 'react';

interface IRouteItem extends RouteProps {
  view?: string;
  components?: string;
}

let routes: IRouteItem[] = [
  {
    path: '/home', // 主页
    view: 'home/index',
  },
  // ------components------
  {
    path: '/clock',
    components: 'clock/clock',
  },
  {
    path: '/drawer',
    components: 'drawer/index',
  },
];

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

export default routes;
