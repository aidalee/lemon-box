import { SmileFilled } from '@ant-design/icons';

export const menuList = {
  path: '/',
  routes: [
    {
      path: '/home',
      name: '首页',
      icon: <SmileFilled />
    },
    {
      name: '用户列表',
      path: '/user-list',
      icon: <SmileFilled />
    }
  ]
}