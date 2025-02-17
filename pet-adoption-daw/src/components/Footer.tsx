import { Link } from 'react-router-dom';
import { Heart, Dog, Cat, Bird, Cake as Snake, Mouse, Baby, Glasses } from 'lucide-react';

export default function Footer() {
  const quickSearches = [
    {
      name: "Dogs",
      icon: Dog,
      url: "/search?type=dog"
    },
    {
      name: "Cats",
      icon: Cat,
      url: "/search?type=cat"
    },
    {
      name: "Birds",
      icon: Bird,
      url: "/search?type=bird"
    },
    {
      name: "Reptiles",
      icon: Snake,
      url: "/search?type=reptile"
    },
    {
      name: "Rodents",
      icon: Mouse,
      url: "/search?type=rodent"
    },
    {
      name: "Young Pets",
      icon: Baby,
      url: "/search?maxAge=1"
    },
    {
      name: "Senior Pets",
      icon: Glasses,
      url: "/search?minAge=9"
    }
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-rose-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Looking for a Pet? You're in the Right Place!
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Find your perfect companion by exploring our categories below
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {quickSearches.map((search) => (
            <Link
              key={search.name}
              to={search.url}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-rose-50 dark:hover:bg-gray-600 transition-colors group"
            >
              <search.icon className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-rose-500 transition-colors" />
              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                {search.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} PetHaven. No rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}