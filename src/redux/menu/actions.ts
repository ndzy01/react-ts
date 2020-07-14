export const SET_OPEN_KEY = 'SET_OPEN_KEY';
export const SAVE_MENUS = 'SAVE_MENUS';

interface SetOpenKey {
  type: typeof SET_OPEN_KEY;
  payload: string;
}
interface SaveMenus {
  type: typeof SAVE_MENUS;
  payload: any;
}

export function setOpenKey(key: string) {
  const action: SetOpenKey = {
    type: SET_OPEN_KEY,
    payload: key,
  };
  return action;
}

export function saveMenus(menus: any) {
  const action: SaveMenus = {
    type: SAVE_MENUS,
    payload: menus,
  };
  return action;
}
