import {
  PoweroffOutlined
} from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { Button, Popover, Popconfirm } from 'antd';
import defaultProps from './_defaultProps';
import { menuList } from './menus'
import { useNavigate, Outlet } from "react-router-dom"
import Authority from './authority'
// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  const negative = useNavigate()
  // function footer() {
  //   return <div>footer</div>
  // }
  function linkTo (item) {
    negative(item.path)
  }
  const PopoverContent = () => {
    return (
      <div style={{cursor: 'pointer'}} className="popover-content">
        <div className="popover-top">
            七妮妮
          <div className="devider"></div>
        </div>
        <div className="popover-middle">
          个人信息
        </div>
        <div className="popover-bottom">
          <Popconfirm
            placement="bottom"
            title="确定登出系统?"
            onConfirm={logout}
            okText="是"
            cancelText="否"
          >
            <PoweroffOutlined style={{ color: '#7E818B', fontSize: '18px', marginRight: '8px' }} />
            退出
          </Popconfirm>
        </div>
      </div>
    )
  }
  function logout() {
    localStorage.removeItem('isLogin')
    negative('/login')
  }
  return (
    <Authority>
      <ProLayout
        token={{
          colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
          colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
          colorTextAppListIcon: 'rgba(255,255,255,0.85)',
          sider: {
            menuTextColor: 'rgba(18, 22, 26, 1)',
            menuSelectedTextColor: 'rgba(6, 121, 254, 1)',
            menuItemHoverBgColor: 'rgba(6, 121, 254, 0.06)',
            menuItemSelectedBgColor: 'rgba(6, 121, 254, 0.15)',
          },
        }}
        {...defaultProps}
        actionsRender={() => {
          return [
            <Popover trigger="click" content={PopoverContent}>
              <Button
                type="link"
                style={{ color: "#979aa2", marginLeft: '20px', display: 'flex', alignItems: 'center' }}
              >
                <img style={{ width: '24px', height: '24px', borderRadius: '24px', marginRight: '8px' }} src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" />
                <span>七妮妮</span>
              </Button>
            </Popover>
          ];
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <p
              style={{
                textAlign: 'center',
                paddingBlockStart: 12,
              }}
            >
              admin web
            </p>
          );
        }}
        menuItemRender={(item, dom) => (
          <span onClick={() => linkTo(item)}
          >
            {dom}
          </span>
        )}
        headerTitleRender={()=>(<h3 style={{paddingLeft: '10px', color: '#7842E8'}}>admin web</h3>)}
        route={menuList}
      >
        <Outlet />
      </ProLayout>
    </Authority>
    
  );
};