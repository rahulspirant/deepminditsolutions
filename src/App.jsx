import { BrowserRouter, Routes, Route } from "react-router-dom";

import TechGridParticles from "./components/common/backgrounds/TechGridParticles";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import BackToTop from "./components/common/BackToTop";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import IndustriesPage from "./pages/IndustriesPage";
import ClientsPage from "./pages/ClientsPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";

import ServerStoragePage from "./pages/products/ServerStoragePage";
import SwitchesRouterPage from "./pages/products/SwitchesRouterPage";
import PassiveItemsPage from "./pages/products/PassiveItemsPage";
import FirewallPage from "./pages/products/FirewallPage";
import LedsPanelsPage from "./pages/products/LedsPanelsPage";
import AvKvmPage from "./pages/products/AvKvmPage";
import ProjectorsPage from "./pages/products/ProjectorsPage";
import UpsPowerPage from "./pages/products/UpsPowerPage";
import CctvPage from "./pages/products/CctvPage";

import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import TermsPage from "./pages/legal/TermsPage";

import NetworkInfrastructurePage from "./pages/services/NetworkInfrastructurePage";
import CloudSolutionsPage from "./pages/services/CloudSolutionsPage";
import CyberSecurityPage from "./pages/services/CyberSecurityPage";
import DataCenterSolutionsPage from "./pages/services/DataCenterSolutionsPage";
import ManagedItServicesPage from "./pages/services/ManagedItServicesPage";
import SoftwareDevelopmentPage from "./pages/services/SoftwareDevelopmentPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TechGridParticles />
      <Header />

      <main className="dm-page-shell">
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
      </main>

      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;