import { Network } from "lucide-react";
import ServiceCategoryTemplate from "./ServiceCategoryTemplate";
import { SERVICE_PROCESS_STEPS, SERVICE_WHY_CARDS } from "./serviceSharedData";

const offerings = [
  { title: "Structured Cabling & Switching", desc: "Clean, documented, standards-compliant cabling and switch layers built for reliability and easy troubleshooting." },
  { title: "Routing & Enterprise Wi-Fi", desc: "High-availability routing and seamless, secure Wi-Fi coverage across offices, floors, and campuses." },
  { title: "Network Segmentation & VLANs", desc: "Logical separation of traffic for performance, security, and easier policy management across departments." },
  { title: "Capacity Planning & Optimization", desc: "Bandwidth and hardware sized for current load with clear headroom for growth, avoiding costly re-architecture." },
];

export default function NetworkInfrastructurePage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="Network Infrastructure"
      title="Network Infrastructure"
      description="End-to-end structured network design — from core switching to enterprise-wide Wi-Fi — built for reliability, performance, and growth."
      Icon={Network}
      accent="#3B82F6"
      heroBg="network"
      offerings={offerings}
      processSteps={SERVICE_PROCESS_STEPS}
      whyCards={SERVICE_WHY_CARDS}
      highlights={["Structured cabling", "Enterprise Wi-Fi", "VLAN segmentation", "Capacity planning"]}
    />
  );
}
