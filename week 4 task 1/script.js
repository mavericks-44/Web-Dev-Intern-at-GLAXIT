



async function loadUsers() {
  const statusEl = document.getElementById('status');
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  statusEl.textContent = 'Loading...';
  statusEl.className = 'loading';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const users = await response.json();
    statusEl.textContent = 'Users Loaded:';
    statusEl.className = '';

    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.className = 'user-card';
      userCard.innerHTML = `<strong>${user.name}</strong><br>Email: ${user.email}<br>Phone: ${user.phone}`;
      userList.appendChild(userCard);
    });
  } catch (error) {
    statusEl.textContent = 'Failed to load users: ' + error.message;
    statusEl.className = 'error';
  }
}
