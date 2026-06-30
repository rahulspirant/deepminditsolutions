import { Headset } from "lucide-react";
import ServiceCategoryTemplate from "./ServiceCategoryTemplate";
import { SERVICE_PROCESS_STEPS, SERVICE_WHY_CARDS } from "./serviceSharedData";

const offerings = [
  { title: "24/7 Infrastructure Monitoring", desc: "Round-the-clock visibility into servers, network, and critical systems so issues are caught before users notice." },
  { title: "Helpdesk & User Support", desc: "Responsive, friendly support for day-to-day technical issues, freeing your team to focus on the business." },
  { title: "Patch Management & Maintenance", desc: "Scheduled updates and maintenance windows that keep systems secure and current without surprise downtime." },
  { title: "Asset Lifecycle Assistance", desc: "Tracking, planning, and refreshing hardware and licenses so nothing falls out of support unexpectedly." },
];

export default function ManagedItServicesPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="Managed IT Services"
      title="Managed IT Services"
      description="Proactive monitoring, user support, and lifecycle management so your technology operates reliably without burdening your team."
      Icon={Headset}
      accent="#F59E0B"
      heroBg="mesh"
      offerings={offerings}
      processSteps={SERVICE_PROCESS_STEPS}
      whyCards={SERVICE_WHY_CARDS}
      highlights={["24/7 monitoring", "Helpdesk support", "Patch management", "Lifecycle planning"]}
    />
  );
}
