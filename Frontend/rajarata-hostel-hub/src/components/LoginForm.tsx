import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, ShieldCheckIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  const [studentCredentials, setStudentCredentials] = useState({
    userName: "",
    password: "",
  });
  const [adminCredentials, setAdminCredentials] = useState({
    adminsName: "",
    password: "",
  });

  // Student login
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/user/login", studentCredentials);
      alert("Student logged in successfully!");
      // Save token or user info if returned
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userId", res.data.id);
      navigate("/student-dashboard"); // redirect to student dashboard
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Student login failed");
    }
  };

  // Admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/admins/login", adminCredentials);
      alert("Admin logged in successfully!");
      // Save token or user info if returned
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminId", res.data.admin.id);
      navigate("/admin-dashboard"); // redirect to admin dashboard
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm border-primary/20">
      <CardHeader className="text-center space-y-4">
        <CardTitle className="text-2xl font-bold text-primary">HOSTELEASE</CardTitle>
        <CardDescription className="text-base">Rajarata University</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" /> Student
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4" /> Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-username">Username</Label>
                <Input
                  id="student-username"
                  type="text"
                  placeholder="Enter your username"
                  value={studentCredentials.userName}
                  onChange={(e) =>
                    setStudentCredentials({ ...studentCredentials, userName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <Input
                  id="student-password"
                  type="password"
                  placeholder="Enter your password"
                  value={studentCredentials.password}
                  onChange={(e) =>
                    setStudentCredentials({ ...studentCredentials, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
                Login as Student
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="admin">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-username">Username</Label>
                <Input
                  id="admin-username"
                  type="text"
                  placeholder="Enter admin username"
                  value={adminCredentials.adminsName}
                  onChange={(e) =>
                    setAdminCredentials({ ...adminCredentials, adminsName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={adminCredentials.password}
                  onChange={(e) =>
                    setAdminCredentials({ ...adminCredentials, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
                Login as Admin
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>

      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </Card>
  );
}