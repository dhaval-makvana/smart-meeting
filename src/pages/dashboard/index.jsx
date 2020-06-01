import React from "react";
import styles from "./index.module.css";
import Navbar from "../../components/navbar";
import { connect } from "react-redux";
import { fetchData, selectBuilding } from "../../store/actions";
import Dropdown from "../../components/dropdown";
import Button from "../../components/button";
import Card from "../../components/card";
import { freeRooms, totalMeetingsToday, onGoingMeetings } from "../../utils";

const Content = (props) => {
	let { building, totalBuildings } = props;
	if (building === "undefined") {
		building = {};
	}
	if (Object.keys(building).length !== 0) {
		const freeRoomsData = freeRooms(building);
		const totalMeetingsData = totalMeetingsToday(building);
		const onGoingMeetingsData = onGoingMeetings(building);

		return (
			<>
				<Card theme={styles}>
					<h3>Buildings</h3>
					<div>Total: {totalBuildings.length}</div>
					<div>Selected Building: {building.name}</div>
				</Card>

				<Card theme={styles}>
					<h3>Rooms</h3>
					<div>Total: {building.meetingRooms.length}</div>
					<div>Free now: {freeRoomsData.length}</div>
				</Card>

				<Card theme={styles}>
					<h3>Meetings</h3>
					<div>Total {totalMeetingsData.length} today</div>
					<div>Total {onGoingMeetingsData.length} going on now</div>
				</Card>
			</>
		);
	} else {
		return <Card theme={styles}>Please select a building.</Card>;
	}
};
class Dashboard extends React.Component {
	componentDidMount() {
		const { fetchData } = this.props;
		fetchData();
	}
	render() {
		const { buildings, selectBuilding, selectedBuilding } = this.props;

		if (!buildings) {
			return null;
		}
		return (
			<>
				<Navbar title="Dashboard" />
				<div className={styles.content}>
					<div className={styles.dropdownContainer}>
						<Dropdown
							list={buildings}
							identifier="name"
							text="Select a building"
							onChange={selectBuilding}
						/>
					</div>
					<div className={styles.roomsContainer}>
						<Content building={selectedBuilding} totalBuildings={buildings} />
					</div>
					<div className={styles.addMeetingContainer}>
						<Button
							label="Add a Meeting"
							onClick={() => this.props.history.push("/add-meeting")}
						/>
					</div>
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	const { buildings, selectedBuilding } = state;
	return {
		buildings,
		selectedBuilding,
	};
}

export default connect(mapStateToProps, { fetchData, selectBuilding })(
	Dashboard
);
