import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => (
  <div className={styles.notFoundContainer}>
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <div className={styles.buttonContainer}>
        <Link to="/profile" className={styles.goBackButton}>
          Go Back to Profile
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
