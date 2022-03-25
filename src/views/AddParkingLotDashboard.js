import React,{Suspense} from 'react'
import { SyncOutlined } from "@ant-design/icons";

import {AddParkingLot} from '../components/addparkinglot';
function AddParkingLotDashboard() {
    return (
        <div>
            <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <AddParkingLot/>
      </Suspense>
        </div>
    )
}

export default AddParkingLotDashboard
