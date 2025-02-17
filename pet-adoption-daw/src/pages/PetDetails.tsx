import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PawPrint, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Pet } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
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

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setPet(data ? {
        ...data,
        id: data.id,
        imageUrl: data.image_url
      } : null);
    } catch (error) {
      console.error('Error fetching pet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div 
        className="max-w-7xl mx-auto px-4 py-8" 
        role="status" 
        aria-live="polite"
      >
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <motion.main 
        className="max-w-7xl mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pet Not Found</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            We couldn't find the pet you're looking for.
          </p>
          <Link 
            to="/" 
            className="inline-block text-rose-500 hover:text-rose-600"
            aria-label="Return to home page"
          >
            Return to Home
          </Link>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main 
      className="max-w-7xl mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.article 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        variants={itemVariants}
      >
        <div className="md:flex">
          <motion.div 
            className="md:flex-shrink-0 md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              className="h-64 w-full object-cover md:h-full"
              src={pet.imageUrl}
              alt={`${pet.name}, a ${pet.age}-year-old ${pet.breed}`}
            />
          </motion.div>
          <motion.div 
            className="p-4 md:p-8 md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {pet.name}
              </h1>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <PawPrint 
                  className="h-6 w-6 text-rose-500" 
                  aria-hidden="true"
                />
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-4 flex flex-wrap gap-2"
              variants={itemVariants}
            >
              <motion.span 
                className="inline-block bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 px-3 py-1 rounded-full text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                role="text"
                aria-label={`Pet type: ${pet.type}`}
              >
                {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
              </motion.span>
              <motion.span 
                className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                role="text"
                aria-label={`Age: ${pet.age} years`}
              >
                {pet.age} years old
              </motion.span>
            </motion.div>

            <motion.dl 
              className="mt-6 space-y-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <dt className="text-gray-600 dark:text-gray-400 font-medium">Breed</dt>
                <dd className="text-gray-900 dark:text-white">{pet.breed}</dd>
              </motion.div>

              <motion.div variants={itemVariants}>
                <dt className="text-gray-600 dark:text-gray-400 font-medium">About</dt>
                <dd className="text-gray-900 dark:text-white">{pet.description}</dd>
              </motion.div>
            </motion.dl>

            <motion.div 
              className="mt-8 space-y-4"
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
                  aria-label={`Contact us about adopting ${pet.name}`}
                >
                  <Mail className="h-5 w-5 mr-2" aria-hidden="true" />
                  Contact About {pet.name}
                </Link>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/"
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Return to all pets"
                >
                  Back to All Pets
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.article>
    </motion.main>
  );
}