import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import PetCard from '../components/PetCard';
import { Pet, PetType } from '../types';

export default function Home() {
  const [selectedType, setSelectedType] = useState<PetType | 'all'>('all');
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPets(data.map(pet => ({
        ...pet,
        id: pet.id,
        imageUrl: pet.image_url
      })));
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPets = selectedType === 'all' 
    ? pets 
    : pets.filter(pet => pet.type === selectedType);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8" role="status" aria-live="polite">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading pets...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Find Your Perfect Companion
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Browse our available pets and find your new best friend
        </motion.p>
      </div>

      <motion.div 
        className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8"
        role="group"
        aria-label="Filter pets by type"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {['all', 'dog', 'cat', 'bird', 'reptile', 'rodent'].map((type) => (
          <motion.button
            key={type}
            onClick={() => setSelectedType(type as PetType | 'all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedType === type
                ? 'bg-rose-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={selectedType === type}
            aria-label={`Show ${type === 'all' ? 'all pets' : `${type}s only`}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </motion.button>
        ))}
      </motion.div>

      {filteredPets.length === 0 ? (
        <div 
          className="text-center py-8"
          role="status"
          aria-live="polite"
        >
          <p className="text-gray-600 dark:text-gray-400">No pets available in this category.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          role="list"
          aria-label="Available pets"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {filteredPets.map((pet, index) => (
            <motion.div 
              key={pet.id} 
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <PetCard pet={pet} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}