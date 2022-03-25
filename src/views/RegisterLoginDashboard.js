import React,{Suspense} from 'react'
import { SyncOutlined } from "@ant-design/icons";
import {RegisterLogin} from '../components/registerlogin';
function RegisterLoginDashboard() {
    return (
        <div>
            <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <RegisterLogin/>
      </Suspense>
        </div>
    )
}

export default RegisterLoginDashboard
