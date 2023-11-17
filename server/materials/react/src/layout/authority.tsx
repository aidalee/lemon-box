import { useNavigate } from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { message, Spin } from 'antd';
interface AuthorityProps {
  children: React.ReactElement
}

const Authority: React.FC<AuthorityProps> = ({ children }) => {
  const [logging, setLogging] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('isLogin')) {
      navigate('/home')
      setLogging(false)
      setIsLogin(true)
    }else {
      navigate('/login')
      setLogging(false)
      setIsLogin(false)
    }
  }, [])
  return <Spin spinning={logging}>
    {
      isLogin?
      children:
      null
    }
  </Spin>
};

export default Authority;