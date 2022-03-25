import React,{Suspense} from 'react'
import { SyncOutlined } from "@ant-design/icons";
import {RegistrationForm} from '../components/registrationform';
function RegistrationFormDashboard() {
    return (
        <div>
            <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <RegistrationForm/>
      </Suspense>
        </div>
    )
}

export default RegistrationFormDashboard
