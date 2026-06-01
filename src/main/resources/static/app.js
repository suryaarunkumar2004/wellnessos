const API_BASE = 'http://localhost:5000/api/v1';
let authToken = localStorage.getItem('wellness_token');
let userRole = localStorage.getItem('wellness_role');
let userEmail = localStorage.getItem('wellness_email');
let userFullName = localStorage.getItem('wellness_name');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (authToken && userRole) {
        showDashboard();
    }
});

// UI View Switching
function switchAuthTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('login-form').style.display = tab === 'login' ? 'flex' : 'none';
    document.getElementById('register-form').style.display = tab === 'register' ? 'flex' : 'none';
    clearFeedback();
}

function clearFeedback() {
    document.getElementById('login-feedback').className = 'form-feedback';
    document.getElementById('login-feedback').innerText = '';
    document.getElementById('reg-feedback').className = 'form-feedback';
    document.getElementById('reg-feedback').innerText = '';
    document.getElementById('report-feedback').className = 'form-feedback';
    document.getElementById('report-feedback').innerText = '';
}

function showFeedback(elementId, message, isError) {
    const el = document.getElementById(elementId);
    el.innerText = message;
    el.className = `form-feedback ${isError ? 'error' : 'success'}`;
}

function showDashboard() {
    document.getElementById('auth-view').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
    
    document.getElementById('welcome-text').innerText = `Welcome, ${userFullName}`;
    document.getElementById('user-display').innerText = `Role: ${userRole.replace('ROLE_', '')}`;

    if (userRole === 'ROLE_MEMBER') {
        document.getElementById('member-area').style.display = 'block';
        document.getElementById('coach-area').style.display = 'none';
        loadDiagnostics();
    } else if (userRole === 'ROLE_COACH') {
        document.getElementById('coach-area').style.display = 'block';
        document.getElementById('member-area').style.display = 'none';
        loadCriticalAlerts();
    }
}

function logout() {
    localStorage.clear();
    authToken = null;
    userRole = null;
    userEmail = null;
    userFullName = null;
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('auth-view').style.display = 'block';
    document.getElementById('auth-view').style.opacity = '1';
    clearFeedback();
}

function toggleReportForm() {
    const form = document.getElementById('new-report-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    clearFeedback();
}

// API Interactions
async function handleLogin(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerText = 'Authenticating...';
    
    const emailVal = document.getElementById('login-email').value;
    const passwordVal = document.getElementById('login-password').value;

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailVal, password: passwordVal })
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || 'Invalid credentials or validation failure');
        }
        
        const data = await res.json();
        authToken = data.accessToken;
        userRole = data.authorizedRoles[0] || 'ROLE_MEMBER';
        userEmail = data.authenticatedEmail;
        userFullName = data.clientFullName;
        
        localStorage.setItem('wellness_token', authToken);
        localStorage.setItem('wellness_role', userRole);
        localStorage.setItem('wellness_email', userEmail);
        localStorage.setItem('wellness_name', userFullName);
        
        showDashboard();
    } catch (err) {
        showFeedback('login-feedback', err.message, true);
    } finally {
        btn.innerText = 'Secure Login';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerText = 'Creating...';
    
    const fullNameVal = document.getElementById('reg-fullname').value;
    const emailVal = document.getElementById('reg-email').value;
    const passwordVal = document.getElementById('reg-password').value;
    const tokenVal = document.getElementById('reg-token').value;
    const roleVal = document.getElementById('reg-role').value;
    
    const payload = {
        fullName: fullNameVal,
        email: emailVal,
        password: passwordVal,
        clientTrackingToken: tokenVal,
        role: roleVal
    };

    try {
        const res = await fetch(`${API_BASE}/members/onboard`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || 'Onboarding failed. Check token formatting (ATH-WN-XXXXX) or password requirements.');
        }
        
        showFeedback('reg-feedback', 'Profile initialized successfully! Please log in.', false);
        setTimeout(() => switchAuthTab('login'), 2000);
    } catch (err) {
        showFeedback('reg-feedback', err.message, true);
    } finally {
        btn.innerText = 'Initialize Profile';
    }
}

