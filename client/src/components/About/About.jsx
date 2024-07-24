import React from 'react'

function About() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">About Hospital Manager</h1>
      <p className="text-lg mb-8 text-center">Welcome to Hospital Manager, a comprehensive application designed to streamline hospital management processes.</p>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Features</h2>
        <ul className="list-disc pl-8">
          <li>Manage hospital information such as name, city, and speciality.</li>
          <li>Upload and manage images for hospitals.</li>
          <li>Search and filter hospitals based on various criteria.</li>
          <li>Intuitive interface for easy navigation and use.</li>
          {/* Add more features as needed */}
        </ul>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Development Team</h2>
        <p>Hospital Manager is developed by [Your Organization/Team Name]. We are dedicated to creating solutions that improve healthcare management.</p>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p>If you have any questions or feedback, please contact us at:</p>
        <p className="text-blue-500">Email: contact@hospitalmanager.com</p>
        {/* Add more contact information as needed */}
      </div>
    </div>
  </div>
  )
}

export default About