import { Network } from "lucide-react";
import ProductCategoryTemplate from "./ProductCategoryTemplate";

export default function SwitchesRouterPage() {
  return (
    <ProductCategoryTemplate
      eyebrow="Product Category"
      title="Switches, Router & Wi-Fi Products"
      description="Core, access, and distribution networking hardware from leading vendors — selected to match your topology, traffic profile, and scalability roadmap, from branch offices to high-density campus deployments."
      Icon={Network}
      accent="#06B6D4"
      heroBg="techgrid"
      brandsBg="mesh"
      highlights={["Managed Switching", "Enterprise Routing", "Wi-Fi 6 Wireless"]}
      brands={[
        {
          name: "Cisco",
          tagline: "Switches and Wi-Fi Products",
          desc: "Cisco is a global leader in networking hardware, offering high-performance, secure, and scalable solutions for campus, branch, and data center networks, alongside robust Wi-Fi products with Wi-Fi 6 capabilities.",
          image: "https://deepminditsolutions.com/product/cisco_switches_and_wi_fi_products.jpeg",
        },
        {
          name: "D-Link",
          tagline: "Copper, Fiber, Router, Switch & Wi-Fi AP",
          desc: "D-Link provides networking solutions for homes and businesses, including passive copper and fiber cabling components, routers, network switches, and Wi-Fi access points known for ease of use and affordability.",
          image: "https://deepminditsolutions.com/product/d_link_passive_copper_fiber_components.jpeg",
        },
        {
          name: "Aruba",
          tagline: "Switches and Wi-Fi Products (an HPE company)",
          desc: "Aruba specializes in intelligent edge networking. Its switches offer self-healing capabilities and Zero Trust security, while its Wi-Fi products deliver secure, high-performance wireless connectivity for users and IoT devices.",
          image: "https://deepminditsolutions.com/product/aruba_switches_and_wi_fi_products.jpeg",
        },
        {
          name: "Ubiquiti",
          tagline: "Indoor and Outdoor Wi-Fi",
          desc: "Ubiquiti offers high-performance, cost-effective Wi-Fi solutions for both indoor and outdoor deployments, popular for scalable, centrally managed networks.",
          image: "https://deepminditsolutions.com/product/ubiquiti_indoor_and_outdoor_wi_fi.jpeg",
        },
        {
          name: "NETGEAR",
          tagline: "Router, Network Switches L2, L3 & AV Line",
          desc: "NETGEAR provides networking products for home and business, including Layer 2/3 network switches and specialized AV Line switches engineered for AV-over-IP applications.",
          image: "https://deepminditsolutions.com/product/netgear_router_network_switches_l2_l3.jpeg",
        },
        {
          name: "Zyxel",
          tagline: "Network Switches & Access Points",
          desc: "Zyxel offers network switches and access points designed for small to medium-sized businesses and home offices, focused on reliable, secure connectivity with easy management.",
          image: "https://deepminditsolutions.com/product/zyxel_network_switches_access_points.jpeg",
        },
        {
          name: "TP-Link",
          tagline: "Router, Switch & Wi-Fi Access Point",
          desc: "TP-Link offers a broad selection of networking devices for home and business users — routers, network switches, and Wi-Fi access points — providing affordable, reliable connectivity.",
          image: "https://deepminditsolutions.com/product/tp_link_router_switch_wi_fi_access.jpeg",
        },
      ]}
    />
  );
}
