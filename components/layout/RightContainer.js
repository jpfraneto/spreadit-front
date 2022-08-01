import React from 'react';
import styles from './RightContainer.module.css';

const RightContainer = ({ children }) => {
  return <div className={styles.fullOnContainer}>{children}</div>;
};

export default RightContainer;
