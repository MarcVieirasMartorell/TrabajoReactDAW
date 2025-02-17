import { Pet, Staff } from './types';

export const pets: Pet[] = [
  {
    id: 1,
    name: "Luna",
    type: "dog",
    breed: "Labrador Retriever",
    age: 2,
    description: "Luna is a friendly and energetic Labrador who loves to play fetch and swim.",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Milo",
    type: "cat",
    breed: "Siamese",
    age: 3,
    description: "Milo is a gentle Siamese cat who enjoys lounging in sunny spots and cuddling.",
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Rio",
    type: "bird",
    breed: "Macaw",
    age: 5,
    description: "Rio is a colorful and talkative Macaw who knows several words and loves fruit.",
    imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Rex",
    type: "reptile",
    breed: "Bearded Dragon",
    age: 2,
    description: "Rex is a calm bearded dragon who enjoys basking under his heat lamp.",
    imageUrl: "https://images.unsplash.com/photo-1534295025011-df1f72049d1f?auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Pip",
    type: "rodent",
    breed: "Hamster",
    age: 1,
    description: "Pip is an adventurous hamster who loves running in his wheel and collecting treats.",
    imageUrl: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80"
  }
];

export const staff: Staff[] = [
  {
    id: 1,
    name: "Dr. Ramon Riera",
    role: "Veterinarian",
    bio: "Dr. Ramon Riera has been caring for animals for over 15 years and specializes in exotic pets.",
    imageUrl: "https://i.ibb.co/TBcWb1XQ/RAMON-RIERA-VETERINARIA.png?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Miquel Alomar",
    role: "Animal Behaviorist",
    bio: "Miquel helps our animals overcome behavioral challenges and prepares them for their forever homes.",
    imageUrl: "https://i.ibb.co/p6kw4Hkt/imagen-2025-02-16-145829292.png?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Toni Postigus",
    role: "Adoption Coordinator",
    bio: "Mr. Postigus ensures perfect matches between our animals and their new families.",
    imageUrl: "https://i.ibb.co/tM7RhLbL/imagen-2025-02-17-151836208.png?auto=format&fit=crop&q=80"
  }
];