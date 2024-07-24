import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import HospitalData from '../HospitalData'
import axios from 'axios';

function NewHospital() {
    const [hospital, setHospital] = useState({
        name: '',
        city: '',
        speciality: '',
        image: null  // Hold the selected image file
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setHospital({ ...hospital, image: files[0] });
        } else {
            setHospital({ ...hospital, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', hospital.name);
        formData.append('city', hospital.city);
        formData.append('speciality', hospital.speciality);
        formData.append('image', hospital.image);

        try {
            const response = await axios.post('http://localhost:3000/api/hospitals', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Hospital added:', response.data);
            // Optionally: Reset form fields or show success message

            toast.success('Hospital added successfully!', {
                position: 'top-center'
            });

            setHospital( {
                name: '',
                city: '',
                speciality: '',
                image: null  // Hold the selected image file
            }) ;

            e.target.reset();
        } catch (error) {
            console.error('Error adding hospital:', error);
            // Handle error, show user feedback, etc.
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md m-3">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={hospital.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">City:</label>
                    <input
                        type="text"
                        name="city"
                        value={hospital.city}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Speciality:</label>
                    <input
                        type="text"
                        name="speciality"
                        value={hospital.speciality}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Image Upload:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        accept="image/*"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-orange-700 text-white font-semibold rounded-lg "
                >
                    Save Changes
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default NewHospital