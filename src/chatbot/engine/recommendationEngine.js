/**
 * recommendationEngine.js
 * ------------------------------------------------------------------
 * Turns a detected business profile (employee count, business type
 * keywords) into a curated bundle of recommended services/products,
 * per the brief's "Smart Recommendation Engine" spec.
 * ------------------------------------------------------------------
 */

import { industries } from "./knowledgeBase";

const TYPE_BUNDLES = [
  {
    id: "school",
    keywords: ["school", "college", "university", "education", "campus", "coaching institute"],
    profileLabel: "an education institution",
    bundle: ["Smart Class / Interactive Panels", "Projectors", "Campus Networking & Wi-Fi", "Firewall", "CCTV Surveillance"],
  },
  {
    id: "hospital",
    keywords: ["hospital", "clinic", "healthcare", "medical", "diagnostic center", "nursing home"],
    profileLabel: "a healthcare facility",
    bundle: ["Security & CCTV", "UPS Power Backup", "Storage & Data Center", "Wi-Fi", "Data Center Solutions"],
  },
  {
    id: "office",
    keywords: ["office", "corporate", "workplace", "startup", "company", "business", "coworking"],
    profileLabel: "an office / corporate environment",
    bundle: ["Cloud Solutions", "Network Infrastructure", "Firewall", "AV Solutions", "Meeting Room Setup"],
  },
  {
    id: "retail",
    keywords: ["retail", "store", "shop", "showroom", "mall"],
    profileLabel: "a retail environment",
    bundle: ["CCTV Surveillance", "Wi-Fi", "Networking", "Firewall", "Managed IT Services"],
  },
  {
    id: "manufacturing",
    keywords: ["factory", "manufacturing", "plant", "warehouse", "industrial"],
    profileLabel: "a manufacturing / industrial site",
    bundle: ["Rugged Networking", "CCTV Surveillance", "UPS Power", "Server & Storage", "Managed IT Services"],
  },
  {
    id: "hospitality",
    keywords: ["hotel", "hospitality", "restaurant", "resort"],
    profileLabel: "a hospitality business",
    bundle: ["Guest Wi-Fi", "CCTV Surveillance", "Networking", "AV Solutions", "Managed IT Services"],
  },
  {
    id: "bfsi",
    keywords: ["bank", "banking", "finance", "bfsi", "insurance", "nbfc"],
    profileLabel: "a BFSI / financial services business",
    bundle: ["Cyber Security & Firewall", "Data Center Solutions", "CCTV Surveillance", "Network Infrastructure", "Managed IT Services"],
  },
  {
    id: "government",
    keywords: ["government", "public sector", "municipal", "govt"],
    profileLabel: "a government / public-sector office",
    bundle: ["Cyber Security & Firewall", "Network Infrastructure", "CCTV Surveillance", "Managed IT Services"],
  },
];

/** Bundle recommended for a raw employee-count entity (headcount-based sizing). */
function employeeCountBundle(count) {
  const bundle = ["Network Infrastructure", "Firewall", "Server & Storage", "Wi-Fi", "Backup Solutions", "CCTV Surveillance", "Managed IT Services"];
  let tier = "small team";
  if (count >= 200) tier = "large enterprise";
  else if (count >= 50) tier = "mid-sized organization";
  else if (count >= 10) tier = "growing team";
  return { profileLabel: `a ${tier} of about ${count} people`, bundle };
}

/**
 * Given the raw message text + extracted employeeCount (from nlu.js),
 * return a recommendation object or null if no business profile was
 * detected.
 */
export function getRecommendation(rawText, employeeCount) {
  const text = rawText.toLowerCase();

  if (employeeCount) {
    return employeeCountBundle(employeeCount);
  }

  for (const type of TYPE_BUNDLES) {
    if (type.keywords.some((kw) => text.includes(kw))) {
      return { profileLabel: type.profileLabel, bundle: type.bundle };
    }
  }

  return null;
}

export function listIndustries() {
  return industries;
}

export default { getRecommendation, listIndustries };
