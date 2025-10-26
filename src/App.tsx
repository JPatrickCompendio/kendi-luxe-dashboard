import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Staff from "./pages/Staff";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full bg-accent">
          <Sidebar />
          <div className="flex-1 ml-64">
            <TopNavbar />
            <main className="mt-16">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/services" element={<div className="p-8"><h1 className="text-4xl font-heading font-bold">Services - Coming Soon</h1></div>} />
                <Route path="/payments" element={<div className="p-8"><h1 className="text-4xl font-heading font-bold">Payments - Coming Soon</h1></div>} />
                <Route path="/reports" element={<div className="p-8"><h1 className="text-4xl font-bold font-heading">Reports - Coming Soon</h1></div>} />
                <Route path="/feedback" element={<div className="p-8"><h1 className="text-4xl font-bold font-heading">Feedback - Coming Soon</h1></div>} />
                <Route path="/inventory" element={<div className="p-8"><h1 className="text-4xl font-bold font-heading">Inventory - Coming Soon</h1></div>} />
                <Route path="/settings" element={<div className="p-8"><h1 className="text-4xl font-bold font-heading">Settings - Coming Soon</h1></div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
