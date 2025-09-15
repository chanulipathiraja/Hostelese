import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { AdminDashboard } from "@/components/AdminDashboard";
import { StudentDashboard } from "@/components/StudentDashboard";
import { on } from "events";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Index />} />

          {/* Authentication */}
          <Route
            path="/login"
            element={
              <LoginForm/>
            }
          />
          <Route
            path="/register"
            element={
              <RegisterForm/>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <AdminDashboard/>
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <StudentDashboard/>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
