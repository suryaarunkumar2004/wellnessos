// Global fetch interceptor - SIMPLE and CLEAN
const originalFetch = window.fetch;

window.fetch = function(url, options = {}) {
    const token = localStorage.getItem('token');
    
    // Only add token if it exists
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    
    return originalFetch.call(this, url, options);
};

console.log('✅ Global fetch interceptor installed');
