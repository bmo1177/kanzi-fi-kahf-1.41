-- Create participants table
CREATE TABLE public.participants (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reflections table
CREATE TABLE public.reflections (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    ayah_number INTEGER NOT NULL,
    ayah_text TEXT NOT NULL,
    symbolic_title TEXT NOT NULL,
    reflection_text TEXT NOT NULL,
    participant_id UUID REFERENCES public.participants(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for participants table
CREATE POLICY "Anyone can read participants" 
ON public.participants 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert participants" 
ON public.participants 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for reflections table
CREATE POLICY "Anyone can read reflections" 
ON public.reflections 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert reflections" 
ON public.reflections 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add indexes for better performance
CREATE INDEX idx_reflections_created_at ON public.reflections(created_at DESC);
CREATE INDEX idx_reflections_ayah_number ON public.reflections(ayah_number);