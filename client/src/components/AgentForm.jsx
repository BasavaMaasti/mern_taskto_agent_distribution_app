import React, { useState } from 'react';

const AgentForm = ({ onSubmit, isSubmitting }) => {
  const [agent, setAgent] = useState({ 
    name: '', 
    email: '', 
    countryCode: '+1', 
    phone: '', 
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const countryCodes = [
    { code: '+1', name: 'USA (+1)' },
    { code: '+44', name: 'UK (+44)' },
    { code: '+91', name: 'India (+91)' },
    { code: '+61', name: 'Australia (+61)' },
    // Add more country codes as needed
  ];

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/; // 10-15 digits after country code
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!agent.name.trim()) newErrors.name = 'Name is required';
    if (!agent.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(agent.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!agent.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(agent.phone)) {
      newErrors.phone = 'Phone number must be 10-15 digits';
    }
    if (!agent.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(agent.password)) {
      newErrors.password = 'Password must be at least 8 characters with at least one letter and one number';
    }
    if (agent.password !== agent.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent({ ...agent, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Combine country code with phone number before submitting
      const agentWithFullPhone = {
        ...agent,
        phone: agent.countryCode + agent.phone
      };
      onSubmit(agentWithFullPhone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={agent.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={agent.email}
          onChange={handleChange}
          placeholder="agent@example.com"
          className={`w-full px-3 py-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Phone Field with Country Code */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <div className="flex">
          <select
            name="countryCode"
            value={agent.countryCode}
            onChange={handleChange}
            className="w-1/4 px-3 py-2 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <input
            type="tel"
            name="phone"
            value={agent.phone}
            onChange={handleChange}
            placeholder="1234567890"
            className={`w-3/4 px-3 py-2 rounded-r-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password *
        </label>
        <input
          type="password"
          name="password"
          value={agent.password}
          onChange={handleChange}
          placeholder="••••••••"
          className={`w-full px-3 py-2 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        <p className="mt-1 text-xs text-gray-500">Minimum 8 characters with at least one letter and one number</p>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password *
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={agent.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          className={`w-full px-3 py-2 rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300`}
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full mt-4 py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-300 ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ) : (
          'Add Agent'
        )}
      </button>
    </form>
  );
};

export default AgentForm;