import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileContext from '../context/ProfileContext';
import Loader from '../components/Loader';
import Toast, { showToast } from '../components/Toast';
import styles from './ProfileForm.module.css';
import Navbar from '../components/Navbar';

interface ProfileData {
  id?: number;
  name: string;
  email: string;
  age?: number;
}

const ProfileForm: React.FC = () => {
  const location = useLocation();
  const editProfile = location.state?.profileData as ProfileData | undefined;
  const [name, setName] = useState(editProfile?.name || '');
  const [email, setEmail] = useState(editProfile?.email || '');
  const [age, setAge] = useState<number | ''>(editProfile?.age || '');
  const [loading, setLoading] = useState(false);
  const { setProfile } = useContext(ProfileContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (editProfile) {
      showToast("Editing Profile", "info");
    }
  }, [editProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (name.length < 3) {
      showToast("Name must be at least 3 characters", "error");
      setLoading(false);
      return;
    }
    if (!email.includes("@")) {
      showToast("Invalid email format", "error");
      setLoading(false);
      return;
    }

    const profileData = { name, email, age: age || undefined };

    try {
      let response;
      if (editProfile?.id) {
        response = await fetch(`${process.env.REACT_APP_API_URL}/profiles/${editProfile.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        });
      } else {
        response = await fetch(`${process.env.REACT_APP_API_URL}/profiles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        });
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const savedProfile = await response.json();

      setProfile((prevProfiles) => {
        if (prevProfiles) {
          return editProfile?.id
            ? prevProfiles.map((profile) => (profile.id === editProfile.id ? savedProfile : profile))
            : [...prevProfiles, savedProfile];
        } else {
          return [savedProfile];
        }
      });

      const updatedProfiles = editProfile?.id
        ? (JSON.parse(localStorage.getItem('profiles') || '[]') as ProfileData[]).map((profile) =>
          profile.id === editProfile.id ? savedProfile : profile
        )
        : [...(JSON.parse(localStorage.getItem('profiles') || '[]') as ProfileData[]), savedProfile];
      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));

      showToast(editProfile ? "Profile updated successfully!" : "Profile saved successfully!", "success");
      setTimeout(() => navigate('/profile'), 1000);
    } catch (error) {
      showToast("Failed to save profile. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <Navbar />
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>{editProfile ? "Edit Profile" : "Create Your Profile"}</h2>

          {loading && <Loader message="Saving..." />}

          <form className={styles.formGroupContainer} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Age (optional):</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value) || '')}
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Saving...' : editProfile ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
        <Toast />
      </div>
    </>
  );
};

export default ProfileForm;
