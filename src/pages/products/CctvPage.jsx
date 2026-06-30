import { Camera } from "lucide-react";
import ProductCategoryTemplate from "./ProductCategoryTemplate";

export default function CctvPage() {
  return (
    <ProductCategoryTemplate
      eyebrow="Product Category"
      title="CCTV Surveillance"
      description="IP cameras, NVRs, and complete site coverage — IP-based camera infrastructure designed for comprehensive monitoring, remote access, and evidence-grade recording."
      Icon={Camera}
      accent="#A855F7"
      heroBg="mesh"
      brandsBg="techgrid"
      highlights={["IP Cameras & NVRs", "Remote Monitoring", "Intelligent Detection"]}
      brands={[
        {
          name: "Hikvision",
          tagline: "Network & Turbo HD Surveillance",
          desc: "Hikvision is a global leader in video surveillance products and solutions, with network (IP) cameras, Turbo HD cameras, NVRs, DVRs, and intelligent monitoring technologies like ColorVu and AcuSense.",
          image: "https://deepminditsolutions.com/product/hikvision_only_product_img.jpeg",
        },
        {
          name: "Dahua",
          tagline: "Surveillance & Access Control",
          desc: "Dahua Technology is a major provider of video surveillance products and services, including network cameras, HDCVI cameras, PTZ cameras, thermal cameras, and access control and intelligent traffic systems.",
          image: "https://deepminditsolutions.com/product/dahua_only_product_img.jpeg",
        },
        {
          name: "Prama",
          tagline: "CCTV Surveillance Products",
          desc: "Prama distributes and manufactures CCTV surveillance products, often in partnership with global leaders, with a range of dome, bullet, and PTZ cameras, DVRs, NVRs, and accessories.",
          image:
            "https://deepminditsolutions.com/product/dahua_keval_product_img_with_prama.jpeg",
        },
        {
          name: "NIvision",
          tagline: "Industrial Vision Systems",
          desc: "NIvision focuses on industrial vision systems that integrate cameras for image acquisition and controllers for image processing — built for demanding manufacturing and embedded vision applications like quality control and inspection.",
          image: "https://deepminditsolutions.com/product/nivision_only_product_img.jpeg",
        },
      ]}
    />
  );
}
