import { Action } from 'redux-actions';
import { PageTab } from '../../../redux/pageTab/types';
import React, {
  // ReactNode,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { useMount, useSessionStorageState } from 'ahooks';
import { Link } from 'react-router-dom';
import { setActiveKey, addPageTab } from '../../../redux/pageTab/actions';
import { getPageMenu } from '../../../redux/pageMenu/actions';
import store from '../../../redux/redux';
import './menu.scss';
import { SelectParam } from 'antd/lib/menu';
import { useAxiosReq } from '../../../http';
import { PageMenu } from '../../../redux/pageMenu/types';

interface Props {
  collapsed: boolean;
  setActiveKey(key: string): Action<string[]>;
  addPageTab(pageTab: PageTab): Action<PageTab>;
  getPageMenu(): any;
}

const { SubMenu } = Menu;

export default connect((state) => state, {
  setActiveKey,
  addPageTab,
  getPageMenu,
})((props: Props) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [rootSubmenuKeys, setRootSubmenuKeys] = useState<string[]>([]);
  const [router, setRouter] = useSessionStorageState('router', '');
  const { run: requestLogoRun } = useAxiosReq();

  // 设置 logo
  const setLogo = (url: string) => {
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  };
  const recursionMenus = (
    items: PageMenu[],
    action: (item: PageMenu) => boolean
  ): void => {
    for (const item of items) {
      if (!action(item)) {
        return;
      }
      if (item.children) {
        recursionMenus(item.children, action);
      }
    }
  };

  const findMenuByKey = (key: string): PageMenu | null => {
    const { pageMenu } = store.getState().pageMenuReducer;

    let result: PageMenu | null = null;
    recursionMenus(pageMenu, (item: PageMenu) => {
      if (item.url && item.url == key) {
        result = item;
        return false;
      }
      return true;
    });
    return result;
  };

  useMount(async () => {
    await props.getPageMenu();
    const { pageMenu } = store.getState().pageMenuReducer;
    console.log(pageMenu);
    requestLogoRun({ url: '/layout/logo', method: 'get' }).then((res) => {
      setLogo(res.data && res.data.url);
    });
    setOpenKeys([pageMenu[0].url]);
    setRootSubmenuKeys(pageMenu.map((menu: PageMenu) => menu.url));
    const defaultPageTab = {
      name: router
        ? (findMenuByKey(router) as PageMenu).name
        : pageMenu[0].children[0].name,
      url: router
        ? (findMenuByKey(router) as PageMenu).url
        : pageMenu[0].children[0].url,
    };
    if (!router) {
      props.setActiveKey(pageMenu[0].children[0].url);
    }

    props.addPageTab(defaultPageTab);
  });

  const getSubmenu = () => {
    const { pageMenu } = store.getState().pageMenuReducer;

    return pageMenu.map((item: PageMenu) => {
      if (item.children.length === 0) {
        return (
          <Menu.Item key={item.url} icon={item.menuIcon}>
            <Link to={item.url} replace>
              <span>{item.name}</span>

              {/*加一个replace是因为当前路由下的 history 不能 push 相同的路径到 stack 里。只有开发环境存在，生产环境不存在，目前还没看到官方有去掉的意思*/}
            </Link>
          </Menu.Item>
        );
      } else {
        const menuRouters: PageMenu[] = [];

        item.children.map((v: PageMenu) => {
          menuRouters.push(v);
          return true;
        });

        if (menuRouters.length > 0) {
          return (
            <SubMenu
              key={item.url}
              icon={item.menuIcon}
              title={item.name}
              popupClassName="app-menu-sub-menu"
            >
              {menuRouters.map((v) => {
                return (
                  <Menu.Item key={v.url} icon={v.menuIcon}>
                    <Link to={v.url} replace>
                      <span>{v.name}</span>
                    </Link>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        }
      }
      return true;
    });
  };

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey: string =
      openKeys.find((key) => openKeys.indexOf(key) === -1) || '';
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSelect = (value: SelectParam) => {
    const pageTab = {
      name: findMenuByKey(value.key)?.name || '',
      url: findMenuByKey(value.key)?.url || '',
    };
    setRouter(value.key);
    props.setActiveKey(value.key);
    props.addPageTab(pageTab);
  };

  return (
    <div className="app-menu">
      <Menu
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        theme="light"
        mode={!props.collapsed ? 'inline' : 'vertical'}
        defaultSelectedKeys={
          router ? [router] : store.getState().pageTabReducer.activeKey
        }
        selectedKeys={
          router ? [router] : store.getState().pageTabReducer.activeKey
        }
      >
        {getSubmenu()}
      </Menu>
    </div>
  );
});
