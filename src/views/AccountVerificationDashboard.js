import React,{Suspense} from 'react'
import { SyncOutlined } from "@ant-design/icons";

import {AccountVerification} from '../components/accountverification';
function AccountVerificationDashboard() {
    return (
        <div>
            <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <AccountVerification/>
      </Suspense>
        </div>
    )
}

export default AccountVerificationDashboard
