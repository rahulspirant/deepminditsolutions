import { Server } from "lucide-react";
import ProductCategoryTemplate from "./ProductCategoryTemplate";

export default function ServerStoragePage() {
  return (
    <ProductCategoryTemplate
      eyebrow="Product Category"
      title="Server & Storage"
      description="Enterprise compute and storage infrastructure for modern data centers, edge deployments, and hybrid cloud environments — sized for real business workloads, not just spec sheets."
      Icon={Server}
      accent="#3B82F6"
      heroBg="network"
      brandsBg="techgrid"
      highlights={["Rack & Tower Servers", "SAN / NAS Storage", "Hybrid Cloud Ready"]}
      brands={[
        {
          name: "HPE",
          tagline: "Server and Storage",
          desc: "HPE (Hewlett Packard Enterprise) delivers a broad portfolio of servers and storage built to power modern data centers, edge computing, and hybrid cloud environments — with strong security, workload-optimized performance, and AI-driven management to simplify operations.",
          image: "https://deepminditsolutions.com/product/hpe_server_and_storage.jpeg",
        },
      ]}
    />
  );
}
