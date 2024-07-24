import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HospitalCard({ hospital, onDelete }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedHospitalData, setUpdatedHospitalData] = useState({
    name: hospital?.name || '',
    city: hospital?.city || '',
    speciality: hospital?.speciality || '',
    noOfDoctors: hospital?.noOfDoctors || '',
    noOfDepartments: hospital?.noOfDepartments || '',
    description: hospital?.description || '',
    image: null
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/hospitals/${id}`);
      toast.error('Hospital deleted successfully', {
        position: 'top-center'
      });
      onDelete(id); // Call the onDelete callback prop to update the state in Home component
    } catch (error) {
      console.error('Error deleting hospital:', error);
    }
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', updatedHospitalData.name);
    formData.append('city', updatedHospitalData.city);
    formData.append('speciality', updatedHospitalData.speciality);
    formData.append('noOfDoctors', updatedHospitalData.noOfDoctors);
    formData.append('noOfDepartments', updatedHospitalData.noOfDepartments);
    formData.append('description', updatedHospitalData.description);
    formData.append('image', updatedHospitalData.image);

    try {
      await axios.put(`http://localhost:3000/api/hospitals/${hospital._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowUpdateForm(false);
      toast.success('Hospital updated successfully!', {
        position: 'top-center'
      });
    } catch (error) {
      console.error('Error updating hospital:', error);
    }
  };

  const handleUpdateFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setUpdatedHospitalData({ ...updatedHospitalData, image: files[0] });
    } else {
      setUpdatedHospitalData({ ...updatedHospitalData, [name]: value });
    }
  };

  return (
    <>
      <div className="hospital-card p-6 max-w-sm bg-white rounded-xl shadow-md m-4">
        {hospital?.image ? (
          <img src={`http://localhost:3000/${hospital.image}`} alt="" className="w-full h-auto object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-900">{hospital?.name}</h2>
        <p className="text-gray-600">{hospital?.city}</p>
        <p className="text-gray-600">{hospital?.speciality}</p>

        <div className="flex justify-between mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            onClick={handleUpdateClick}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
            onClick={() => handleDelete(hospital._id)}
          >
            Delete
          </button>
        </div>
      </div>

      {showUpdateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 overflow-y-scroll">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Update Hospital</h2>
            <form onSubmit={handleUpdateFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={updatedHospitalData.name}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">City:</label>
                <input
                  type="text"
                  name="city"
                  value={updatedHospitalData.city}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Speciality:</label>
                <input
                  type="text"
                  name="speciality"
                  value={updatedHospitalData.speciality}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">No Of Doctors:</label>
                <input
                  type="text"
                  name="noOfDoctors"
                  value={updatedHospitalData.noOfDoctors}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">No Of Departments:</label>
                <input
                  type="text"
                  name="noOfDepartments"
                  value={updatedHospitalData.noOfDepartments}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={updatedHospitalData.description}
                  onChange={handleUpdateFormChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Image Upload:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded mr-2"
                  onClick={() => setShowUpdateForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-700 hover:bg-orange-800 text-white font-semibold px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

HospitalCard.propTypes = {
  hospital: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    speciality: PropTypes.string.isRequired,
    noOfDoctors: PropTypes.string,
    noOfDepartments: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default HospitalCard;
