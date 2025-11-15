import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function FacilityForm() {
  const [hostelId, setHostelId] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/facilities/register",
        { hostelId,facilityType }
      );

      setSuccess("Facility added successfully!");
      setHostelId("");
      setFacilityType("");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label className="block font-medium mb-1">Hostel ID</label>
        <input
          type="text"
          value={hostelId}
          onChange={(e) => setHostelId(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Enter hostel ID"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Facility Type</label>
        <input
          type="text"
          value={facilityType}
          onChange={(e) => setFacilityType(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Enter facility type"
        />
      </div>

    

      <Button
        type="submit"
        disabled={loading}
        className="bg-primary text-white w-full"
      >
        {loading ? "Adding..." : "Add Facility"}
      </Button>
    </form>
  );
}