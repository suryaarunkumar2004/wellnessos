import { apiFetch } from './api';

export const favoriteService = {
    getFavorites: async (userId) => {
        try {
            const response = await apiFetch(`/favorites/user/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get favorites error:', error);
            return [];
        }
    },

    addFavorite: async (userId, serviceId) => {
        try {
            const response = await apiFetch('/favorites', {
                method: 'POST',
                body: JSON.stringify({ userId, serviceId })
            });
            return await response.json();
        } catch (error) {
            console.error('Add favorite error:', error);
            return { success: false };
        }
    },

    removeFavorite: async (userId, serviceId) => {
        try {
            const response = await apiFetch(`/favorites/${userId}/${serviceId}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Remove favorite error:', error);
            return { success: false };
        }
    },

    checkFavorite: async (userId, serviceId) => {
        try {
            const response = await apiFetch(`/favorites/check/${userId}/${serviceId}`);
            return await response.json();
        } catch (error) {
            console.error('Check favorite error:', error);
            return false;
        }
    }
};
