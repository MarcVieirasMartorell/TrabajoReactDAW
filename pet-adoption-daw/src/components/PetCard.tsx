import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <motion.article 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
      aria-labelledby={`pet-name-${pet.id}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={pet.imageUrl} 
        alt={`${pet.name}, a ${pet.age}-year-old ${pet.breed}`}
        className="w-full h-48 object-cover"
        loading='lazy'
      />
      <div className="p-4">
        <h2 
          id={`pet-name-${pet.id}`} 
          className="text-xl font-semibold text-gray-800 dark:text-white"
        >
          {pet.name}
        </h2>
        <dl className="mt-2">
          <dt className="sr-only">Breed</dt>
          <dd className="text-gray-600 dark:text-gray-400 text-sm">{pet.breed}</dd>
          
          <dt className="sr-only">Age</dt>
          <dd className="text-gray-600 dark:text-gray-400 text-sm">{pet.age} years old</dd>
        </dl>
        <p className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-2">{pet.description}</p>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to={`/pet/${pet.id}`}
            className="mt-4 w-full bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 transition-colors inline-block text-center"
            aria-label={`Learn more about ${pet.name}`}
          >
            Meet {pet.name}
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}