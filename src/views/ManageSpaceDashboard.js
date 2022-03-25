import React, { Suspense } from "react";
import { SyncOutlined } from "@ant-design/icons";

import { ManageSpace } from "../components/managespace";
function ManageSpaceDashboard() {
	return (
		<div>
			<Suspense
				fallback={
					<div className="icons-list">
						<SyncOutlined spin />
					</div>
				}
			>
				<ManageSpace />
			</Suspense>
		</div>
	);
}

export default ManageSpaceDashboard;
