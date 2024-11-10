import React, { useEffect, useState, useContext, useCallback } from 'react';
import ProfileContext from '../context/ProfileContext';
import Loader from '../components/Loader';
import Toast, { showToast } from '../components/Toast';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface ProfileData {
  id: number;
  name: string;
  email: string;
  age?: number;
}

const Profile: React.FC = () => {
  const { profile, setProfile } = useContext(ProfileContext)!;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      const storedProfiles = localStorage.getItem('profiles');
      if (storedProfiles) {
        setProfile(JSON.parse(storedProfiles) as ProfileData[]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profiles`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: ProfileData[] = await response.json();
        setProfile(data);
        localStorage.setItem('profiles', JSON.stringify(data));
      } catch (error) {
        showToast('Failed to load profiles. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleDelete = useCallback(
    async (id: any) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profiles/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete profile');

        const updatedProfiles = profile && profile?.filter((user) => user.id !== id);
        setProfile(updatedProfiles);
        localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
        showToast('Profile deleted successfully.', 'success');
      } catch (error) {
        showToast('Error deleting profile. Please try again.', 'error');
      }
    },
    [profile, setProfile]
  );


  const handleEdit = useCallback(
    (user: any) => {
      navigate(`/profile-form`, { state: { profileData: user } });
    },
    [navigate]
  );

  return (
    <>
      <Navbar />
      {loading && <Loader message="Loading profiles..." />}
      {!profile || profile.length === 0 ? <div>
        <div className={styles.headerContainer}>
          <h2 className={styles.profileTitle}>User Profiles</h2>
          <button
            className={styles.createProfileButton}
            onClick={() => navigate('/profile-form')}
          >
            Create New Profile
          </button>
        </div>
        <div className={styles.noProfileContainer}>
          <p className={styles.noProfile}>No profiles found. Please create one.</p>
        </div>
      </div> :
        <div className={styles.profileContainer}>
          <div className={styles.headerContainer}>
            <h2 className={styles.profileTitle}>User Profiles</h2>
            <button
              className={styles.createProfileButton}
              onClick={() => navigate('/profile-form')}
            >
              Add New Profile
            </button>
          </div>

          <table className={styles.profileTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profile.length > 0 && profile.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age || 'N/A'}</td>
                  <td>
                    <button onClick={() => handleEdit(user)} className={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(user.id)} className={styles.deleteButton}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      <Toast />
    </>
  );
};

export default Profile;
