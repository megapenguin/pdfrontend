import React, { Suspense } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { ProviderRegistration } from "../components/providerregistration";
function ProviderRegistrationDashboard() {
	return (
		<div>
			<Suspense
				fallback={
					<div className="icons-list">
						<SyncOutlined spin />
					</div>
				}
			>
				<ProviderRegistration />
			</Suspense>
		</div>
	);
}

export default ProviderRegistrationDashboard;
