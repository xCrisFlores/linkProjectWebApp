import apiClient from './apiClient';

export const createAdviser = async (adviser) => {
    return apiClient.post('/api/adviser', adviser);
  };
export const getAdviserById = async (id) => {
    return apiClient.get(`/api/adviser/${id}`);
  };