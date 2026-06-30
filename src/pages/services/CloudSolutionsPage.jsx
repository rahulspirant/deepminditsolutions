import { Cloud } from "lucide-react";
import ServiceCategoryTemplate from "./ServiceCategoryTemplate";
import { SERVICE_PROCESS_STEPS, SERVICE_WHY_CARDS } from "./serviceSharedData";

const offerings = [
  { title: "Cloud Readiness Assessment", desc: "Evaluate workloads, dependencies, and risks to build a realistic, prioritized migration roadmap." },
  { title: "Migration Planning & Execution", desc: "Phased, low-disruption migration of servers, applications, and data to the right cloud environment." },
  { title: "Backup, DR & Recovery Design", desc: "Automated backup schedules and recovery plans that meet your RTO/RPO targets without manual guesswork." },
  { title: "Scalable Multi-Cloud Architecture", desc: "Hybrid and multi-cloud designs that avoid vendor lock-in while keeping cost and performance balanced." },
];

export default function CloudSolutionsPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="Cloud Solutions"
      title="Cloud Solutions"
      description="Strategic cloud migration and deployment that modernizes your infrastructure without disrupting day-to-day business operations."
      Icon={Cloud}
      accent="#8B5CF6"
      heroBg="orbs"
      offerings={offerings}
      processSteps={SERVICE_PROCESS_STEPS}
      whyCards={SERVICE_WHY_CARDS}
      highlights={["Hybrid cloud", "Backup & DR", "Scalable deployment", "Cost optimization"]}
    />
  );
}
