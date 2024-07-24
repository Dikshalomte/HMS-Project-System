import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import HospitalCard from '../HospitalCard/HospitalCard';
import UseContext from '../context/UseContext';

function Home() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [hospitals, setHospitals] = useState([]);

  
  useEffect(() => {
    // Fetch cities from backend
    axios.get('http://localhost:3000/api/cities')
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  useEffect(() => {
    // Fetch hospitals based on selected city
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/hospitals', {
          params: { city: selectedCity }
        });
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleHospitalDelete = (id) => {
    setHospitals((prevHospitals) => prevHospitals.filter((hospital) => hospital._id !== id));
  };

  return (
    <div>
      <div className="flex justify-center mt-4">
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          <option value="">All Cities</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 flex flex-wrap justify-center">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital._id} hospital={hospital} onDelete={handleHospitalDelete} />
        ))}
      </div>
    </div>
  );
}

export default Home;
