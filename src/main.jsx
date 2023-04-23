import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider theme={{token: {borderRadius: "10px"}}}>
        <App/>
    </ConfigProvider>  
);