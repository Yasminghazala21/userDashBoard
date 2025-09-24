const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addUser = async user => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const deleteUser = async id => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};
