import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TechGridParticles from "./components/common/backgrounds/TechGridParticles";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import BackToTop from "./components/common/BackToTop";
import { ChatProvider } from "./chatbot/context/ChatContext";
import ChatWidget from "./chatbot/ChatWidget";
import RouteFallback from "./components/common/RouteFallback";

// Every page below is only fetched when the visitor actually navigates
// to it. Previously all 24 pages (plus everything they import) were
// bundled into a single ~660KB JS file that had to be downloaded,
// parsed, and executed before the home page could render.
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const IndustriesPage = lazy(() => import("./pages/IndustriesPage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const ServerStoragePage = lazy(() => import("./pages/products/ServerStoragePage"));
const SwitchesRouterPage = lazy(() => import("./pages/products/SwitchesRouterPage"));
const PassiveItemsPage = lazy(() => import("./pages/products/PassiveItemsPage"));
const FirewallPage = lazy(() => import("./pages/products/FirewallPage"));
const LedsPanelsPage = lazy(() => import("./pages/products/LedsPanelsPage"));
const AvKvmPage = lazy(() => import("./pages/products/AvKvmPage"));
const ProjectorsPage = lazy(() => import("./pages/products/ProjectorsPage"));
const UpsPowerPage = lazy(() => import("./pages/products/UpsPowerPage"));
const CctvPage = lazy(() => import("./pages/products/CctvPage"));

const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/legal/TermsPage"));

const NetworkInfrastructurePage = lazy(() => import("./pages/services/NetworkInfrastructurePage"));
const CloudSolutionsPage = lazy(() => import("./pages/services/CloudSolutionsPage"));
const CyberSecurityPage = lazy(() => import("./pages/services/CyberSecurityPage"));
const DataCenterSolutionsPage = lazy(() => import("./pages/services/DataCenterSolutionsPage"));
const ManagedItServicesPage = lazy(() => import("./pages/services/ManagedItServicesPage"));
const SoftwareDevelopmentPage = lazy(() => import("./pages/services/SoftwareDevelopmentPage"));

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TechGridParticles />
      <Header />
      <ChatProvider>
        <ChatWidget />
      </ChatProvider>

      <main className="dm-page-shell">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/network-infrastructure" element={<NetworkInfrastructurePage />} />
            <Route path="/services/cloud-solutions" element={<CloudSolutionsPage />} />
            <Route path="/services/cyber-security" element={<CyberSecurityPage />} />
            <Route path="/services/data-center" element={<DataCenterSolutionsPage />} />
            <Route path="/services/managed-it" element={<ManagedItServicesPage />} />
            <Route path="/services/software-development" element={<SoftwareDevelopmentPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/server-storage" element={<ServerStoragePage />} />
            <Route path="/products/switches-router-wifi" element={<SwitchesRouterPage />} />
            <Route path="/products/passive-items" element={<PassiveItemsPage />} />
            <Route path="/products/firewall" element={<FirewallPage />} />
            <Route path="/products/leds-interactive-panels" element={<LedsPanelsPage />} />
            <Route path="/products/av-kvm" element={<AvKvmPage />} />
            <Route path="/products/projectors" element={<ProjectorsPage />} />
            <Route path="/products/ups-power" element={<UpsPowerPage />} />
            <Route path="/products/cctv-surveillance" element={<CctvPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
