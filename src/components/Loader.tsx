import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => (
    <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>{message}</p>
    </div>
);

export default Loader;
