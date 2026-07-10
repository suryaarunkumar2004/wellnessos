const API_URL = 'http://localhost:8080/api';

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

export const apiFetch = async (endpoint, options = {}) => {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    });
    return response;
};

export default apiFetch;
