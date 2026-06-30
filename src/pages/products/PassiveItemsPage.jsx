import { Cable } from "lucide-react";
import ProductCategoryTemplate from "./ProductCategoryTemplate";

export default function PassiveItemsPage() {
  return (
    <ProductCategoryTemplate
      eyebrow="Product Category"
      title="Passive Items"
      description="Structured cabling, racks, and connectivity essentials that form the physical layer every network depends on — supplied and installed to industry standards."
      Icon={Cable}
      accent="#64748B"
      heroBg="circuit"
      brandsBg="orbs"
      highlights={["Copper & Fiber Cabling", "Racks & Cabinets", "Cable Management"]}
      brands={[
        {
          name: "D-Link",
          tagline: "Passive Copper, Fiber & Components",
          desc: "D-Link offers passive networking components including copper cables (Cat5e, Cat6), fiber optic cables, and accessories essential for structured cabling infrastructure.",
          image:
            "https://deepminditsolutions.com/product/d_link_passive_copper_fiber_components%20(1).jpeg",
        },
        {
          name: "MSYS",
          tagline: "Passive Copper, Fiber & Components",
          desc: "MSYS Connect provides complete physical-layer infrastructure for enterprise LANs, including end-to-end twisted pair copper and fiber optic cabling, racks/cabinets, and cable management solutions.",
          image: "https://deepminditsolutions.com/product/msys_passive_copper_fiber_components.jpeg",
        },
        {
          name: "Belden",
          tagline: "Copper Cables",
          desc: "Belden is a leading manufacturer of high-quality cables and connectivity solutions. Its copper cables are built for excellent conductivity, durability, and reliability, ensuring signal integrity.",
          image: "https://deepminditsolutions.com/product/belden_copper_cables_only_product_img.jpeg",
        },
      ]}
    />
  );
}
