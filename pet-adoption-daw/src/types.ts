export type PetType = 'dog' | 'cat' | 'bird' | 'reptile' | 'rodent';

export interface Pet {
  id: number;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  description: string;
  imageUrl: string;
}

export interface Staff {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}