import React, { Suspense } from "react";
import { SyncOutlined } from "@ant-design/icons";

import { Provider } from "../components/provider";
function ProviderDashboard() {
	return (
		<div>
			<Suspense
				fallback={
					<div className="icons-list">
						<SyncOutlined spin />
					</div>
				}
			>
				<Provider />
			</Suspense>
		</div>
	);
}

export default ProviderDashboard;
