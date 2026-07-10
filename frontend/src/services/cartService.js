import { apiFetch } from './api';

export const cartService = {
    getCart: async (userId) => {
        try {
            const response = await apiFetch(`/cart/user/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get cart error:', error);
            return [];
        }
    },

    addToCart: async (userId, serviceId) => {
        try {
            const response = await apiFetch('/cart', {
                method: 'POST',
                body: JSON.stringify({ userId, serviceId })
            });
            return await response.json();
        } catch (error) {
            console.error('Add to cart error:', error);
            return { success: false };
        }
    },

    removeFromCart: async (userId, serviceId) => {
        try {
            const response = await apiFetch(`/cart/${userId}/${serviceId}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Remove from cart error:', error);
            return { success: false };
        }
    },

    updateQuantity: async (cartItemId, quantity) => {
        try {
            const response = await apiFetch(`/cart/${cartItemId}`, {
                method: 'PUT',
                body: JSON.stringify({ quantity })
            });
            return await response.json();
        } catch (error) {
            console.error('Update cart error:', error);
            return { success: false };
        }
    },

    clearCart: async (userId) => {
        try {
            const response = await apiFetch(`/cart/clear/${userId}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Clear cart error:', error);
            return { success: false };
        }
    }
};
