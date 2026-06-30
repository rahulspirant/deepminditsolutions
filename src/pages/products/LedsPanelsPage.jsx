import { Monitor } from "lucide-react";
import ProductCategoryTemplate from "./ProductCategoryTemplate";

export default function LedsPanelsPage() {
  return (
    <ProductCategoryTemplate
      eyebrow="Product Category"
      title="LEDs & Interactive Panels"
      description="Display, signage, and collaborative meeting technology for boardrooms, classrooms, and presentation environments that demand clarity and reliability."
      Icon={Monitor}
      accent="#8B5CF6"
      heroBg="orbs"
      brandsBg="techgrid"
      highlights={["Interactive Flat Panels", "Video Walls", "4K Ultra HD Displays"]}
      brands={[
        {
          name: "Newline",
          tagline: "Interactive Panels",
          desc: "Newline specializes in interactive flat panels for collaborative workspaces in education and business — combining touch functionality, high-resolution visuals, and integrated software for engaging experiences.",
          image:
            "https://deepminditsolutions.com/product/newline_interactive_panels_only_product_img.jpeg",
        },
        {
          name: "LG",
          tagline: "TV, Video Wall & Interactive Panels",
          desc: "LG offers a diverse portfolio of commercial displays, including large-format TVs, near-seamless video walls for impactful advertising, and interactive panels with 4K Ultra HD visuals and multi-touch capability.",
          image: "https://deepminditsolutions.com/product/lg_tv_video_wall_interactive.jpeg",
        },
      ]}
    />
  );
}
