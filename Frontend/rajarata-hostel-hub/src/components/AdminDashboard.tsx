// AdminDashboard.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HostelForm } from "@/components/HostelForm";
import { FacilityForm } from "@/components/FacilityForm";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon,
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  FileTextIcon,
  SettingsIcon,
  AlertTriangleIcon,
  Building,
} from "lucide-react";
import axios from "axios";

// --------------------- Interfaces ---------------------
interface Hostel {
  id: number;
  hostelName: string;
  register_count: number;
  leave_count: number;
  sick_count: number;
  room_count: number;
}

interface Student {
  id: number;
  studentName: string;
  email: string;
  hostelName: string;
  roomNumber: string;
}

interface Complain {
  id: number;
  complainDate: string;
  complainType: string;
  complainAbout: string;
}

interface Payment {
  id: number;
  paymentreference: string;
  paymentDate: string;
  paymentAmount: number;
  paymentDescription: string;
  userID: number;
}

interface Admin {
  id: number;
  name: string;
  post: string;
  hostelName: string;
  email: string;
}
const mockHostelStats = {
  totalStudents: 240,
  onLeave: 15,
  sickStudents: 3,
  totalHostels: 20,
  pendingComplaints: 8,
  pendingPayments: 12,
};


// --------------------- Components ---------------------

