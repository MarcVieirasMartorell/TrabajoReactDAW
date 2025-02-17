import { PetType } from '../types';

interface PetFormProps {
  formData: {
    name: string;
    type: PetType;
    breed: string;
    age: number;
    description: string;
    imageUrl: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<PetFormProps['formData']>>;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  isEditModalOpen: boolean;
}

export default function PetForm({
  formData,
  setFormData,
  handleSubmit,
  closeModal,
  isAuthenticated,
  isLoading,
  isEditModalOpen
}: PetFormProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-xl relative">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{isEditModalOpen ? 'Edit Pet' : 'Add New Pet'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as PetType }))}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="reptile">Reptile</option>
              <option value="rodent">Rodent</option>
            </select>
          </div>

          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Breed</label>
            <input
              id="breed"
              type="text"
              required
              value={formData.breed}
              onChange={(e) => setFormData((prev) => ({ ...prev, breed: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
            <input
              id="age"
              type="number"
              required
              min="0"
              value={formData.age}
              onChange={(e) => setFormData((prev) => ({ ...prev, age: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
            <input
              id="imageUrl"
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isAuthenticated || isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 disabled:bg-rose-300"
            >
              {isEditModalOpen ? 'Update Pet' : 'Add Pet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}