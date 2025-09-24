import React, { useState, useEffect } from 'react';
import './UserForm.css';

const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales'];

function UserForm({ onSave, userToEdit, onCancel }) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: departments[0],
  });

  useEffect(() => {
    if (userToEdit) setUser(userToEdit);
    else
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        department: departments[0],
      });
  }, [userToEdit]);

  const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (!user.firstName.trim() || !user.lastName.trim() || !user.email.trim())
      return alert('Please fill all fields');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) return alert('Invalid email');

    onSave(user);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input name="firstName" value={user.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input name="lastName" value={user.lastName} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input name="email" value={user.email} onChange={handleChange} type="email" />
      </div>

      <div className="form-group">
        <label>Department</label>
        <select name="department" value={user.department} onChange={handleChange}>
          {departments.map(dep => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-success">
          {userToEdit ? 'Update User' : 'Add User'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
