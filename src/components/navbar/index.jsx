import React from 'react';
import styles from './index.module.css';

export default (props) => {
  const { title } = props; 
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      {title && <div className={styles.title}>{title}</div>}
    </div>
  )
}