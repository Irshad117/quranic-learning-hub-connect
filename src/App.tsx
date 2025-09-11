
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./contexts/AuthContext";
import TopNavbar from "./components/TopNavbar";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Packages from "./pages/Packages";
import Payments from "./pages/Payments";
import Careers from "./pages/Careers";
import Download from "./pages/Download";
import Blog from "./pages/Blog";
import Quiz from "./pages/Quiz";
import Schedule from "./pages/Schedule";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/watsApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <div className="min-h-screen bg-gray-50 w-full">
            <TopNavbar />
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/download" element={<Download />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
            <Testimonials />
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
