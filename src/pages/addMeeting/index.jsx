import React from "react";
import styles from "./index.module.css";
import Navbar from "../../components/navbar";
import Dropdown from "../../components/dropdown";
import Button from "../../components/button";
import { availableBuildings } from '../../utils';
import { connect } from 'react-redux';
import { fetchData, addMeeting } from "../../store/actions";

const isFormReady = (formData) => {
	const { title, startTime, endTime, date, building } = formData;
	if (title === '' || startTime === '' || endTime === '' || date === '' || building === '') {
		return true;
	} else {
		return false;
	}
}
class AddMeeting extends React.Component {
	state = {
		title: "",
		date: "",
		startTime: "",
		endTime: "",
		building: "",
	};

	componentDidMount() {
		const { fetchData } = this.props;
		fetchData();
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addMeeting(this.state);
		this.props.history.push('select-room');
	};

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			...this.state,
			[e.target.name]: e.target.value,
		});
	};

	onSelectBuiling = (value) => {
		this.setState({
			...this.state,
			building: value
		});
	}
	render() {
		const { title, date, startTime, endTime, building } = this.state;
		const { buildings } = this.props;
		const disabled = isFormReady(this.state);
		let availableBuildingsArray;
		if (date && startTime && endTime) {
			availableBuildingsArray = availableBuildings(date, startTime, endTime, buildings);
		}
		return (
			<>
				<Navbar title="Add Meeting" />
				<div className={styles.content}>
					<form onSubmit={this.handleSubmit}>
						<div className={styles.formField}>
							<label htmlFor="title">Title: </label>
							<input
								name="title"
								value={title}
								onChange={this.handleChange}
								placeholder="Agenda of the meeting"
							/>
						</div>

						<div className={styles.formField}>
							<label htmlFor="date">Date: </label>
							<input
								name="date"
								value={date}
								onChange={this.handleChange}
								placeholder="1/06/2020"
							/>
						</div>

						<div className={styles.formField}>
							<label htmlFor="startTime">Start Time: </label>
							<input
								name="startTime"
								value={startTime}
								onChange={this.handleChange}
								placeholder="00"
								type="number"
							/>
						</div>

						<div className={styles.formField}>
							<label htmlFor="endTime">End Time: </label>
							<input
								name="endTime"
								value={endTime}
								onChange={this.handleChange}
								placeholder="12"
								type="number"
							/>
						</div>

						{availableBuildingsArray && (
							<div className={styles.formField}>
								<label>Select a building</label>
								<Dropdown
									list={availableBuildingsArray}
									text="Select"
									identifier="name"
									onChange={this.onSelectBuiling}
								/>
							</div>
						)}

						<div className={styles.formField}>
							<Button disabled={disabled} label="Next" />
						</div>
					</form>
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	const { buildings } = state;
	return {
		buildings
	}
}

export default connect(mapStateToProps, {fetchData, addMeeting})(AddMeeting);
