import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Plus } from "lucide-react";

interface FacilityFormData {
  type: string;
}

export function FacilityForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<FacilityFormData>();

  const onSubmit = async (data: FacilityFormData) => {
    setIsSubmitting(true);

    try {
      const payload = { facility_type: data.type };

      const res = await axios.post("http://localhost:3001/api/facilities/register", payload);

      if (res.status === 201 || res.status === 200) {
        toast({
          title: "Facility Type Added",
          description: "The facility type has been successfully added.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add facility type. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Add Facility Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Facility Type</Label>
            <Input
              id="type"
              placeholder="Enter facility type"
              {...register("type", { required: "Facility type is required" })}
            />
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isSubmitting ? "Adding..." : "Add Type"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}