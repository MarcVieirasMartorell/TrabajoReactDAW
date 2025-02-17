/*
  # Create pets table and policies

  1. New Tables
    - `pets`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `breed` (text)
      - `age` (integer)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `pets` table
    - Add policies for:
      - Public read access
      - Authenticated users can create/update/delete pets
*/

CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  breed text NOT NULL,
  age integer NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Pets are viewable by everyone"
  ON pets
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert pets
CREATE POLICY "Authenticated users can insert pets"
  ON pets
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update pets
CREATE POLICY "Authenticated users can update pets"
  ON pets
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete pets
CREATE POLICY "Authenticated users can delete pets"
  ON pets
  FOR DELETE
  TO authenticated
  USING (true);