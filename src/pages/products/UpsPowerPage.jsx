import { BatteryCharging } from "lucide-react";
import ProductCategoryTemplate from "./ProductCategoryTemplate";

export default function UpsPowerPage() {
  return (
    <ProductCategoryTemplate
      eyebrow="Product Category"
      title="UPS Power"
      description="Battery backup and power continuity for critical systems — uninterruptible power supplies that protect infrastructure from outages, surges, and instability."
      Icon={BatteryCharging}
      accent="#F97316"
      heroBg="circuit"
      brandsBg="orbs"
      highlights={["Online UPS", "3-Phase Systems", "Runtime Extension"]}
      brands={[
        {
          name: "Eaton",
          tagline: "Online & 3-Phase UPSs",
          desc: "Eaton provides a wide range of UPS systems, including online and three-phase UPSs, designed for critical IT systems and industrial applications with high reliability and energy efficiency.",
          image: "https://deepminditsolutions.com/product/eaton_online_3_phase_upss.jpeg",
        },
        {
          name: "Vertiv",
          tagline: "Online & 3-Phase UPSs",
          desc: "Vertiv offers a comprehensive portfolio of critical infrastructure solutions, including online and three-phase UPS systems built to provide reliable power protection for data centers and communication networks.",
          image: "https://deepminditsolutions.com/product/vertiv_online_3_phase_upss.jpeg",
        },
        {
          name: "Numeric",
          tagline: "Online & 3-Phase UPSs",
          desc: "Numeric provides a variety of UPS systems, including online and three-phase solutions, delivering reliable power for IT systems, workstations, and other critical loads.",
          image: "https://deepminditsolutions.com/product/numeric_online_3_phase_upss.jpeg",
        },
      ]}
    />
  );
}
