const API_URL = 'http://localhost:8080/api';

export const healthService = {
    getRecords: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/health/records/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get records error:', error);
            return [];
        }
    },

    getLatestRecord: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/health/latest/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get latest record error:', error);
            return null;
        }
    },

    getWeeklyRecords: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/health/weekly/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get weekly records error:', error);
            return [];
        }
    },

    saveRecord: async (recordData) => {
        try {
            const response = await fetch(`${API_URL}/health/record`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recordData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Save record error:', error);
            return { success: false, error: error.message };
        }
    },

    deleteRecord: async (id) => {
        try {
            const response = await fetch(`${API_URL}/health/record/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Delete record error:', error);
            return { success: false, error: error.message };
        }
    },

    getAnalytics: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/health-metrics/analytics/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get analytics error:', error);
            return {};
        }
    },

    getTrend: async (userId, metric, days = 7) => {
        try {
            const response = await fetch(`${API_URL}/health-metrics/trend/${userId}?metric=${metric}&days=${days}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get trend error:', error);
            return {};
        }
    },

    getChartData: async (userId, metric, days = 7) => {
        try {
            const response = await fetch(`${API_URL}/health-metrics/chart/${userId}?metric=${metric}&days=${days}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get chart data error:', error);
            return { labels: [], data: [] };
        }
    },

    getDailySummary: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/health-metrics/summary/${userId}/daily`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get daily summary error:', error);
            return {};
        }
    },

    getWeeklySummary: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/health-metrics/summary/${userId}/weekly`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get weekly summary error:', error);
            return {};
        }
    }
};
