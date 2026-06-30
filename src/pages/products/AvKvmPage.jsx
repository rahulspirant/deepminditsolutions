import { Tv2 } from "lucide-react";
import ProductCategoryTemplate from "./ProductCategoryTemplate";

export default function AvKvmPage() {
  return (
    <ProductCategoryTemplate
      eyebrow="Product Category"
      title="AV Solutions & KVM"
      description="Audio-visual systems and centralized device control for control rooms, broadcast environments, and enterprise presentation spaces."
      Icon={Tv2}
      accent="#F59E0B"
      heroBg="network"
      brandsBg="mesh"
      highlights={["KVM Switching", "Control Room AV", "Digital Whiteboards"]}
      brands={[
        {
          name: "Black Box",
          tagline: "KVM and AV Solution",
          desc: "Black Box provides a wide range of KVM and AV solutions, particularly for control rooms, focusing on secure KVM switching, centralized management, and seamless system integration.",
          image: "https://deepminditsolutions.com/product/black_box_kvm_and_av_solution.jpeg",
        },
        {
          name: "Aten",
          tagline: "KVM Switches & Cables",
          desc: "ATEN is a leading manufacturer of KVM switches and connectivity solutions, offering everything from desktop models to advanced KVM-over-IP solutions for data centers, along with KVM cables.",
          image: "https://deepminditsolutions.com/product/aten_kvm_switches_cables_only.jpeg",
        },
        {
          name: "PeopleLink",
          tagline: "AV Solutions",
          desc: "PeopleLink offers advanced AV solutions focused on interactive panels and digital whiteboards, designed to redefine collaboration with 4K Ultra HD displays, anti-glare screens, and multi-touch functionality.",
          image:
            "https://deepminditsolutions.com/product/peoplelink_av_solutions_only_product_img.jpeg",
        },
      ]}
    />
  );
}
