const API_URL = 'http://localhost:3000/api/v1';

export async function getAllUsers() {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();
  return result.data;
}

export async function getUserById(userId: number) {
  const response = await fetch(`${API_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const result = await response.json();
  return result.data;
}