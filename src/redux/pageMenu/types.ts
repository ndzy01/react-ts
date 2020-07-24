export interface PageMenu {
  id: string;
  pId: string;
  menuIcon: string;
  name: string;
  url: string;
  type?: number;
  children: PageMenu[];
}
