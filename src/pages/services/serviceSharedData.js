import {
  ScanLine,
  Layers,
  BarChart3,
  Zap,
  Headphones,
  Cpu,
  Globe,
  Lock,
} from "lucide-react";

export const SERVICE_PROCESS_STEPS = [
  {
    num: "01",
    icon: ScanLine,
    title: "Assessment",
    desc: "We audit your existing infrastructure, workflows, and constraints to establish a clear, unbiased baseline before any recommendation is made.",
  },
  {
    num: "02",
    icon: Layers,
    title: "Solution Design",
    desc: "Our engineers architect a solution specific to your environment — vendor-agnostic, budget-aware, and aligned to your operational goals.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Deployment Planning",
    desc: "A detailed project plan, risk register, and rollout schedule are defined so implementation proceeds with minimal business disruption.",
  },
  {
    num: "04",
    icon: Zap,
    title: "Implementation & Integration",
    desc: "Certified engineers deploy, configure, and integrate the solution across your environment with rigorous quality checkpoints at every stage.",
  },
  {
    num: "05",
    icon: Headphones,
    title: "Support & Optimization",
    desc: "Post-deployment, we monitor performance, resolve issues proactively, and tune the system as your business demands evolve.",
  },
];

export const SERVICE_WHY_CARDS = [
  {
    icon: Cpu,
    title: "Deep Infrastructure Expertise",
    desc: "Over a decade of hands-on experience designing and deploying enterprise-grade infrastructure across sectors.",
  },
  {
    icon: Globe,
    title: "Business-First Consulting",
    desc: "Every recommendation is anchored in your operational objectives — not product margins or vendor incentives.",
  },
  {
    icon: Lock,
    title: "Security-First Implementation",
    desc: "Security is baked into every deployment — not bolted on after. From network design to cloud to software.",
  },
];
