import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HostelForm } from "@/components/HostelForm";
import { onLogout } from "@/components/LoginForm";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { FacilityForm } from "@/components/FacilityForm";

import { 
  ShieldCheckIcon, 
  HomeIcon, 
  UsersIcon, 
  CreditCardIcon, 
  FileTextIcon,
  PlusIcon,
  SettingsIcon,
  TrendingUpIcon,
  AlertTriangleIcon
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

// Mock data - replace with real data from your backend
const mockAdminData = {
  name: "Dr. Sunil Rajapakse",
  post: "Warden",
  hostelName: "Nelum Hostel",
  email: "sunil.rajapakse@rjt.ac.lk"
};

const mockHostelStats = {
  totalStudents: 240,
  onLeave: 15,
  sickStudents: 3,
  totalRooms: 120,
  occupiedRooms: 115,
  pendingComplaints: 8,
  pendingPayments: 12
};

const mockHostels = [
  { id: 1, name: "Nelum Hostel", students: 240, rooms: 120, facility: "AC with Bathroom" },
  { id: 2, name: "Lotus Hostel", students: 180, rooms: 90, facility: "Fan with Shared Bathroom" },
  { id: 3, name: "Araliya Hostel", students: 200, rooms: 100, facility: "AC with Bathroom" }
];

const mockComplaints = [
  { id: 1, type: "Private", about: "Air conditioning not working", date: "2024-03-15", status: "Pending" },
  { id: 2, type: "Common", about: "WiFi connectivity issues", date: "2024-03-14", status: "In Progress" },
  { id: 3, type: "Private", about: "Water leakage in bathroom", date: "2024-03-13", status: "Resolved" }
];

const mockRecentPayments = [
  { id: 1, student: "Kasun Perera", amount: 15000, date: "2024-03-15", status: "Completed" },
  { id: 2, student: "Nimal Fernando", amount: 15000, date: "2024-03-14", status: "Pending" },
  { id: 3, student: "Chamika Silva", amount: 15000, date: "2024-03-13", status: "Completed" }
];







export function AdminDashboard() {

const navigate = useNavigate();

const onLogout = () => {
  localStorage.removeItem("adminToken");
  navigate("/login");
};



 


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-primary">Rajarata University</h1>
              <p className="text-sm text-muted-foreground">Admin Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{mockAdminData.name}</p>
              <p className="text-sm text-muted-foreground">{mockAdminData.post} - {mockAdminData.hostelName}</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage hostels, students, and operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{mockHostelStats.totalStudents}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-warning/10 rounded-full w-fit mx-auto mb-3">
                <AlertTriangleIcon className="h-6 w-6 text-warning" />
              </div>
              <p className="text-2xl font-bold">{mockHostelStats.pendingComplaints}</p>
              <p className="text-sm text-muted-foreground">Pending Complaints</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-success/10 rounded-full w-fit mx-auto mb-3">
                <CreditCardIcon className="h-6 w-6 text-success" />
              </div>
              <p className="text-2xl font-bold">{mockHostelStats.pendingPayments}</p>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-secondary/10 rounded-full w-fit mx-auto mb-3">
                <HomeIcon className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-2xl font-bold">{mockHostelStats.occupiedRooms}/{mockHostelStats.totalRooms}</p>
              <p className="text-sm text-muted-foreground">Rooms Occupied</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="hostels" className="w-full">
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-5 h-auto rounded-none bg-transparent">
                  <TabsTrigger value="hostels" className="py-4">
                    <HomeIcon className="h-4 w-4 mr-2" />
                    Hostels
                  </TabsTrigger>
                  <TabsTrigger value="facilities" className="py-4">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Facilities
                  </TabsTrigger>
                  <TabsTrigger value="students" className="py-4">
                    <UsersIcon className="h-4 w-4 mr-2" />
                    Students
                  </TabsTrigger>
                  <TabsTrigger value="complaints" className="py-4">
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Complaints
                  </TabsTrigger>
                  <TabsTrigger value="payments" className="py-4">
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Payments
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="hostels" className="p-0">
                <Tabs defaultValue="list" className="w-full">
                  <div className="border-b">
                    <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent">
                      <TabsTrigger value="list" className="py-3">View Hostels</TabsTrigger>
                      <TabsTrigger value="add" className="py-3">Add Hostel</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="list" className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Hostel Management</h3>
                    </div>
                    <div className="space-y-4">
                      {mockHostels.map((hostel) => (
                        <div key={hostel.id} className="border rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{hostel.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {hostel.students} students • {hostel.rooms} rooms • {hostel.facility}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">
                              <SettingsIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="add" className="p-6">
                    <HostelForm />
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="facilities" className="p-0">
                <Tabs defaultValue="list" className="w-full">
                  <div className="border-b">
                    <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent">
                      <TabsTrigger value="list" className="py-3">View Facilities</TabsTrigger>
                      <TabsTrigger value="add" className="py-3">Add Facility</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="list" className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Facility Management</h3>
                    </div>
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

              <TabsContent value="students" className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Student Management</h3>
                  <Button className="bg-primary hover:bg-primary-light">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  <UsersIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Student management interface will be implemented here</p>
                </div>
              </TabsContent>

              <TabsContent value="complaints" className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Complaint Management</h3>
                  <Badge variant="secondary">{mockHostelStats.pendingComplaints} Pending</Badge>
                </div>
                <div className="space-y-4">
                  {mockComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Badge variant={complaint.type === "Private" ? "default" : "secondary"}>
                            {complaint.type}
                          </Badge>
                          <h4 className="font-medium mt-2">{complaint.about}</h4>
                          <p className="text-sm text-muted-foreground">{complaint.date}</p>
                        </div>
                        <Badge variant={
                          complaint.status === "Resolved" ? "default" : 
                          complaint.status === "In Progress" ? "secondary" : "outline"
                        }>
                          {complaint.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Update Status</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payments" className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Payment Management</h3>
                  <Badge variant="secondary">{mockHostelStats.pendingPayments} Pending</Badge>
                </div>
                <div className="space-y-4">
                  {mockRecentPayments.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{payment.student}</h4>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="font-semibold">LKR {payment.amount.toLocaleString()}</p>
                          <Badge variant={payment.status === "Completed" ? "default" : "outline"}>
                            {payment.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}