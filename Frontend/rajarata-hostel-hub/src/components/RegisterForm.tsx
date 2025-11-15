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
import { UserIcon, ShieldCheckIcon, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
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

  // UI states
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showStudentConfirmPassword, setShowStudentConfirmPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [showAdminConfirmPassword, setShowAdminConfirmPassword] = useState(false);
  const [studentErrors, setStudentErrors] = useState<Record<string, string>>({});
  const [adminErrors, setAdminErrors] = useState<Record<string, string>>({});

  // Password validation function
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      requirements: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    };
  };

  // Student form validation
  const validateStudentForm = () => {
    const errors: Record<string, string> = {};

    // Password validation
    const passwordValidation = validatePassword(student.password);
    if (!passwordValidation.isValid) {
      errors.password = "Password does not meet requirements";
    }

    // Confirm password validation
    if (student.password !== student.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(student.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(student.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setStudentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Admin form validation
  const validateAdminForm = () => {
    const errors: Record<string, string> = {};

    // Password validation
    const passwordValidation = validatePassword(admin.password);
    if (!passwordValidation.isValid) {
      errors.password = "Password does not meet requirements";
    }

    // Confirm password validation
    if (admin.password !== admin.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(admin.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(admin.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setAdminErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Student registration
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStudentForm()) {
      alert("Please fix the validation errors before submitting");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/user/register", student);
      alert("Student registered successfully!");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error registering student");
    }
  };

  // Admin registration
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAdminForm()) {
      alert("Please fix the validation errors before submitting");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/admins/register", admin);
      alert("Admin registered successfully!");
      navigate("/login"); 
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error registering admin");
    }
  };

  // Password requirement component
  const PasswordRequirements = ({ password }: { password: string }) => {
    const validation = validatePassword(password);
    
    const requirements = [
      { label: "At least 8 characters", met: validation.requirements.minLength },
      { label: "One uppercase letter", met: validation.requirements.hasUpperCase },
      { label: "One lowercase letter", met: validation.requirements.hasLowerCase },
      { label: "One number", met: validation.requirements.hasNumbers },
      { label: "One special character", met: validation.requirements.hasSpecialChar },
    ];

    return (
      <div className="mt-2 space-y-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {req.met ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className={req.met ? "text-green-600" : "text-red-600"}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    );
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
              {/* Existing student form fields */}
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
              
              {/* Password Field with Validation */}
              <div className="relative">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showStudentPassword ? "text" : "password"}
                    value={student.password}
                    onChange={(e) => {
                      setStudent({ ...student, password: e.target.value });
                      if (studentErrors.password) {
                        setStudentErrors({ ...studentErrors, password: "" });
                      }
                    }}
                    required
                    className={studentErrors.password ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowStudentPassword(!showStudentPassword)}
                  >
                    {showStudentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {student.password && <PasswordRequirements password={student.password} />}
                {studentErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{studentErrors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showStudentConfirmPassword ? "text" : "password"}
                    value={student.confirmPassword}
                    onChange={(e) => {
                      setStudent({ ...student, confirmPassword: e.target.value });
                      if (studentErrors.confirmPassword) {
                        setStudentErrors({ ...studentErrors, confirmPassword: "" });
                      }
                    }}
                    required
                    className={studentErrors.confirmPassword ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowStudentConfirmPassword(!showStudentConfirmPassword)}
                  >
                    {showStudentConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {student.confirmPassword && student.password === student.confirmPassword && (
                  <div className="flex items-center gap-2 text-green-600 text-sm mt-1">
                    <CheckCircle className="h-4 w-4" />
                    Passwords match
                  </div>
                )}
                {studentErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{studentErrors.confirmPassword}</p>
                )}
              </div>

              {/* Email with Validation */}
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={student.email}
                  onChange={(e) => {
                    setStudent({ ...student, email: e.target.value });
                    if (studentErrors.email) {
                      setStudentErrors({ ...studentErrors, email: "" });
                    }
                  }}
                  required
                  className={studentErrors.email ? "border-red-500" : ""}
                />
                {studentErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{studentErrors.email}</p>
                )}
              </div>

              {/* Phone Number with Validation */}
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={student.phoneNumber}
                  onChange={(e) => {
                    setStudent({ ...student, phoneNumber: e.target.value });
                    if (studentErrors.phoneNumber) {
                      setStudentErrors({ ...studentErrors, phoneNumber: "" });
                    }
                  }}
                  required
                  className={studentErrors.phoneNumber ? "border-red-500" : ""}
                />
                {studentErrors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{studentErrors.phoneNumber}</p>
                )}
              </div>

              {/* Rest of student fields */}
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
              {/* Admin form fields */}
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

              {/* Admin Password Field with Validation */}
              <div className="relative">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showAdminPassword ? "text" : "password"}
                    value={admin.password}
                    onChange={(e) => {
                      setAdmin({ ...admin, password: e.target.value });
                      if (adminErrors.password) {
                        setAdminErrors({ ...adminErrors, password: "" });
                      }
                    }}
                    required
                    className={adminErrors.password ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                  >
                    {showAdminPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {admin.password && <PasswordRequirements password={admin.password} />}
                {adminErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{adminErrors.password}</p>
                )}
              </div>

              {/* Admin Confirm Password Field */}
              <div className="relative">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showAdminConfirmPassword ? "text" : "password"}
                    value={admin.confirmPassword}
                    onChange={(e) => {
                      setAdmin({ ...admin, confirmPassword: e.target.value });
                      if (adminErrors.confirmPassword) {
                        setAdminErrors({ ...adminErrors, confirmPassword: "" });
                      }
                    }}
                    required
                    className={adminErrors.confirmPassword ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowAdminConfirmPassword(!showAdminConfirmPassword)}
                  >
                    {showAdminConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {admin.confirmPassword && admin.password === admin.confirmPassword && (
                  <div className="flex items-center gap-2 text-green-600 text-sm mt-1">
                    <CheckCircle className="h-4 w-4" />
                    Passwords match
                  </div>
                )}
                {adminErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{adminErrors.confirmPassword}</p>
                )}
              </div>

              {/* Admin Email with Validation */}
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={admin.email}
                  onChange={(e) => {
                    setAdmin({ ...admin, email: e.target.value });
                    if (adminErrors.email) {
                      setAdminErrors({ ...adminErrors, email: "" });
                    }
                  }}
                  required
                  className={adminErrors.email ? "border-red-500" : ""}
                />
                {adminErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{adminErrors.email}</p>
                )}
              </div>

              {/* Admin Phone Number with Validation */}
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={admin.phoneNumber}
                  onChange={(e) => {
                    setAdmin({ ...admin, phoneNumber: e.target.value });
                    if (adminErrors.phoneNumber) {
                      setAdminErrors({ ...adminErrors, phoneNumber: "" });
                    }
                  }}
                  required
                  className={adminErrors.phoneNumber ? "border-red-500" : ""}
                />
                {adminErrors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{adminErrors.phoneNumber}</p>
                )}
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