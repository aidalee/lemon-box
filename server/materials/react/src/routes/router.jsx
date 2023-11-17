/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import LayUi from '../layout';

/**
 * 如果是 “嵌套路由” 的页面则父级页面不需要懒加载，举个🌰：<layUi/> 这个组件就是嵌套了下面的子路由页面，所以它不需要懒加载，下面的子路由懒加载即可
 * @param children ReactNode
 * @returns ReactNode
 */
const lazyload = (children) => {
  return <Suspense fallback={<Spin />}>{children}</Suspense>
}

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const UserList = lazy(()=>import('@/pages/UserList/list'))
const routes = [
  {
    path: "/login",
    element: lazyload(<Login />),
  },
  {
    path: "/",
    element: <LayUi />,
    children: [
      {
        title: "首页",
        path: "/home",
        element: lazyload(<Home />),
      },
      {
        title: "用户列表",
        path: "/user-list",
        element: lazyload(<UserList />),
      },
    ]
  }
]

export default routes;