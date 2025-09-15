-- Create storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-proofs', 'payment-proofs', false);

-- Create hostels table
CREATE TABLE public.hostels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 0,
  occupied INTEGER NOT NULL DEFAULT 0,
  contact_phone TEXT,
  contact_email TEXT,
  facilities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create facilities table
CREATE TABLE public.facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'common', 'room', 'building'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL, -- 'hostel_fee', 'mess_fee', 'security_deposit', 'other'
  description TEXT,
  proof_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  payment_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hostels (admin can manage, everyone can view)
CREATE POLICY "Everyone can view hostels"
  ON public.hostels FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage hostels"
  ON public.hostels FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for facilities (admin can manage, everyone can view)
CREATE POLICY "Everyone can view facilities"
  ON public.facilities FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage facilities"
  ON public.facilities FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for payments (students can create, admins can manage)
CREATE POLICY "Students can create payments"
  ON public.payments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Students can view their payments"
  ON public.payments FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage all payments"
  ON public.payments FOR ALL
  USING (true)
  WITH CHECK (true);

-- Storage policies for payment proofs
CREATE POLICY "Users can upload payment proofs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Users can view payment proofs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'payment-proofs');

CREATE POLICY "Admins can manage payment proofs"
  ON storage.objects FOR ALL
  USING (bucket_id = 'payment-proofs');

-- Create update triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_hostels_updated_at
  BEFORE UPDATE ON public.hostels
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_facilities_updated_at
  BEFORE UPDATE ON public.facilities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();