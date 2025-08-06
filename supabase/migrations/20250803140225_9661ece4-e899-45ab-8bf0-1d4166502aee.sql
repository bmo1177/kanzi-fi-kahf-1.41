-- Add is_featured column to reflections if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reflections' AND column_name = 'is_featured') THEN
        ALTER TABLE public.reflections ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Create admin_users table for admin authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users if not already enabled
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'admin_users') THEN
        ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = is_admin.user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policies for admin_users (drop if exists first)
DROP POLICY IF EXISTS "Admins can view their own profile" ON public.admin_users;
CREATE POLICY "Admins can view their own profile" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Only authenticated users can insert admin profiles" ON public.admin_users;
CREATE POLICY "Only authenticated users can insert admin profiles" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create admin policies for reflections (drop if exists first)
DROP POLICY IF EXISTS "Admins can update reflections" ON public.reflections;
CREATE POLICY "Admins can update reflections" 
ON public.reflections 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete reflections" ON public.reflections;
CREATE POLICY "Admins can delete reflections" 
ON public.reflections 
FOR DELETE 
USING (public.is_admin(auth.uid()));

-- Add trigger for admin_users updated_at if not exists
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();