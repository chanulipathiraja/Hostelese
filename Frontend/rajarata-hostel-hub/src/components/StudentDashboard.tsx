import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { PaymentForm } from "@/components/PaymentForm";

import {
  HomeIcon,
  PhoneIcon,
  UserIcon,
  DollarSignIcon,
} from "lucide-react";

interface StudentDashboardProps {
  onLogout?: () => void;
}

export function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [studentData, setStudentData] = useState<any>(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [errorStudent, setErrorStudent] = useState("");

  // Complaint states
  const [complaintText, setComplaintText] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [complaintDate, setComplaintDate] = useState("");
  const [loadingComplaint, setLoadingComplaint] = useState(false);
  const [complaintSuccess, setComplaintSuccess] = useState(false);
  const [complaintError, setComplaintError] = useState("");

  // 🔹 Auto-set today's date for Complaints
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setComplaintDate(today);
  }, []);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.clear();
    navigate("/login", { replace: true });
    if (onLogout) onLogout();
  };

  // Fetch student data
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get("http://localhost:3001/api/user/" + userId)
      .then((response) => {
        console.log(response.data);
        setStudentData(response.data);
        setEditData(response.data);
        setLoadingStudent(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorStudent("Failed to fetch student data.");
        setLoadingStudent(false);
      });
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:3001/api/user/${userId}`)
      .then(async (res) => {
        setStudentData(res.data);

        // Update last login
        await axios.put(`http://localhost:3001/api/user/${userId}`, {
          lastLogin: new Date(),
        });
      })
      .catch((err) => console.error("Failed to fetch student data", err));
  }, []);

  // Submit complaint
  const handleComplaintSubmit = async () => {
    if (!studentData) return;
    setLoadingComplaint(true);
    setComplaintSuccess(false);
    setComplaintError("");

    try {
      await axios.post("http://localhost:3001/api/complains/register", {
        userId: studentData.id,
        complainAbout: complaintText,
        complainType: complaintType,
        complainDate: complaintDate,
      });

      setComplaintSuccess(true);
      setComplaintText("");
      setComplaintType("");

      // Reset complaint date to today
      const today = new Date().toISOString().split("T")[0];
      setComplaintDate(today);

    } catch (err: any) {
      setComplaintError(err.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoadingComplaint(false);
    }
  };

  // Update student data
  const handleUpdateSubmit = async () => {
    setLoadingUpdate(true);
    setUpdateMessage("");
    try {
      const response = await axios.put("http://localhost:3001/api/user/refresh", editData);
      setStudentData(response.data);
      setIsEditing(false);
      setUpdateMessage("Information updated successfully!");
    } catch (err: any) {
      setUpdateMessage(err.response?.data?.message || "Failed to update information.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  if (loadingStudent) {
    return <div className="p-8 text-center text-lg">Loading student data...</div>;
  }

  if (errorStudent || !studentData) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        {errorStudent || "Student data not available"}
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
              <h1 className="text-xl font-bold text-primary">
                Rajarata University
              </h1>
              <p className="text-sm text-muted-foreground">Student Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{studentData.studentName}</p>
              <p className="text-sm text-muted-foreground">
                {studentData.indexNumber}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              style={{ backgroundColor: "#ed6e60ff" }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2 relative w-full h-60 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/dashboard1.png"
            alt="Rajarata University Logo"
            className="w-full h-64 object-cover"
          />
          <h2 className="text-3xl font-bold text-primary">
            Welcome back, {studentData.studentName}!
          </h2>
          <p className="ttext-lg md:text-xl text-gray-400">
            Manage your hostel information and payments
          </p>
        </div>

        {/* Student Info */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Student Name</Label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editData.studentName}
                  onChange={(e) =>
                    setEditData({ ...editData, studentName: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium">{studentData.studentName}</p>
              )}

              <Label>Index Number</Label>
              <p className="font-medium">{studentData.indexNumber}</p>

              <Label>Register Number</Label>
              <p className="font-medium">{studentData.registerNumber}</p>

              <Label>Email</Label>
              {isEditing ? (
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium">{studentData.email}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label>Phone Number</Label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editData.phoneNumber}
                  onChange={(e) =>
                    setEditData({ ...editData, phoneNumber: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium">{studentData.phoneNumber}</p>
              )}

              <Label>Parent Name</Label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editData.parentName}
                  onChange={(e) =>
                    setEditData({ ...editData, parentName: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium">{studentData.parentName}</p>
              )}

              <Label>Parent Phone</Label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editData.parentPhonenumber}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      parentPhonenumber: e.target.value,
                    })
                  }
                />
              ) : (
                <p className="font-medium">
                  {studentData.parentPhonenumber}
                </p>
              )}

              <Label>Address</Label>
              {isEditing ? (
                <textarea
                  className="w-full p-2 border rounded"
                  rows={2}
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium">{studentData.address}</p>
              )}
            </div>
          </CardContent>

          {!isEditing && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ backgroundColor: "#a6aad7ff" }}
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </div>
          )}

          {isEditing && (
            <div className="flex gap-3 p-4">
              <Button onClick={handleUpdateSubmit} disabled={loadingUpdate}>
                {loadingUpdate ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditData(studentData);
                }}
              >
                Cancel
              </Button>
            </div>
          )}

          {updateMessage && (
            <p className="text-center text-sm text-green-600 p-2">
              {updateMessage}
            </p>
          )}
        </Card>

        {/* Hostel Info */}
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
                <h3 className="font-semibold text-primary text-lg">
                  Hostel
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {studentData.Hostel.hostelName}
                </p>
              </div>

              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <h3 className="font-semibold text-lg">
                  Room Number {studentData.roomNumber}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Floor Number {studentData.floorNumber}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Facilities Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HomeIcon className="h-5 w-5" />
              Hostel Facilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Fans", status: "Available", image: "/Fans.jpg" },
                { name: "Wi-Fi", status: "Available", image: "/Wifi.jpg" },
                { name: "Bathrooms", status: "Available", image: "/Bathrooms.jpg" },
                { name: "Canteen", status: "Available", image: "/Canteen.jpg" },
                { name: "Sick Room", status: "Available", image: "/Sick Room.jpg" },
                { name: "Study Area", status: "Available", image: "Study Area.jpg" },
              ].map((facility, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border shadow-sm transition hover:shadow-md ${
                    facility.status === "Available"
                      ? "bg-green-50 border-green-300"
                      : "bg-red-50 border-red-300"
                  }`}
                >
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-16 h-16 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-semibold text-lg">{facility.name}</h3>
                  <p
                    className={`text-sm mt-1 ${
                      facility.status === "Available"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {facility.status}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSignIcon className="h-5 w-5" />
              Make Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PaymentForm />
          </CardContent>
        </Card>

        {/* Complaint Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Make Complaint</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-2">Submit a Complaint</h3>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Complaint Type
              </label>
              <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary/30"
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
              >
                <option value="">-- Select Type --</option>
                <option value="private">Private</option>
                <option value="common">Common</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Complaint Date
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary/30"
                value={complaintDate}
                
              />
            </div>

            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary/30"
              rows={4}
              placeholder="Describe your issue..."
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
            />

            <Button
              onClick={handleComplaintSubmit}
              disabled={
                loadingComplaint ||
                !complaintText.trim() ||
                !complaintType ||
                !complaintDate
              }
            >
              {loadingComplaint ? "Submitting..." : "Submit Complaint"}
            </Button>

            {complaintSuccess && (
              <p className="text-green-600 text-sm mt-2">
                Complaint submitted successfully!
              </p>
            )}

            {complaintError && (
              <p className="text-red-600 text-sm mt-2">
                {complaintError}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Emergency */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div
                className="text-center p-4 border rounded-lg"
                style={{ backgroundColor: "#fcdad6ff" }}
              >
                <h3 className="font-semibold">Sub Warden</h3>
                <p className="text-sm text-muted-foreground">
                  {studentData.Emergency.subwardenName}
                </p>
                <p className="font-medium mt-2">
                  {studentData.Emergency.subwardenContactnumber}
                </p>
              </div>

              <div
                className="text-center p-4 border rounded-lg"
                style={{ backgroundColor: "#fcdad6ff" }}
              >
                <h3 className="font-semibold">Medical Center</h3>
                <p className="text-sm text-muted-foreground">
                  {studentData.Emergency.medicalcenterName}
                </p>
                <p className="font-medium mt-2">
                  {studentData.Emergency.subwardenContactnumber}
                </p>
              </div>

              <div
                className="text-center p-4 border rounded-lg"
                style={{ backgroundColor: "#fcdad6ff" }}
              >
                <h3 className="font-semibold">Ambulance</h3>
                <p className="text-sm text-muted-foreground">
                  {studentData.Emergency.ambulanceName}
                </p>
                <p className="font-medium mt-2">
                  {studentData.Emergency.ambulanceContactnumber}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium text-muted-foreground">
      {children}
    </p>
  );
}
