import React from 'react';
import styles from './styles.module.css';
import { Loader } from '@mantine/core';

const LoaderComponent = () => {
  return (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  );
};

export default LoaderComponent;
