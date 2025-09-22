import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CustomerPortal from "./pages/CustomerPortal";
import Sortiment from "./pages/Sortiment";
import QuoteRequest from "./pages/QuoteRequest";
import OrderFruitBaskets from "./pages/OrderFruitBaskets";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/om-oss" element={<About />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/sortiment" element={<Sortiment />} />
      {/* Update routing to match requirements */}
      <Route path="/kundportal" element={<CustomerPortal />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      } />
              <Route path="/offertforfragan" element={<QuoteRequest />} />
              <Route path="/bestall-fruktkorgar" element={<OrderFruitBaskets />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
