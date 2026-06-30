import { ShieldCheck } from "lucide-react";
import ProductCategoryTemplate from "./ProductCategoryTemplate";

export default function FirewallPage() {
  return (
    <ProductCategoryTemplate
      eyebrow="Product Category"
      title="Firewall"
      description="Next-generation perimeter security platforms that enforce policy, protect access paths, and provide visibility across your network edge — built for every business scale."
      Icon={ShieldCheck}
      accent="#EF4444"
      heroBg="mesh"
      brandsBg="circuit"
      highlights={["Next-Gen Firewalls", "Threat Prevention", "Secure Remote Access"]}
      brands={[
        {
          name: "Fortinet",
          tagline: "Firewall",
          desc: "Fortinet is a prominent cybersecurity company known for its FortiGate series of firewalls, providing comprehensive network security with integrated threat protection.",
          image: "https://deepminditsolutions.com/product/fortinet_firewall_only_product_img.jpeg",
        },
        {
          name: "SonicWall",
          tagline: "Firewall",
          desc: "SonicWall offers next-generation firewalls (NGFWs) and cybersecurity solutions designed to protect organizations from advanced cyber threats with deep packet inspection and intrusion prevention.",
          image: "https://deepminditsolutions.com/product/sonicwall_firewall_only_product_img.jpeg",
        },
        {
          name: "Palo Alto Networks",
          tagline: "Firewall",
          desc: "Palo Alto Networks is a leader in next-generation firewalls, known for deep visibility and control over applications, users, and content on the network, with advanced threat prevention.",
          image:
            "https://deepminditsolutions.com/product/palo_alto_networks_firewall_only_product.jpeg",
        },
      ]}
    />
  );
}
