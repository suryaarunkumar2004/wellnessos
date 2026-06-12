import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Link } from 'react-router-dom';
import { Loader2, User, Edit, Save, X } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({ name, email });
      addToast('Profile updated successfully', 'success');
      setEditMode(false);
    } catch (err) {
      addToast('Failed to update profile', 'error');
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <section className="profile-page">
        <p>Please <Link to="/login">log in</Link> to view your profile.</p>
      </section>
    );
  }

  return (
    <section className="profile-page">
      <div className="container">
        <h2 className="profile-page__title">Your Profile</h2>
        {editMode ? (
          <form className="profile-form" onSubmit={handleSave} aria-label="Edit profile form">
            <label className="profile-label">
              Full Name
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="profile-input"
              />
            </label>
            <label className="profile-label">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="profile-input"
              />
            </label>
            <div className="profile-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)} disabled={loading}>
                <X size={16} /> Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-view">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="btn btn-primary" onClick={() => setEditMode(true)}>
              <Edit size={16} /> Edit Profile
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

