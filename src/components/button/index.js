import React from 'react';
import styles from './index.module.css';

const Button = (props) => {
	let { label, onClick, disabled } = props;
	if (disabled === "undefined") {
		disabled=false;
	}
	return <button disabled={disabled} className={styles.button} onClick={onClick}>{label}</button>;
};

export default Button;