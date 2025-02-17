import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Pet } from '../types';
import PetForm from '../components/PetForm';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const [formData, setFormData] = useState<Omit<Pet, 'id'>>({
    name: '',
    type: 'dog',
    breed: '',
    age: 0,
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      fetchPets();
    } else {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password
      });

      if (error) throw error;

      setIsAuthenticated(true);
      fetchPets();
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Invalid login credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
      alert('Error fetching pets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in first');
      return;
    }
    setIsLoading(true);

    try {
      if (isEditModalOpen && selectedPet) {
        const { error } = await supabase
          .from('pets')
          .update({
            name: formData.name,
            type: formData.type,
            breed: formData.breed,
            age: formData.age,
            description: formData.description,
            image_url: formData.imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedPet.id);

        if (error) throw error;
        alert('Pet updated successfully!');
      } else {
        const { error } = await supabase
          .from('pets')
          .insert({
            name: formData.name,
            type: formData.type,
            breed: formData.breed,
            age: formData.age,
            description: formData.description,
            image_url: formData.imageUrl
          });

        if (error) throw error;
        alert('Pet added successfully!');
      }

      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      setFormData({
        name: '',
        type: 'dog',
        breed: '',
        age: 0,
        description: '',
        imageUrl: ''
      });
      fetchPets();
    } catch (error) {
      console.error('Error saving pet:', error);
      alert('Error saving pet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (pet: Pet) => {
    setSelectedPet(pet);
    setFormData({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      description: pet.description,
      imageUrl: pet.imageUrl
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (petId: string) => {
    if (!isAuthenticated) {
      alert('Please log in first');
      return;
    }
    if (window.confirm('Are you sure you want to delete this pet?')) {
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from('pets')
          .delete()
          .eq('id', petId);

        if (error) throw error;
        alert('Pet deleted successfully!');
        fetchPets();
      } catch (error) {
        console.error('Error deleting pet:', error);
        alert('Error deleting pet. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Admin Login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-rose-300"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pet Management</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 flex items-center whitespace-nowrap"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Pet
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center whitespace-nowrap"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pet
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Breed
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Age
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {pets.map((pet) => (
                <tr key={pet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={pet.imageUrl} 
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{pet.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{pet.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{pet.breed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{pet.age} years</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button 
                      onClick={() => handleEdit(pet)} 
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4"
                      aria-label={`Edit ${pet.name}`}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(pet.id)} 
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      aria-label={`Delete ${pet.name}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <PetForm 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          closeModal={() => setIsAddModalOpen(false)}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          isEditModalOpen={false}
        />
      )}
      {isEditModalOpen && (
        <PetForm 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          closeModal={() => setIsEditModalOpen(false)}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          isEditModalOpen={true}
        />
      )}
    </div>
  );
}