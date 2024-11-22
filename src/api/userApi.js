import apiClient from './apiClient';

/**
 * Modelo de datos para el objeto User.
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
  return apiClient.get(`/person/${id}`);
};

// Otras funciones relacionadas con User
