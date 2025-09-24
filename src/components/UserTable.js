import React, { useState } from 'react';
import './UserTable.css';

function UserTable({ users, onEdit, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const sortedUsers = [...users].sort((a, b) => {
    const key = sortConfig.key;
    const dir = sortConfig.direction === 'asc' ? 1 : -1;

    if (a[key] < b[key]) return -1 * dir;
    if (a[key] > b[key]) return 1 * dir;
    return 0;
  });

  const handleSort = (col) => {
    if (sortConfig.key === col) {
      // Toggle direction
      setSortConfig({ key: col, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ key: col, direction: 'asc' });
    }
  };

  const getSortIndicator = (col) => {
    if (sortConfig.key === col) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('id')}>ID {getSortIndicator('id')}</th>
          <th onClick={() => handleSort('firstName')}>First Name {getSortIndicator('firstName')}</th>
          <th onClick={() => handleSort('lastName')}>Last Name {getSortIndicator('lastName')}</th>
          <th onClick={() => handleSort('email')}>Email {getSortIndicator('email')}</th>
          <th onClick={() => handleSort('department')}>Department {getSortIndicator('department')}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No users found.</td></tr>
        ) : (
          sortedUsers.map(user => (
            <tr key={user.id}>
              <td data-label="ID">{user.id}</td>
              <td data-label="First Name">{user.firstName}</td>
              <td data-label="Last Name">{user.lastName}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Department">{user.department}</td>
              <td className="actions" data-label="Actions">
                <button className="btn warning" onClick={() => onEdit(user)}>Edit</button>
                <button className="btn danger" onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default UserTable;
