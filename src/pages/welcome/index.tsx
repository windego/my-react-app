import React from 'react';
import styles from './index.scss';

export default () => {
  return (
    <div className={styles.welcome}>
      <header>
        <div className="brand">
          <h2>React Demo</h2>
          <p>让前端更简单</p>
        </div>
      </header>
      <div className="welcome-bg" />
    </div>
  );
};
