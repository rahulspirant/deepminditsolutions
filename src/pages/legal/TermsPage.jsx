import LegalPage from "./LegalPage";

const sections = [
  {
    heading: "Acceptance of Terms",
    paragraphs: [
      "These Terms and Conditions (\"Terms\") govern your access to and use of the Deep Mind IT Solutions website and the services we provide, including networking, cloud, cyber security, data center, managed IT, and software development services. By accessing our website or engaging our services, you agree to be bound by these Terms.",
    ],
  },
  {
    heading: "Our Services",
    paragraphs: [
      "Deep Mind IT Solutions provides enterprise IT infrastructure, cloud, security, managed support, and custom business application services. Specific scope, deliverables, timelines, and pricing for any engagement are defined in a separate proposal, quotation, or service agreement signed between Deep Mind IT Solutions and the client, which takes precedence over this general website content where applicable.",
    ],
  },
  {
    heading: "Website Use",
    paragraphs: ["When using our website, you agree not to:"],
    list: [
      "Use the website for any unlawful purpose or in violation of any applicable regulation.",
      "Attempt to gain unauthorized access to our systems, servers, or networks.",
      "Copy, reproduce, or distribute website content without our prior written consent.",
      "Interfere with the proper functioning of the website or introduce malicious code.",
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      "All content on this website, including text, graphics, logos, product names, and designs, is the property of Deep Mind IT Solutions or its licensors and is protected under applicable intellectual property laws. Product and brand names referenced on this site belong to their respective owners and are used for identification purposes only.",
    ],
  },
  {
    heading: "Quotations & Proposals",
    paragraphs: [
      "Pricing, product availability, and specifications shared on this website or in general communications are indicative and subject to change without prior notice. Formal quotations issued for a specific engagement remain valid only for the period stated in that quotation.",
    ],
  },
  {
    heading: "Service Engagements",
    paragraphs: [
      "For any project, support contract, or managed service engagement, specific terms covering scope, service levels, payment, warranties, and responsibilities will be documented in a dedicated agreement. Where there is a conflict between these website Terms and a signed service agreement, the signed agreement will govern.",
    ],
  },
  {
    heading: "Limitation of Liability",
    paragraphs: [
      "Deep Mind IT Solutions provides this website and its general content on an \"as is\" basis. While we take reasonable care to keep information accurate and up to date, we do not guarantee that the website will be error-free or uninterrupted. To the extent permitted by law, we are not liable for any indirect, incidental, or consequential loss arising from the use of this website, except as otherwise agreed in a specific service contract.",
    ],
  },
  {
    heading: "Third-Party Products & Partners",
    paragraphs: [
      "Where we recommend, supply, or implement third-party hardware or software (including networking, server, security, AV, or surveillance products), those products remain subject to the respective manufacturer's or OEM's own warranty and license terms, in addition to any service terms agreed with us.",
    ],
  },
  {
    heading: "Confidentiality",
    paragraphs: [
      "We treat client information, network architecture details, and project data shared during engagements as confidential, and we expect the same discretion in return regarding any proprietary information we share as part of our services.",
    ],
  },
  {
    heading: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of India. Any disputes arising from the use of this website or our general business relationship will be subject to the jurisdiction of the courts located in Lucknow, Uttar Pradesh, unless otherwise agreed in a specific service contract.",
    ],
  },
  {
    heading: "Changes to These Terms",
    paragraphs: [
      "We may revise these Terms from time to time to reflect changes in our services or legal requirements. Updates will be posted on this page along with a revised \"Last updated\" date. We encourage you to review this page periodically.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These Terms and Conditions govern your use of the Deep Mind IT Solutions website and outline the general principles that apply across our networking, cloud, security, data center, managed IT, and software services."
      updatedOn="January 2026"
      sections={sections}
    />
  );
}
