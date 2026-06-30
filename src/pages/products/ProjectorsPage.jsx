import { Projector } from "lucide-react";
import ProductCategoryTemplate from "./ProductCategoryTemplate";

export default function ProjectorsPage() {
  return (
    <ProductCategoryTemplate
      eyebrow="Product Category"
      title="Projectors"
      description="Boardroom and large-venue projection systems — installation-grade hardware for training rooms, classrooms, and auditoriums, with mount, screen, and alignment support."
      Icon={Projector}
      accent="#10B981"
      heroBg="techgrid"
      brandsBg="network"
      highlights={["Laser Projectors", "4K & HDR", "24/7 Operation Rated"]}
      brands={[
        {
          name: "Optoma",
          tagline: "High-End Projection Systems",
          desc: "Optoma specializes in high-end projection systems, including professional laser projectors, offering high brightness, 4K and HDR compatibility, and dust-resistant optical engines built for 24/7 operation.",
          image:
            "https://deepminditsolutions.com/product/optoma_high_end_projection_systems_only_product.jpeg",
        },
      ]}
    />
  );
}
