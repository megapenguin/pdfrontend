
import React,{Suspense} from 'react'
import { SyncOutlined } from "@ant-design/icons";
import {ProfileInfo} from '../components/profileinfo'
function ProfileInfoDashboard() {
    return (
        <div>
            <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <ProfileInfo/>
      </Suspense>
        </div>
    )
}

export default ProfileInfoDashboard
