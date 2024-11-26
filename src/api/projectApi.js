import apiClient from './apiClient';

export const getAllProjects = async () => {
  return apiClient.get(`/api/project`);
};
export const getProjectById = async (id) => {
  return apiClient.get(`/api/project/${id}`);
};
export const getRequirements = async (id) => {
  return apiClient.get(`api/project/requirements?project_id${id}`);
};
export const getAreas = async (id) => {
  return apiClient.get(`api/project/areas?project_id${id}`);
};
export const getInnovations = async (id) => {
  return apiClient.get(`api/project/innovations?project_id${id}`);
};
export const createMemberRequest = async (request) => {
  return apiClient.post('api/project/members/request', request);
};

