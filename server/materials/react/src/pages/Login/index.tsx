import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { httpLogin, httpRegister } from '@/api/index'
import './index.less'
import { history } from '@/routes'
import { useEffect, useState } from 'react';

const Login = () => {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('isLogin')){
      navigate('/home')
    }
  },[])

  const onFinish = (values: any) => {
    login(values)
  };

  function login(values: any) {
    history.push('/')
    localStorage.setItem('isLogin', "1")
    // httpLogin({...values}).then(res=>{
    //   if(res) {
    //     message.success('登录成功')
    //     history.push('/')
    //     localStorage.setItem('isLogin', "1")
    //   }
    // })
  }

  return (
    <div className='login'>
      <div className='loginBox'>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <>
            <Form.Item name="username" label="账号" rules={[{ required: true, message: '请输入账号' }]}>
              <Input placeholder="账号" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="密码" style={{ width: '100%' }} />
            </Form.Item>
          </>
          <Form.Item style={{marginBottom: '10px'}}>
            <Button type='primary' className='login-button' style={{width:'100%'}} htmlType="submit" >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login