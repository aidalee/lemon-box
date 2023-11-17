import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { history, HistoryRouter } from './routes/index.ts'
import { ConfigProvider } from 'antd';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7842E8'
        }
      }}>
        <App />
      </ConfigProvider>
    </HistoryRouter>
  </React.StrictMode>
)