// Hostel Details Component
function HostelDetails() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/hostels");
        setHostels(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load hostel details");
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await axios.delete('http://localhost:3001/api/hostels/${id}');
      setHostels((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Failed to remove Hostel", err);
      alert("Error removing Hostel. Please try again.");
    }
  };

  if (loading)
    return (
      <Card className="w-full max-w-2xl mx-auto mt-6">
        <CardContent>Loading hostel details...</CardContent>
      </Card>
    );
  if (error)
    return (
      <Card className="w-full max-w-2xl mx-auto mt-6">
        <CardContent className="text-destructive">{error}</CardContent>
      </Card>
    );

  return (
    <div className="space-y-4">
      {hostels.map((hostel) => (
        <Card key={hostel.id} className="w-full max-w-2xl mx-auto">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              {hostel.hostelName}
            </CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemove(hostel.id)}
            >
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            <p>
              <strong>Register Count:</strong> {hostel.register_count}
            </p>
            <p>
              <strong>Leave Count:</strong> {hostel.leave_count}
            </p>
            <p>
              <strong>Sick Count:</strong> {hostel.sick_count}
            </p>
            <p>
              <strong>Room Count:</strong> {hostel.room_count}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Student Details Component
function StudentDetails() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/user");
        setStudents(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await axios.delete('http://localhost:3001/api/user/${id}');
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to remove student", err);
      alert("Error removing student. Please try again.");
    }
  };

  if (loading)
    return (
      <Card className="w-full max-w-2xl mx-auto mt-6">
        <CardContent>Loading students...</CardContent>
      </Card>
    );
  if (error)
    return (
      <Card className="w-full max-w-2xl mx-auto mt-6">
        <CardContent className="text-destructive">{error}</CardContent>
      </Card>
    );
  if (!students.length)
    return <p className="text-center text-muted-foreground">No students found.</p>;

  return (
    <div className="space-y-4">
      {students.map((student) => (
        <Card key={student.id} className="w-full max-w-2xl mx-auto">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-6 w-7" />
              {student.studentName}
            </CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemove(student.id)}
            >
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            <p>
              <strong>Email:</strong> {student.email}
            </p>
            <p>
              <strong>Hostel:</strong> {student.hostelName}
            </p>
            <p>
              <strong>Room:</strong> {student.roomNumber}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Complaints Component
function ComplainDetails() {
  const [complain, setComplain] = useState<Complain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplain = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/complains");
        setComplain(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplain();
    const interval = setInterval(fetchComplain, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await axios.delete('http://localhost:3001/api/complains/${id}');
      setComplain((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to remove complaint", err);
      alert("Error removing complaint. Please try again.");
    }
  };

  if (loading)
    return (
      <Card className="text-center text-muted-foreground">
        <CardContent>Loading complaints...</CardContent>
      </Card>
    );
  if (error)
    return (
      <Card className="w-full max-w-2xl mx-auto mt-6">
        <CardContent className="text-destructive">{error}</CardContent>
      </Card>
    );
  if (!complain.length)
    return (
      <Card className="text-center text-muted-foreground">
        <CardContent>No complaints found.</CardContent>
      </Card>
    );

  return (
    <div className="space-y-4">
      {complain.map((c) => (
        <Card key={c.id} className="w-full max-w-2xl mx-auto">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Badge
                variant={c.complainType === "Private" ? "default" : "secondary"}
              >
                {c.complainType}
              </Badge>
            </CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemove(c.id)}
            >
              Done
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            <p>
              <strong>Date:</strong> {c.complainDate}
            </p>
            <p>
              <strong>Complain:</strong> {c.complainAbout}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Payments Component
function PaymentDetails() {
  const [paymentDetails, setPaymentDetails] = useState<Payment | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [errorPayment, setErrorPayment] = useState<string | null>(null);

  const fetchPayment = async () => {
    setLoadingPayment(true);
    try {
      const response = await axios.get("http://localhost:3001/api/payment/1");
      setPaymentDetails(response.data);
    } catch (err: any) {
      setErrorPayment(err.response?.data?.message || "Error fetching payment data");
    } finally {
      setLoadingPayment(false);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  if (loadingPayment)
    return <Card className="text-center text-muted-foreground"><CardContent>Loading payment details...</CardContent></Card>;

  return (
    <div className="space-y-4">
      {errorPayment && <p className="text-red-500">{errorPayment}</p>}
      {paymentDetails ? (
        <div className="space-y-2 border rounded-lg p-4">
          <Badge variant={paymentDetails.paymentreference === "Private" ? "default" : "secondary"}>
              {paymentDetails.paymentreference}
            </Badge>
          <p><strong>Amount:</strong> {paymentDetails.paymentAmount}</p>
          <p><strong>Description:</strong> {paymentDetails.paymentDescription}</p>
          <p><strong>Date:</strong> {paymentDetails.paymentDate}</p>
        </div>
      ) : (
        <p>No payment found.</p>
      )}
    </div>
  );
}


// --------------------- Main Admin Dashboard ---------------------
export function AdminDashboard() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<Admin | null>(null);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [errorAdmin, setErrorAdmin] = useState("");

  const onLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  // Fetch admin info
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/admins/1");
        setAdminData(res.data);
      } catch (err) {
        console.error(err);
        setErrorAdmin("Failed to load admin info");
      } finally {
        setLoadingAdmin(false);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-primary">Rajarata University</h1>
              <p className="text-sm text-muted-foreground">Admin Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {loadingAdmin ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : errorAdmin ? (
              <p className="text-sm text-destructive">{errorAdmin}</p>
            ) : adminData ? (
              <div className="text-right">
                <p className="font-medium">{adminData.adminsName}</p>
                <p className="text-sm text-muted-foreground">
                  {adminData.adminsPost} - {adminData.adminHostelName}
                </p>
                <p className="text-sm text-muted-foreground">{adminData.email}</p>
              </div>
            ) : null}
            <Button
              variant="outline"
              onClick={onLogout}
              style={{ backgroundColor: "#ed6e60ff" }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage hostels, students, and operations</p>
        </div>
       {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3"><UsersIcon className="h-6 w-6 text-primary" /></div>
              <p className="text-2xl font-bold">{mockHostelStats.totalStudents}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-warning/10 rounded-full w-fit mx-auto mb-3"><AlertTriangleIcon className="h-6 w-6 text-warning" /></div>
              <p className="text-2xl font-bold">{mockHostelStats.pendingComplaints}</p>
              <p className="text-sm text-muted-foreground">Pending Complaints</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-success/10 rounded-full w-fit mx-auto mb-3"><CreditCardIcon className="h-6 w-6 text-success" /></div>
              <p className="text-2xl font-bold">{mockHostelStats.pendingPayments}</p>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-secondary/10 rounded-full w-fit mx-auto mb-3"><HomeIcon className="h-6 w-6 text-secondary" /></div>
              <p className="text-2xl font-bold">{mockHostelStats.totalHostels}</p>
              <p className="text-sm text-muted-foreground">Total Hostels</p>
            </CardContent>
          </Card>
        </div>



        {/* Main Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="hostels" className="w-full">
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-5 h-auto rounded-none bg-transparent">
                  <TabsTrigger value="hostels" className="py-4">
                    <HomeIcon className="h-4 w-4 mr-2" /> Hostels
                  </TabsTrigger>
                  <TabsTrigger value="facilities" className="py-4">
                    <SettingsIcon className="h-4 w-4 mr-2" /> Facilities
                  </TabsTrigger>
                  <TabsTrigger value="students" className="py-4">
                    <UsersIcon className="h-4 w-4 mr-2" /> Students
                  </TabsTrigger>
                  <TabsTrigger value="complain" className="py-4">
                    <FileTextIcon className="h-4 w-4 mr-2" /> Complaints
                  </TabsTrigger>
                  <TabsTrigger value="payments" className="py-4">
                    <CreditCardIcon className="h-4 w-4 mr-2" /> Payments
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Hostels Tab */}
              <TabsContent value="hostels" className="p-0">
                <Tabs defaultValue="list" className="w-full">
                  <div className="border-b">
                    <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent">
                      <TabsTrigger value="list" className="py-3">
                        View Hostels
                      </TabsTrigger>
                      <TabsTrigger value="add" className="py-3">
                        Add Hostel
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="list" className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Hostel Management</h3>
                    <HostelDetails />
                  </TabsContent>
                  <TabsContent value="add" className="p-6">
                    <HostelForm />
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* Facilities Tab */}
              <TabsContent value="facilities" className="p-0">
                <Tabs defaultValue="list" className="w-full">
                  <div className="border-b">
                    <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent">
                      <TabsTrigger value="list" className="py-3">
                        View Facilities
                      </TabsTrigger>
                      <TabsTrigger value="add" className="py-3">
                        Add Facility
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="list" className="p-6 space-y-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <SettingsIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Facility list will be displayed here</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="add" className="p-6">
                    <FacilityForm />
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* Students Tab */}
              <TabsContent value="students" className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Student Management</h3>
                <StudentDetails />
              </TabsContent>

              {/* Complaints Tab */}
              <TabsContent value="complain" className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Complaint Management</h3>
                <ComplainDetails />
              </TabsContent>

              {/* Payments Tab */}
              <TabsContent value="payments" className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <PaymentDetails />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}