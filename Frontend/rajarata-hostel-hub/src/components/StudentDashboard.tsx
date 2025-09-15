import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {handleLogout} from "@/components/LoginForm";
import {useState, useEffect} from "react";
import axios from "axios";


import { PaymentForm } from "@/components/PaymentForm";
import { 
  HomeIcon, 
  CreditCardIcon, 
  FileTextIcon, 
  PhoneIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  DollarSignIcon
} from "lucide-react";

interface StudentDashboardProps {
  onLogout: () => void;
}

const mockHostelData = {
  name: "Nelum Hostel",
  facilityType: "AC Rooms with Attached Bathroom",
  totalRooms: 120,
  registeredStudents: 240,
  onLeave: 15,
  sickStudents: 3
};

const mockPayments = [
  { id: 1, reference: "PAY001", date: "2024-01-15", amount: 15000, description: "Monthly Hostel Fee - January" },
  { id: 2, reference: "PAY002", date: "2024-02-15", amount: 15000, description: "Monthly Hostel Fee - February" },
  { id: 3, reference: "PAY003", date: "2024-03-15", amount: 15000, description: "Monthly Hostel Fee - March" }
];
export function StudentDashboard() {
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  


const navigate = useNavigate();
  const handleLogout = () => {
  // Optional: clear any auth/session data
  localStorage.removeItem("userToken");
  sessionStorage.clear();

  // Redirect to login, replacing history
  navigate("/login", { replace: true });
};

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/1")
      .then((response) => {
        setStudentData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch student data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading student data...</div>;
  }

  if (error || !studentData) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        {error || "Student data not available"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <HomeIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-primary">Rajarata University</h1>
              <p className="text-sm text-muted-foreground">Student Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{studentData.studentName}</p>
              <p className="text-sm text-muted-foreground">{studentData.indexNumber}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-primary">Welcome back, {studentData.studentName}!</h2>
          <p className="text-muted-foreground">Manage your hostel information and payments</p>
        </div>

        {/* Student Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Student Name</Label>
                <p className="font-medium">{studentData.studentName}</p>
              </div>
              <div>
                <Label>Index Number</Label>
                <p className="font-medium">{studentData.indexNumber}</p>
              </div>
              <div>
                <Label>Register Number</Label>
                <p className="font-medium">{studentData.registerNumber}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="font-medium">{studentData.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Phone Number</Label>
                <p className="font-medium">{studentData.phoneNumber}</p>
              </div>
              <div>
                <Label>Parent Name</Label>
                <p className="font-medium">{studentData.parentName}</p>
              </div>
              <div>
                <Label>Parent Phone</Label>
                <p className="font-medium">{studentData.parentPhonenumber}</p>
              </div>
              <div>
                <Label>Address</Label>
                <p className="font-medium">{studentData.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hostel Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HomeIcon className="h-5 w-5" />
              Hostel Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <h3 className="font-semibold text-primary text-lg">{mockHostelData.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Your Hostel</p>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <h3 className="font-semibold text-lg">Room {studentData.roomNumber}</h3>
                <p className="text-sm text-muted-foreground">Floor {studentData.floorNumber}</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <h3 className="font-semibold text-lg">{mockHostelData.registeredStudents}</h3>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <h3 className="font-semibold text-lg">{mockHostelData.facilityType}</h3>
                <p className="text-sm text-muted-foreground">Facility Type</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Section */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="history" className="w-full">
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent">
                  <TabsTrigger value="history" className="py-4">
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Payment History
                  </TabsTrigger>
                  <TabsTrigger value="make-payment" className="py-4">
                    <DollarSignIcon className="h-4 w-4 mr-2" />
                    Make Payment
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="history" className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recent Payments</h3>
                  <p className="text-sm text-muted-foreground mb-4">View your payment history</p>
                </div>
                <div className="space-y-4">
                  {mockPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-success/10 rounded-full">
                          <CreditCardIcon className="h-4 w-4 text-success" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">Ref: {payment.reference}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">LKR {payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="make-payment" className="p-6">
                <PaymentForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold">Sub Warden</h3>
                <p className="text-sm text-muted-foreground">Dr. Nimal Silva</p>
                <p className="font-medium mt-2">077-2345678</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold">Medical Center</h3>
                <p className="text-sm text-muted-foreground">University Medical Center</p>
                <p className="font-medium mt-2">025-2266500</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold">Ambulance</h3>
                <p className="text-sm text-muted-foreground">Emergency Services</p>
                <p className="font-medium mt-2">110</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-muted-foreground">{children}</p>;
}