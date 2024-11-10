import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ProfileData {
  id?: number;
  name: string;
  email: string;
  age?: number;
}

// Context now holds an array of profiles
interface ProfileContextType {
  profile: ProfileData[] | null;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData[] | null>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData[] | null>([]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;
