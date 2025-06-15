
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookOpen } from "lucide-react";
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
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 w-full">
          <TopNavbar />
          
          {/* Academy Name positioned on the left side */}
          <div className="fixed left-6 top-32 z-30 hidden lg:block">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-white/20">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-gray-800">Al-Sirat al-Mustaqim</div>
                  <div className="text-sm text-blue-600 font-medium">الصراط المستقيم</div>
                </div>
              </div>
            </div>
          </div>
          
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
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Testimonials />
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
