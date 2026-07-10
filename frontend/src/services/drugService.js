import { apiFetch } from './api';

export const drugService = {
    getDrugs: async (page = 0, size = 1000) => {
        try {
            const response = await apiFetch(`/drugs?page=${page}&size=${size}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get drugs error:', error);
            return { drugs: [], totalPages: 0 };
        }
    },

    getCategories: async () => {
        try {
            const response = await apiFetch('/drugs/categories');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get categories error:', error);
            return [];
        }
    },

    getDrugById: async (id) => {
        try {
            const response = await apiFetch(`/drugs/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get drug error:', error);
            return null;
        }
    },

    searchDrugs: async (query) => {
        try {
            const response = await apiFetch(`/drugs/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Search drugs error:', error);
            return [];
        }
    }
};
