import apiFetch from './api';

const API_BASE = '/api/notifications';

export const notificationService = {
    // ============ SEND EMAIL NOTIFICATION ============
    sendEmail: async (email, subject, message) => {
        try {
            const response = await apiFetch(`${API_BASE}/email`, {
                method: 'POST',
                body: JSON.stringify({ email, subject, message }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending email notification:', error);
            return { success: false, message: error.message };
        }
    },

    // ============ SEND APPOINTMENT CONFIRMATION ============
    sendAppointmentConfirmation: async (email, patientName, doctorName, date, time, meetingLink) => {
        try {
            const response = await apiFetch(`${API_BASE}/appointment/confirm`, {
                method: 'POST',
                body: JSON.stringify({ email, patientName, doctorName, date, time, meetingLink }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending appointment confirmation:', error);
            return { success: false, message: error.message };
        }
    },

    // ============ SEND APPOINTMENT REMINDER ============
    sendAppointmentReminder: async (email, patientName, doctorName, date, time) => {
        try {
            const response = await apiFetch(`${API_BASE}/appointment/reminder`, {
                method: 'POST',
                body: JSON.stringify({ email, patientName, doctorName, date, time }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending appointment reminder:', error);
            return { success: false, message: error.message };
        }
    },

    // ============ SEND PRESCRIPTION ============
    sendPrescription: async (email, patientName, doctorName, prescription) => {
        try {
            const response = await apiFetch(`${API_BASE}/prescription`, {
                method: 'POST',
                body: JSON.stringify({ email, patientName, doctorName, prescription }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending prescription:', error);
            return { success: false, message: error.message };
        }
    },

    // ============ SEND CONSULTATION SUMMARY ============
    sendConsultationSummary: async (email, patientName, doctorName, summary) => {
        try {
            const response = await apiFetch(`${API_BASE}/consultation/summary`, {
                method: 'POST',
                body: JSON.stringify({ email, patientName, doctorName, summary }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending consultation summary:', error);
            return { success: false, message: error.message };
        }
    },
};

export default notificationService;
