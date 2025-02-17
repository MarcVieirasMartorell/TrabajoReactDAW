import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import PetCard from '../components/PetCard';
import { Pet, PetType } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PetType | 'all'>('all');
  const [maxAge, setMaxAge] = useState<number | ''>('');
  const [minAge, setMinAge] = useState<number | ''>('');
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    // Handle URL parameters
    const type = searchParams.get('type');
    const maxAgeParam = searchParams.get('maxAge');
    const minAgeParam = searchParams.get('minAge');

    if (type) {
      setSelectedType(type as PetType);
    }
    if (maxAgeParam) {
      setMaxAge(Number(maxAgeParam));
    }
    if (minAgeParam) {
      setMinAge(Number(minAgeParam));
    }
  }, [searchParams]);

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

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || pet.type === selectedType;
    const matchesMaxAge = !maxAge || pet.age <= maxAge;
    const matchesMinAge = !minAge || pet.age >= minAge;

    return matchesSearch && matchesType && matchesMaxAge && matchesMinAge;
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading pets...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Find Your Perfect Pet</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.input
            type="text"
            placeholder="Search by name or breed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          />
          
          <motion.select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as PetType | 'all')}
            className="p-2 border rounded-md focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          >
            <option value="all">All Types</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="bird">Birds</option>
            <option value="reptile">Reptiles</option>
            <option value="rodent">Rodents</option>
          </motion.select>
          
          <motion.input
            type="number"
            placeholder="Minimum age..."
            value={minAge}
            onChange={(e) => setMinAge(e.target.value ? Number(e.target.value) : '')}
            className="p-2 border rounded-md focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="number"
            placeholder="Maximum age..."
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value ? Number(e.target.value) : '')}
            className="p-2 border rounded-md focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          />
        </div>
      </motion.div>

      {filteredPets.length === 0 ? (
        <motion.div 
          className="text-center py-8"
          variants={itemVariants}
        >
          <p className="text-gray-600 dark:text-gray-400">No pets found matching your criteria.</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {filteredPets.map((pet, index) => (
            <motion.div
              key={pet.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <PetCard pet={pet} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}