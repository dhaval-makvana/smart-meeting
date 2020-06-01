import React, { useState } from "react";
import styles from "./index.module.css";
import { uuid } from "uuidv4";

const Dropdown = (props) => {
	const { list, text, identifier, onChange } = props;
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		e.preventDefault();
		setValue(e.target.value);
		onChange(e.target.value);
	}

	return (
		<select className={styles.dropdown} value={value} onChange={(e) => handleChange(e)} >
			<option value="" key={uuid()} className={styles.dropdownItem}>
				{text}
			</option>
			{list.map((item) => {
				return (
					<option value={item[identifier]} key={uuid()} className={styles.dropdownItem}>
						{item[identifier]}
					</option>
				);
			})}
		</select>
	);
};

export default Dropdown;
