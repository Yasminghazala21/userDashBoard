import React, { useState } from 'react';
import './SearchFilter.css';

const departments = ['All Departments', 'Engineering', 'Marketing', 'HR', 'Finance', 'Sales'];

function SearchFilter({ onFilter }) {
  const [searchText, setSearchText] = useState('');
  const [department, setDepartment] = useState(departments[0]);

  const handleSearchChange = e => {
    const val = e.target.value;
    setSearchText(val);
    onFilter(val, department);
  };

  const handleDepartmentChange = e => {
    const val = e.target.value;
    setDepartment(val);
    onFilter(searchText, val);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchText}
        onChange={handleSearchChange}
      />
      <select value={department} onChange={handleDepartmentChange}>
        {departments.map(dep => (
          <option key={dep} value={dep}>
            {dep}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;
