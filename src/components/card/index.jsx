import React from 'react';
import styles from './index.module.css';

const Card = (props) => {
  const { children, theme, active, onClick } = props;
  return (
    <div onClick={onClick} className={`${styles.card} ${theme && theme.card} ${active && theme && theme.activeCard}`}>
      {children}
    </div>
  )
}

export default Card;