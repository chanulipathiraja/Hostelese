import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function PaymentForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [payment, setPayment] = useState({
    userID: 1, // static for now
    paymentreference: "Paid",
    paymentAmount: "",
    paymentDescription: "",
    paymentDate: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/payment/add",
        payment,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response) {
        alert("Payment submitted successfully!");
        await fetchPayment(); // Refresh payment details after submit
        navigate("/student-dashboard");
      } else {
        alert(response.data.message || "Payment submission failed!");
      }
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message || "Server error while submitting payment"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Submit Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Payment Reference</Label>
            <Input
              name="paymentreference"
              value={payment.paymentreference}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              name="paymentAmount"
              value={payment.paymentAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              name="paymentDescription"
              value={payment.paymentDescription}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Payment Date</Label>
            <Input
              type="date"
              name="paymentDate"
              value={payment.paymentDate}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Payment"}
          </Button>
        </form>

        {/* Show payment details */}
        
      </CardContent>
    </Card>
  );
}
