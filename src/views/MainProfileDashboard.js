
import React,{Suspense} from 'react'
import { SyncOutlined } from "@ant-design/icons";
import {MainProfile} from '../components/mainprofile'
function MainProfileDashboard() {
    return (
        <div>
            <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <MainProfile/>
      </Suspense>
        </div>
    )
}

export default MainProfileDashboard
