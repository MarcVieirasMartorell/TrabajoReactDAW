export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pets: {
        Row: {
          id: string
          name: string
          type: string
          breed: string
          age: number
          description: string
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          breed: string
          age: number
          description: string
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          breed?: string
          age?: number
          description?: string
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}