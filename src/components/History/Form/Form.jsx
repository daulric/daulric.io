'use client';

import { useState } from 'react';

const CustomForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: [],
    shortAnswer: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        interests: checked
          ? [...prevData.interests, value]
          : prevData.interests.filter((interest) => interest !== value),
      }));
    } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 p-6 bg-gray-900 rounded-lg shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Custom Form</h1>
        <p className="text-gray-400">Please fill out this form</p>
      </div>

      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <p className="mb-2 text-lg font-medium text-gray-300">Interest (Select one)</p>
        {['Technology', 'Science', 'Art', 'Sports'].map((interest) => (
          <div key={interest} className="flex items-center mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="interest"
                value={interest}
                checked={formData.interest === interest}
                onChange={handleInputChange}
                className="form-radio h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded-full focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <span className="ml-2 text-gray-300">{interest}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label htmlFor="shortAnswer" className="block mb-2 text-lg font-medium text-gray-300">
          Short Answer (max 100 characters)
        </label>
        <textarea
          id="shortAnswer"
          name="shortAnswer"
          value={formData.shortAnswer}
          onChange={handleInputChange}
          maxLength={100}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
        <p className="text-sm text-gray-400 mt-1">
          {formData.shortAnswer.length}/100 characters
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Submit
      </button>
    </form>
  );
};

export default CustomForm;