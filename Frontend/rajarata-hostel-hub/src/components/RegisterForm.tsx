import { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
  const navigate = useNavigate(); 
  // Student state
  const [student, setStudent] = useState({
    hostelId: "",
    emergencyId: "",
    studentName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    floorNumber: "",
    registerNumber: "",
    roomNumber: "",
    indexNumber: "",
    address: "",
    parentName: "",
    parentPhonenumber: "",
    otherDetails: "",
  });

  // Admin state
  const [admin, setAdmin] = useState({
    adminsName: "",
    adminsPost: "",
    adminHostelName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
  });

  // Student registration
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/user/register", student);
      alert("Student registered successfully!");
      navigate("/login"); // redirect to login
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error registering student");
    }
  };

  // Admin registration
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/admins/register", admin);
      alert("Admin registered successfully!");
      navigate("/login"); 
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error registering admin");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-card/95 backdrop-blur-sm border-primary/20">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-primary">
          Register
        </CardTitle>
        <CardDescription>Create an account for HostelEase</CardDescription>
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

          {/* Student Registration */}
          <TabsContent value="student">
            <form
              onSubmit={handleStudentSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

              <div>
                <Label>Hostel Id</Label>
                <Input
                  value={student.hostelId}
                  onChange={(e) =>
                    setStudent({ ...student, hostelId: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Emergency Id</Label>
                <Input
                  value={student.emergencyId}
                  onChange={(e) =>
                    setStudent({ ...student, emergencyId: e.target.value })
                  }
                  required
                />
              </div>

              
              <div>
                <Label>Student Name</Label>
                <Input
                  value={student.studentName}
                  onChange={(e) =>
                    setStudent({ ...student, studentName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>User Name</Label>
                <Input
                  value={student.userName}
                  onChange={(e) =>
                    setStudent({ ...student, userName: e.target.value })
                  }
                  required
                />
              </div>
              
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={student.password}
                  onChange={(e) =>
                    setStudent({ ...student, password: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={student.confirmPassword}
                  onChange={(e) =>
                    setStudent({ ...student, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={student.email}
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={student.phoneNumber}
                  onChange={(e) =>
                    setStudent({ ...student, phoneNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Floor Number</Label>
                <Input
                  type="number"
                  value={student.floorNumber}
                  onChange={(e) =>
                    setStudent({ ...student, floorNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Registration Number</Label>
                <Input
                  type="number"
                  value={student.registerNumber}
                  onChange={(e) =>
                    setStudent({ ...student, registerNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Room Number</Label>
                <Input
                  type="number"
                  value={student.roomNumber}
                  onChange={(e) =>
                    setStudent({ ...student, roomNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Index Number</Label>
                <Input
                  type="number"
                  value={student.indexNumber}
                  onChange={(e) =>
                    setStudent({ ...student, indexNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label>Address</Label>
                <Input
                  value={student.address}
                  onChange={(e) =>
                    setStudent({ ...student, address: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Parent Name</Label>
                <Input
                  value={student.parentName}
                  onChange={(e) =>
                    setStudent({ ...student, parentName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Parent Phone</Label>
                <Input
                  type="number"
                  value={student.parentPhonenumber}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      parentPhonenumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label>Other Details</Label>
                <Input
                  value={student.otherDetails}
                  onChange={(e) =>
                    setStudent({ ...student, otherDetails: e.target.value })
                  }
                  required
                />
              </div>

              <div className="md:col-span-2 mt-4">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-light"
                >
                  Register as Student
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Admin Registration */}
          <TabsContent value="admin">
            <form
              onSubmit={handleAdminSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <Label>Admin Name</Label>
                <Input
                  value={admin.adminsName}
                  onChange={(e) =>
                    setAdmin({ ...admin, adminsName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Post</Label>
                <Input
                  value={admin.adminsPost}
                  onChange={(e) =>
                    setAdmin({ ...admin, adminsPost: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Hostel Name</Label>
                <Input
                  value={admin.adminHostelName}
                  onChange={(e) =>
                    setAdmin({ ...admin, adminHostelName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>User Name</Label>
                <Input
                  value={admin.userName}
                  onChange={(e) =>
                    setAdmin({ ...admin, userName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={admin.password}
                  onChange={(e) =>
                    setAdmin({ ...admin, password: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={admin.confirmPassword}
                  onChange={(e) =>
                    setAdmin({ ...admin, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={admin.email}
                  onChange={(e) =>
                    setAdmin({ ...admin, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  type="number"
                  value={admin.phoneNumber}
                  onChange={(e) =>
                    setAdmin({ ...admin, phoneNumber: e.target.value })
                  }
                  required
                />
              </div>

              <div className="md:col-span-2 mt-4">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-light"
                >
                  Register as Admin
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
