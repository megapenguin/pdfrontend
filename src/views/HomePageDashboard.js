import React,{Suspense} from 'react'
import { SyncOutlined } from "@ant-design/icons";

import {HomePage} from '../components/homepage';
function HomePageDashboard() {
    return (
        <div>
            <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <HomePage/>
      </Suspense>
        </div>
    )
}

export default HomePageDashboard
