import { Action } from 'redux-actions';
import { PageTab } from '../../../redux/pageTab/types';
import React, { ReactNode, useState } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { useMount } from 'ahooks';
// import { routes } from '../../../config';
import data from './data';
// import { SlideBarConfig, MenuRouter } from '../../../types';
// import { MenuRouter } from '../../../types';
import { Link } from 'react-router-dom';
import { setActiveKey, addPageTab } from '../../../redux/pageTab/actions';
// import { saveMenus } from '../../../redux/menu/actions';
import store from '../../../redux/redux';
import './menu.scss';
import { SelectParam } from 'antd/lib/menu';

export interface MenuItem {
  key?: string;
  name: string;
  url?: string;
  menuIcon?: string | ReactNode;
  children?: MenuItem[];
  type?: number;
}

interface Props {
  collapsed: boolean;
  setActiveKey(key: string): Action<string[]>;
  addPageTab(pageTab: PageTab): Action<PageTab>;
}

const { SubMenu } = Menu;
let menus_: any = [];

export default connect((state) => state, {
  setActiveKey,
  addPageTab,
})((props: Props) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [rootSubmenuKeys, setRootSubmenuKeys] = useState<string[]>([]);

  // 设置 logo
  const setLogo = (url: string) => {
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  };
  const recursionMenus = (
    items: MenuItem[],
    action: (item: MenuItem) => boolean
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

  const findMenuByKey = (key: string): MenuItem | null => {
    let result: MenuItem | null = null;
    recursionMenus(menus_, (item: MenuItem) => {
      if (item.url && item.url == key) {
        result = item;
        return false;
      }
      return true;
    });
    return result;
  };

  useMount(() => {
    const defaultPageTab = {
      name: '',
      url: '',
    };
    setLogo(data.data[0] && data.data[0].favicon);
    menus_ =
      data.data[0].children &&
      data.data[0].children.filter((item: any) => !item.type);

    setOpenKeys([menus_[0].url]);
    setRootSubmenuKeys(menus_.map((menu: any) => menu.url));
    defaultPageTab.name = menus_[0].children[0].name;
    defaultPageTab.url = menus_[0].children[0].url;
    props.setActiveKey(menus_[0].children[0].url);

    props.addPageTab(defaultPageTab);
  });

  const getSubmenu = () => {
    return menus_.map((item: any) => {
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
        const menuRouters: any[] = [];

        item.children.map((v: any) => {
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
        defaultSelectedKeys={store.getState().pageTabReducer.activeKey}
        selectedKeys={store.getState().pageTabReducer.activeKey}
      >
        {getSubmenu()}
      </Menu>
    </div>
  );
});
