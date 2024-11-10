import React from 'react';
import { useProfile } from '../context/ProfileContext';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const { profile } = useProfile();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContent}>
                <h1>My Application</h1>
                {profile && profile.length > 0 && (
                    <h6 className={styles.userGreeting}>
                        Welcome, {profile[0].name}
                    </h6>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
