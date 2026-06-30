import { Code2 } from "lucide-react";
import ServiceCategoryTemplate from "./ServiceCategoryTemplate";
import { SERVICE_PROCESS_STEPS, SERVICE_WHY_CARDS } from "./serviceSharedData";

const offerings = [
  { title: "Custom Business Software", desc: "Purpose-built applications that match your actual workflows instead of forcing you to adapt to generic tools." },
  { title: "Web & Internal Applications", desc: "Customer-facing websites and internal tools designed for clarity, speed, and ease of maintenance." },
  { title: "Workflow Automation Systems", desc: "Automating repetitive manual tasks across teams to cut errors and free up valuable staff time." },
  { title: "Digital Process Tooling", desc: "Dashboards, trackers, and integrations that bring scattered processes into a single, reliable system." },
];

export default function SoftwareDevelopmentPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="Software & App Development"
      title="Software & App Development"
      description="Purpose-built business software and web applications that automate workflows and eliminate operational bottlenecks."
      Icon={Code2}
      accent="#06B6D4"
      heroBg="circuit"
      offerings={offerings}
      processSteps={SERVICE_PROCESS_STEPS}
      whyCards={SERVICE_WHY_CARDS}
      highlights={["Custom applications", "Workflow automation", "Systems integration", "Internal tooling"]}
    />
  );
}
