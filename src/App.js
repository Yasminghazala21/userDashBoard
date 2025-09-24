import React, { useState, useEffect } from 'react';
import './App.css'; 

import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import SearchFilter from './components/SearchFilter';

import { fetchUsers, addUser, updateUser, deleteUser } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPageOptions = [10, 25, 50];
  const [usersPerPage, setUsersPerPage] = useState(usersPerPageOptions[0]);

  // Fetch users initially
  useEffect(() => {
    fetchUsers().then(apiUsers => {
      const formattedUsers = apiUsers.map(u => ({
        id: u.id,
        firstName: u.name.split(' ')[0] || u.name,
        lastName: u.name.split(' ')[1] || '',
        email: u.email,
        department: u.company ? u.company.name : 'Unknown',
      }));
      setUsers(formattedUsers);
      setFilteredUsers(formattedUsers);
    });
  }, []);

  // Search and Filter handler
  const handleFilter = (searchText, department) => {
    let tempUsers = [...users];
    if (department !== 'All Departments') {
      tempUsers = tempUsers.filter(u => u.department === department);
    }
    if (searchText.trim() !== '') {
      let lower = searchText.trim().toLowerCase();
      tempUsers = tempUsers.filter(
        u =>
          u.firstName.toLowerCase().includes(lower) ||
          u.lastName.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower)
      );
    }
    setCurrentPage(1); // Reset to first page when filtering/searching
    setFilteredUsers(tempUsers);
  };

  // Add user
  const handleAddUser = async user => {
    const created = await addUser(user);
    created.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const updatedUsers = [...users, created];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setShowForm(false);
  };

  // Edit user
  const handleEditUser = user => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Update user
  const handleUpdateUser = async user => {
    await updateUser(user.id, user);
    const updatedUsers = users.map(u => (u.id === user.id ? user : u));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setShowForm(false);
    setEditingUser(null);
  };

  // Delete user
  const handleDeleteUser = async id => {
    await deleteUser(id);
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Pagination controls
  const paginate = pageNum => setCurrentPage(pageNum);
  const changeUsersPerPage = e => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="app-container">
      <h1 className='app-heading'>
        User Management Dashboard
      </h1>

      {showForm ? (
        <UserForm userToEdit={editingUser} onSave={editingUser ? handleUpdateUser : handleAddUser} onCancel={handleCancel} />
      ) : (
        <>
          <button
            className='add-user-button'
            onClick={() => setShowForm(true)}
          >
            Add User
          </button>

          <SearchFilter onFilter={handleFilter} />

          <UserTable users={currentUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />

          {/* Pagination */}
          <div className='style-pagination'>
            <div>
              Page {currentPage} of {totalPages || 1}
            </div>

            <nav>
              <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)} style={{ marginRight: '5px' }}>
                Prev
              </button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => paginate(currentPage + 1)}>
                Next
              </button>
            </nav>

            <div>
              Users per page:{' '}
              <select value={usersPerPage} onChange={changeUsersPerPage} style={{ padding: '5px 10px' }}>
                {usersPerPageOptions.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
