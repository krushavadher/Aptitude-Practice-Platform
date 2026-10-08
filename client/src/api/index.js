import api from './axios';

export const authApi = {
  register: async (data) => (await api.post('/auth/register', data)).data.data,
  login: async (data) => (await api.post('/auth/login', data)).data.data,
  getMe: async () => (await api.get('/auth/me')).data.data,
};

export const topicApi = {
  list: async () => (await api.get('/topics')).data.data,
};

export const practiceApi = {
  getQuestions: async (topicId, params) => (await api.get(`/practice/${topicId}`, { params })).data.data,
  check: async (data) => (await api.post('/practice/check', data)).data.data,
};

export const testApi = {
  start: async (data) => (await api.post('/tests/start', data)).data.data,
  submit: async (testId, data) => (await api.post(`/tests/${testId}/submit`, data)).data.data,
  result: async (testId) => (await api.get(`/tests/${testId}/result`)).data.data,
};

export const meApi = {
  attempts: async (params) => (await api.get('/me/attempts', { params })).data.data,
  stats: async () => (await api.get('/me/stats')).data.data,
};

export const adminApi = {
  getStats: async () => (await api.get('/admin/stats')).data.data,

  getTopics: async () => (await api.get('/topics')).data.data,
  createTopic: async (data) => (await api.post('/admin/topics', data)).data.data,
  updateTopic: async (id, data) => (await api.put(`/admin/topics/${id}`, data)).data.data,
  deleteTopic: async (id) => (await api.delete(`/admin/topics/${id}`)).data.data,
  
  getQuestions: async (params) => (await api.get('/admin/questions', { params })).data.data,
  createQuestion: async (data) => (await api.post('/admin/questions', data)).data.data,
  updateQuestion: async (id, data) => (await api.put(`/admin/questions/${id}`, data)).data.data,
  deleteQuestion: async (id) => (await api.delete(`/admin/questions/${id}`)).data.data,

  reviewQuestion: async (id, data) => (await api.patch(`/admin/questions/${id}/review`, data)).data.data,
};

export const leaderboardApi = {
  getLeaderboard: async (params, topicId) => {
    const url = topicId ? `/leaderboard/${topicId}` : '/leaderboard';
    return (await api.get(url, { params })).data.data;
  }
};

export const aiApi = {
  generate: async (data) => (await api.post('/admin/ai/generate', data)).data.data
};
