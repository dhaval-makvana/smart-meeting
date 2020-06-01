import React from "react";
import styles from "./index.module.css";
import Navbar from "../../components/navbar";
import { connect } from "react-redux";
import { fetchTempData, fetchData, saveMeeting } from "../../store/actions";
import Card from "../../components/card";
import Button from "../../components/button";
import { uuid } from 'uuidv4';

class SelectRoom extends React.Component {
  state = {
    selectedRoom: ''
  }

  handleClick = (name) => (e) => {
    e.preventDefault();
    this.setState({
      selectedRoom: name
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedRoom } = this.state;
    this.props.saveMeeting(selectedRoom);
    this.props.history.push("/");
  }
	componentDidMount() {
    const { fetchData, fetchTempData, buildings, tempMeeting } = this.props;
		if (!tempMeeting) {
			fetchTempData();
		}
		if (!buildings) {
			fetchData();
		}
	}
	render() {
    const { tempMeeting, buildings, saveMeeting } = this.props;
    const { selectedRoom } = this.state;
		if (!tempMeeting) {
			return null;
		}
		const { building } = tempMeeting;
		let meetingRooms = [];
		buildings.forEach((b) => {
			if (b.name.trim() === building.trim()) {
				meetingRooms = b.meetingRooms;
			}
    });
    
		return (
			<>
				<Navbar title="Select Room" />
				<div className={styles.content}>
					<h3>Please select one of the Free rooms.</h3>
					{meetingRooms.map((mr) => {
						return (
							<Card key={uuid()} active={selectedRoom === mr.name} onClick={this.handleClick(mr.name)} theme={styles}>
								<div>{mr.name}</div>
								<div>{building}</div>
							</Card>
						);
					})}

					<Button label="Save Meeting" onClick={this.handleSubmit} />
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	const { tempMeeting, buildings } = state;
	return {
		tempMeeting,
		buildings,
	};
}

export default connect(mapStateToProps, {
	fetchTempData,
	fetchData,
	saveMeeting,
})(SelectRoom);
