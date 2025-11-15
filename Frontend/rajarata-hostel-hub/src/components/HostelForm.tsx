import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Building, Plus } from "lucide-react";
import axios from "axios";

interface HostelFormData {
  hostelName: string;
  register_count: number;
  leave_count: number;
  sick_count: number;
  room_count: number;
 
}


export function HostelForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<HostelFormData>();

  

  const onSubmit = async (data: HostelFormData) => {
    console.log("Hostel data:", data);
    setIsSubmitting(true);

    try {
      const payload = {
        hostelName: data.hostelName,
        register_count: data.register_count,
        leave_count: data.leave_count,
        sick_count: data.sick_count,
        room_count: data.room_count,
       
      };

      const response = await axios.post("http://localhost:3001/api/hostels/register", payload);

      if (response.status === 201 || response.status === 200) {
        toast({
          title: "Hostel Added",
          description: "The hostel has been successfully added to the system.",
        });
        reset();
       
      } else {
        toast({
          title: "Error",
          description: "Failed to add hostel. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding hostel:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Add New Hostel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hostel Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Hostel Name</Label>
            <Input id="name" {...register("hostelName", { required: "Hostel name is required" })} placeholder="Enter hostel name"/>
            {errors.hostelName && <p className="text-sm text-destructive">{errors.hostelName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Register Count</Label>
            <Input id="capacity" type="number" {...register("register_count", { required: "register_count is required", min: { value: 1, message: "register_count must be at least 1" }})} placeholder="Enter register_count"/>
            {errors.register_count && <p className="text-sm text-destructive">{errors.register_count.message}</p>}
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <Label htmlFor="capacity">Study Area</Label>
            <Input id="capacity" type="number" {...register("leave_count", { required: "leave_count is required", min: { value: 1, message: "leave_count must be at least 1" }})} placeholder="Enter Study Area"/>
            {errors.leave_count && <p className="text-sm text-destructive">{errors.leave_count.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Sick Rooms</Label>
            <Input id="capacity" type="number" {...register("sick_count", { required: "sick_count is required", min: { value: 1, message: "sick_count must be at least 1" }})} placeholder="Enter Sick Rooms"/>
            {errors.sick_count && <p className="text-sm text-destructive">{errors.sick_count.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Room Count</Label>
            <Input id="capacity" type="number" {...register("room_count", { required: "room_count is required", min: { value: 1, message: "room_count must be at least 1" }})} placeholder="Enter room_count"/>
            {errors.room_count && <p className="text-sm text-destructive">{errors.room_count.message}</p>}
          </div>

          

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting} >
            <Plus className="h-4 w-4 mr-2" />
            {isSubmitting ? "Adding Hostel..." : "Add Hostel"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}