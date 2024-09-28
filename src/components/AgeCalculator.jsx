import React, { useState } from 'react';

const AgeCalculator = () => {
  const [dob, setDob] = useState({
    day: '',
    month: '',
    year: '',
  });

  const [age, setAge] = useState({
    years: '--',
    months: '--',
    days: '--',
  });

  const [errors, setErrors] = useState({
    day: '',
    month: '',
    year: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDob({
      ...dob,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // Validate inputs
  const validate = () => {
    let isValid = true;
    const newErrors = { day: '', month: '', year: '' };
    const { day, month, year } = dob;
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    const currentDate = new Date();

    if (!day || isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      newErrors.day = 'Please enter a valid day';
      isValid = false;
    }

    if (!month || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      newErrors.month = 'Please enter a valid month';
      isValid = false;
    }

    if (!year || isNaN(yearNum) || yearNum > currentDate.getFullYear()) {
      newErrors.year = 'Please enter a valid year';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Calculate age
  const calculateAge = () => {
    if (!validate()) return;

    const birthDate = new Date(dob.year, dob.month - 1, dob.day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateAge();
  };

  return (
    <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Age Calculator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          {/* Day Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Day</label>
            <input
              type="number"
              name="day"
              value={dob.day}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.day ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="DD"
            />
            {errors.day && (
              <p className="text-red-500 text-xs mt-1">{errors.day}</p>
            )}
          </div>

          {/* Month Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Month</label>
            <input
              type="number"
              name="month"
              value={dob.month}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.month ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="MM"
            />
            {errors.month && (
              <p className="text-red-500 text-xs mt-1">{errors.month}</p>
            )}
          </div>

          {/* Year Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={dob.year}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.year ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="YYYY"
            />
            {errors.year && (
              <p className="text-red-500 text-xs mt-1">{errors.year}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Calculate Age
        </button>
      </form>

      {/* Display Age */}
      <div className="mt-6 text-center">
        <div className="flex justify-center space-x-6">
          <div>
            <span className="text-4xl font-bold">{age.years}</span>
            <span className="block text-gray-500">Years</span>
          </div>
          <div>
            <span className="text-4xl font-bold">{age.months}</span>
            <span className="block text-gray-500">Months</span>
          </div>
          <div>
            <span className="text-4xl font-bold">{age.days}</span>
            <span className="block text-gray-500">Days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