async function loadDiagnostics() {
    const grid = document.getElementById('diagnostics-grid');
    grid.innerHTML = '<p style="color:var(--text-muted)">Retrieving encrypted medical reports...</p>';

    try {
        const res = await fetch(`${API_BASE}/reports/member/${userEmail}`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (!res.ok) throw new Error('Unauthorized or network issue');
        
        const data = await res.json();
        grid.innerHTML = '';
        
        const reportsList = data.content || [];
        
        if (reportsList.length === 0) {
            grid.innerHTML = '<p style="color:var(--text-muted)">No health records established yet.</p>';
            return;
        }

        reportsList.forEach(diag => {
            const date = new Date(diag.generatedAt).toLocaleString();
            const card = document.createElement('div');
            card.className = 'diag-card';
            
            const isAlert = diag.criticalBurnoutIndicated;
            const alertTag = isAlert 
                ? '<span class="diag-status" style="background:rgba(239, 68, 68, 0.2);color:var(--error)">CRITICAL BURNOUT</span>' 
                : '<span class="diag-status">STABLE</span>';

            card.innerHTML = `
                <div class="diag-header">
                    <span class="diag-id">ID: ${diag.reportId}</span>
                    ${alertTag}
                </div>
                <div class="diag-body">
                    <p><strong>Systemic Recovery Index:</strong> <span style="font-weight:600;color:var(--secondary)">${diag.calculatedRecoveryIndex.toFixed(2)} / 10</span></p>
                    <p><strong>Peak HRV:</strong> ${diag.peakHeartRateVariability} ms</p>
                    <p><strong>Baseline HRV:</strong> ${diag.baselineHeartRateVariability} ms</p>
                    <p><strong>HRV Spike Delta:</strong> ${diag.hrvSpikeDelta.toFixed(2)} ms</p>
                    <p><strong>Clinical Summary:</strong> ${diag.systemicSummaryNotes || 'N/A'}</p>
                    <p style="margin-top:1rem;font-size:0.8rem;color:var(--text-muted)">Timestamp: ${date}</p>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (err) {
        grid.innerHTML = `<p style="color:var(--error)">Access Denied: ${err.message}</p>`;
    }
}

async function handleCreateReport(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerText = 'Publishing...';
    
    const targetMember = document.getElementById('rep-member').value;
    const rawScores = document.getElementById('rep-scores').value;
    const peakHrv = parseFloat(document.getElementById('rep-peak-hrv').value);
    const baseHrv = parseFloat(document.getElementById('rep-base-hrv').value);
    const notes = document.getElementById('rep-notes').value;
    
    // Parse comma-separated scores to integer array
    const scoresArray = rawScores.split(',').map(s => parseInt(s.trim())).filter(s => !isNaN(s));

    const payload = {
        memberId: targetMember,
        biometricScores: scoresArray,
        peakHeartRateVariability: peakHrv,
        baselineHeartRateVariability: baseHrv,
        systemicSummaryNotes: notes
    };

    try {
        const res = await fetch(`${API_BASE}/reports`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || 'Failed to submit report. Please check member ID validity and score formatting.');
        }
        
        showFeedback('report-feedback', 'Diagnostic Report generated, computed, and encrypted successfully!', false);
        e.target.reset();
        setTimeout(() => {
            toggleReportForm();
            loadCriticalAlerts();
        }, 2000);
    } catch (err) {
        showFeedback('report-feedback', err.message, true);
    } finally {
        btn.innerText = 'Analyze & Publish';
    }
}

async function loadCriticalAlerts() {
    const container = document.getElementById('critical-alerts-container');
    container.innerHTML = '<p style="color:var(--text-muted)">Monitoring clinical channels...</p>';
    
    // As a Coach, we don't have a specific global stream, but we can query critical counts or load standard logs.
    // For demo purposes, we will display an active dashboard monitoring feed.
    container.innerHTML = `
        <div style="background:rgba(239, 68, 68, 0.05); border:1px solid rgba(239,68,68,0.2); padding:1rem; border-radius:12px; margin-bottom:1rem;">
            <strong style="color:var(--error)">Live Watchdog Stream:</strong> System successfully initialized. Awaiting diagnostic ingestions from active members.
        </div>
    `;
}
