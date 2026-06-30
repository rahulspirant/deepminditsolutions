import { ShieldCheck } from "lucide-react";
import ServiceCategoryTemplate from "./ServiceCategoryTemplate";
import { SERVICE_PROCESS_STEPS, SERVICE_WHY_CARDS } from "./serviceSharedData";

const offerings = [
  { title: "Firewall & Perimeter Hardening", desc: "Next-gen firewall design and tuning to control traffic, block threats, and enforce policy at the edge." },
  { title: "Endpoint Detection & Response", desc: "Continuous monitoring and rapid response across laptops, servers, and devices to contain threats early." },
  { title: "Identity & Access Governance", desc: "Role-based access, MFA, and least-privilege policies that reduce your attack surface across systems." },
  { title: "Continuous Risk Monitoring", desc: "Ongoing vulnerability scanning and alerting so emerging risks are caught before they become incidents." },
];

export default function CyberSecurityPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="Cyber Security"
      title="Cyber Security"
      description="Defense-in-depth security frameworks that protect your perimeter, endpoints, and access paths against modern threats."
      Icon={ShieldCheck}
      accent="#EF4444"
      heroBg="circuit"
      offerings={offerings}
      processSteps={SERVICE_PROCESS_STEPS}
      whyCards={SERVICE_WHY_CARDS}
      highlights={["Firewall hardening", "Endpoint protection", "Access governance", "Risk monitoring"]}
    />
  );
}
