import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useToast } from "@/hooks/use-toast";
import universityHero from "@/assets/university-hero.jpg";

type UserType = "student" | "admin" | null;

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const { toast } = useToast();

  const handleLogin = (userType: UserType, credentials: { username: string; password: string }) => {
    // In a real app, this would validate credentials with your backend
    if (credentials.username && credentials.password) {
      setCurrentUser(userType);
      toast({
        title: "Login Successful",
        description: `Welcome to the ${userType} portal!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  if (currentUser === "student") {
    return <StudentDashboard onLogout={handleLogout} />;
  }

  if (currentUser === "admin") {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${universityHero})` }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold mb-4">HOSTALESE</h1>
            <p className="text-xl mb-2">Rajarata University</p>
            <p className="text-lg opacity-90">Secure • Efficient • User-Friendly</p>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-md">
          <LoginForm onLogin={handleLogin} />
          
          {/* Information Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-primary/20 text-center">
              <h3 className="font-semibold text-primary mb-2">For Students</h3>
              <p className="text-sm text-muted-foreground">
                View hostel details, make payments, and access services
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-primary/20 text-center">
              <h3 className="font-semibold text-primary mb-2">For Admins</h3>
              <p className="text-sm text-muted-foreground">
                Manage hostels, students, complaints, and payments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
