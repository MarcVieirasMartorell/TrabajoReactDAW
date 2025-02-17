import { staff } from '../data';
import { Calendar, MapPin, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Brand sponsors data
const sponsors = [
  {
    name: "Royal Canin",
    logo: "https://i.ibb.co/VWNZRB1t/imagen-2025-02-17-224626763.png?auto=format&fit=crop&q=80&w=400",
    description: "Premium pet nutrition"
  },
  {
    name: "PetSafe",
    logo: "https://i.ibb.co/VKkkn6j/imagen-2025-02-17-224657864.png?auto=format&fit=crop&q=80&w=400",
    description: "Pet safety products"
  },
  {
    name: "VetCare Plus",
    logo: "https://i.ibb.co/ynMNBs98/imagen-2025-02-17-224736774.png?auto=format&fit=crop&q=80&w=400",
    description: "Veterinary supplies"
  },
  {
    name: "PawPerfect",
    logo: "https://i.ibb.co/NM0Fh98/imagen-2025-02-17-224826525.png?auto=format&fit=crop&q=80&w=400",
    description: "Pet grooming products"
  },
  {
    name: "Happy Tails",
    logo: "https://i.ibb.co/GrRTZsV/imagen-2025-02-17-225208995.png?auto=format&fit=crop&q=80&w=400",
    description: "Pet toys and accessories"
  },
  {
    name: "Nature's Best",
    logo: "https://i.ibb.co/ZzyNgynQ/imagen-2025-02-17-224948964.png?auto=format&fit=crop&q=80&w=400",
    description: "Organic pet food"
  }
];

function isOpenHouseSaturday(date: Date): boolean {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const firstSaturday = new Date(firstDay);
  firstSaturday.setDate(firstDay.getDate() + (6 - firstDay.getDay()));
  const weeksSinceFirst = Math.floor((date.getTime() - firstSaturday.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return date.getDay() === 6 && weeksSinceFirst % 2 === 0;
}

function generateCalendarDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];
  
  for (let i = 0; i < firstDay.getDay(); i++) {
    const day = new Date(year, month, -i);
    days.unshift(day);
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }
  
  return days;
}

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

export default function About() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  // Example location for PetHaven (Guarromán, Jaén, Spain)
  const location = {
    lat: 38.18282,
    lng: -3.68697,
  }; 

  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth()));
  }, [currentDate]);

  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Open House Events Section */}
      <motion.div 
        className="mb-16 text-center"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Open House Events
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join us every other Saturday for our special Open House events! Meet our adorable animals, 
            interact with them in a petting zoo environment, and learn more about pet care from our 
            expert staff. It's the perfect opportunity to find your new best friend!
          </p>
          
          {/* Calendar */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => changeMonth(-1)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ←
              </button>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button
                onClick={() => changeMonth(1)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                →
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2"
                >
                  {day}
                </div>
              ))}
              
              {calendarDays.map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isOpenHouse = isOpenHouseSaturday(date);
                
                return (
                  <motion.div
                    key={index}
                    className={`
                      relative p-2 text-center min-h-[2.5rem]
                      ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}
                      ${isOpenHouse ? 'bg-rose-100 dark:bg-rose-900 rounded-lg' : ''}
                    `}
                    whileHover={isOpenHouse ? { scale: 1.1 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={`
                      ${isOpenHouse ? 'font-semibold' : ''}
                    `}>
                      {date.getDate()}
                    </span>
                    {isOpenHouse && (
                      <motion.div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="block h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="inline-block w-3 h-3 bg-rose-100 dark:bg-rose-900 rounded-sm mr-2"></span>
            Highlighted dates indicate Open House events (Every other Saturday)
          </div>
        </div>
      </motion.div>

      {/* Location Section */}
      <motion.div 
        className="mb-16"
        variants={itemVariants}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Visit Us
          </h2>
          <motion.div 
            className="flex items-center justify-center gap-2 text-lg text-gray-600 dark:text-gray-400"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MapPin className="h-5 w-5 text-rose-500" />
            <p>123 Pet Haven Street, Guarromán, Jaén 07180</p>
          </motion.div>
        </div>
        
        <motion.div 
          className="h-[400px] rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lng]} icon={icon}>
              <Popup>
                <div className="text-gray-900">
                  <strong>PetHaven</strong>
                  <br />
                  Open every day: 9 AM - 6 PM
                  <br />
                  Open House: Every other Saturday
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="text-center mb-12"
        variants={itemVariants}
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">Meet the dedicated professionals who care for our animals</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
      >
        {staff.map((member) => (
          <motion.div 
            key={member.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src={member.imageUrl} 
              alt={member.name} 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h3>
              <p className="text-rose-500 dark:text-rose-400 font-medium">{member.role}</p>
              <p className="mt-4 text-gray-600 dark:text-gray-400">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Sponsors Section */}
      <motion.div 
        className="text-center mb-12"
        variants={itemVariants}
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
          <Award className="h-8 w-8 text-rose-500" />
          Our Sponsors
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Trusted brands that support our mission
        </p>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          variants={containerVariants}
        >
          {sponsors.map((sponsor) => (
            <motion.div 
              key={sponsor.name}
              className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full pt-[100%] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">{sponsor.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{sponsor.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}