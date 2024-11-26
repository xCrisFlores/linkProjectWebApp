import apiClient from './apiClient';

export const createStudent = async (student) => {
  return apiClient.post('/api/student', student);
};

export const getStudentById = async (id) => {
  return apiClient.get(`/api/student/${id}`);
};