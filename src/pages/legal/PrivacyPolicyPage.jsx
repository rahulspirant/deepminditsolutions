import LegalPage from "./LegalPage";

const sections = [
  {
    heading: "Overview",
    paragraphs: [
      "Deep Mind IT Solutions (\"we\", \"our\", \"us\") respects your privacy and is committed to protecting the personal information you share with us through our website, proposals, support requests, and ongoing service engagements. This Privacy Policy explains what information we collect, how we use it, and the choices you have.",
      "By using our website or services, you agree to the practices described in this policy. If you do not agree, please discontinue use of our website or contact us before sharing personal information.",
    ],
  },
  {
    heading: "Information We Collect",
    paragraphs: [
      "We collect information that you provide directly, information generated through your use of our website, and information shared with us as part of project delivery and support.",
    ],
    list: [
      "Contact details such as name, company, email address, phone number, and location, submitted through forms or during consultations.",
      "Project and technical information shared while scoping networking, cloud, security, or infrastructure engagements.",
      "Usage data such as pages visited, browser type, device information, and approximate location, collected automatically through cookies and analytics tools.",
      "Communication records, including emails, call notes, and support tickets, used to deliver and improve our services.",
    ],
  },
  {
    heading: "How We Use Your Information",
    paragraphs: ["We use the information we collect for legitimate business purposes, including:"],
    list: [
      "Responding to enquiries, preparing proposals, and scheduling consultations or demos.",
      "Delivering, monitoring, and supporting IT infrastructure, cloud, security, and managed services.",
      "Improving our website, services, and customer experience based on usage patterns.",
      "Sending relevant updates, service notices, or marketing communications, where you have not opted out.",
      "Meeting legal, contractual, and regulatory obligations applicable to our business.",
    ],
  },
  {
    heading: "Cookies & Tracking Technologies",
    paragraphs: [
      "Our website may use cookies and similar technologies to remember preferences, understand how visitors use our site, and improve performance. You can control or disable cookies through your browser settings; doing so may affect certain website features.",
    ],
  },
  {
    heading: "How We Share Information",
    paragraphs: [
      "We do not sell your personal information. We may share information with trusted third parties only where necessary to operate our business, such as:",
    ],
    list: [
      "Technology and hosting partners that support our infrastructure, cloud, and security service delivery.",
      "Professional advisors, auditors, or regulators, where required by law.",
      "Vendors and OEM partners directly relevant to a product or solution you have requested, with your knowledge.",
    ],
  },
  {
    heading: "Data Security",
    paragraphs: [
      "As a company built around networking, cloud, and cyber security, we apply the same security discipline to our own systems that we recommend to clients — including access controls, encryption where appropriate, and monitored infrastructure. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Data Retention",
    paragraphs: [
      "We retain personal information only for as long as necessary to fulfil the purposes outlined in this policy, including ongoing service obligations, legal requirements, and legitimate business records.",
    ],
  },
  {
    heading: "Your Rights & Choices",
    paragraphs: ["Depending on your location, you may have the right to:"],
    list: [
      "Request access to the personal information we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of your information, subject to legal and contractual obligations.",
      "Opt out of marketing communications at any time using the unsubscribe option or by contacting us directly.",
    ],
  },
  {
    heading: "Third-Party Links",
    paragraphs: [
      "Our website may contain links to third-party websites or services, including OEM and partner sites. We are not responsible for the privacy practices or content of those external sites, and we encourage you to review their respective policies.",
    ],
  },
  {
    heading: "Children's Privacy",
    paragraphs: [
      "Our website and services are intended for business use and are not directed at individuals under the age of 18. We do not knowingly collect personal information from minors.",
    ],
  },
  {
    heading: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. The \"Last updated\" date at the top of this page indicates when the policy was last revised. Continued use of our website after changes are posted constitutes acceptance of the updated policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains how Deep Mind IT Solutions collects, uses, and protects information shared with us through our website and during the course of our IT infrastructure, cloud, security, and managed services engagements."
      updatedOn="January 2026"
      sections={sections}
    />
  );
}
