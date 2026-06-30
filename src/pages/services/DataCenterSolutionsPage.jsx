import { Server } from "lucide-react";
import ServiceCategoryTemplate from "./ServiceCategoryTemplate";
import { SERVICE_PROCESS_STEPS, SERVICE_WHY_CARDS } from "./serviceSharedData";

const offerings = [
  { title: "Server Room Design & Planning", desc: "Layouts engineered for airflow, cabling, and access — built to support today's load and tomorrow's expansion." },
  { title: "Rack, Storage & Compute Setup", desc: "Properly racked, labeled, and documented server, storage, and compute infrastructure for fast operations." },
  { title: "Power, Cooling & UPS Systems", desc: "Resilient power and cooling design that keeps critical systems running through outages and load spikes." },
  { title: "Infrastructure Consolidation", desc: "Right-sizing and consolidating legacy hardware to cut cost, complexity, and energy use without losing capacity." },
];

export default function DataCenterSolutionsPage() {
  return (
    <ServiceCategoryTemplate
      eyebrow="Data Center Solutions"
      title="Data Center Solutions"
      description="Full-scope data center builds — from server room layouts to rack infrastructure — engineered for density, uptime, and future scale."
      Icon={Server}
      accent="#10B981"
      heroBg="techgrid"
      offerings={offerings}
      processSteps={SERVICE_PROCESS_STEPS}
      whyCards={SERVICE_WHY_CARDS}
      highlights={["Server room design", "Rack & power planning", "Cooling systems", "Resilient uptime"]}
    />
  );
}
