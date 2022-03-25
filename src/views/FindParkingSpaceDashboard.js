import React,{Suspense} from 'react'
import { SyncOutlined } from "@ant-design/icons";

import {FindParkingSpace} from '../components/findparkingspace';
function FindParkingSpaceDashboard() {
    return (
        <div>
            <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <FindParkingSpace/>
      </Suspense>
        </div>
    )
}

export default FindParkingSpaceDashboard
