import apiClient from './apiClient';

/**
 * User Model.
 * @property {number} Code
 * @property {string} [Email] 
 * @property {string} [Password] 
 * @property {string} [Name] 
 * @property {string} [Path] 
 */
export const createUser = async (user) => {
  return apiClient.post('/api/user', user);
};

export const getUserById = async (id) => {
  console.log("🚀 ~ getUserById ~ id:", id)
  return apiClient.get(`/api/user/${id}`);
};

