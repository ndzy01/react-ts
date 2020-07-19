export interface MenuData {
  id: number;
  pId: number;
  name: string;
  url: string;
  prefix: string;
  type: number;
  menuIcon: string;
  nameEn: string;
  sort: number;
  serverType: number;
  serviceGroup: string;
  router: string;
  title: string;
  logo: string;
  favicon: string;
  children: MenuData[];
}

// export interface Children_1 {
//   id: number;
//   pId: number;
//   name: string;
//   url: string;
//   prefix: string;
//   type: number;
//   menuIcon: string;
//   nameEn: string;
//   sort: number;
//   serverType: number;
//   serviceGroup: string;
//   router: string;
//   title: string;
//   logo: string;
//   favicon: string;
//   children: Children[];
// }

// export interface Children {
//   id: number;
//   pId: number;
//   name: string;
//   url: string;
//   prefix: string;
//   type: number;
//   menuIcon: string;
//   nameEn: string;
//   sort: number;
//   serverType: number;
//   serviceGroup: string;
//   router: string;
//   title: string;
//   logo: string;
//   favicon: string;
//   children: any[];
// }
