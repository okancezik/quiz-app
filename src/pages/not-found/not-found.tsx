import React from "react";
import styles from './not-found.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
    </div>
  );
};

export default NotFound;
