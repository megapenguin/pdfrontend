import React,{Suspense} from 'react'
import { SyncOutlined } from "@ant-design/icons";
import {Login} from '../components/login'
function LoginDashboard() {
    return (
        <div>
            <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <Login/>
      </Suspense>
        </div>
    )
}

export default LoginDashboard
