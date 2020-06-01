const dateUtil = () => {
	const today = new Date();
	const date = today.getDate();
	let month = today.getMonth() + 1;
	month = ("0" + month).slice(-2);
	const year = today.getFullYear();
	const dateString = date + "/" + month + "/" + year;
	const hours = today.getHours();

	return {
		dateString,
		hours,
	};
};

const freeRooms = (building) => {
	const { dateString, hours } = dateUtil();
	const { name, meetingRooms } = building;
	const availableRooms = [];
	meetingRooms.forEach((element) => {
		const { meetings } = element;
		let flag = false;
		meetings.forEach((m) => {
			if (dateString === m.date && m.startTime < hours && hours < m.endTime) {
				flag = true;
			}
		});
		if (!flag) {
			availableRooms.push(element);
		}
	});

	return availableRooms;
};

const totalMeetingsToday = (building) => {
	const totalMeetingsOutput = [];
	const { dateString } = dateUtil();
	const { meetingRooms } = building;

	meetingRooms.forEach((element) => {
		const { meetings } = element;
		meetings.forEach((m) => {
			if (m.date.trim() === dateString.trim()) {
				totalMeetingsOutput.push(m);
			}
		});
	});

	return totalMeetingsOutput;
};

const onGoingMeetings = (building) => {
	const totalMeetingsOutput = [];
	const { dateString, hours } = dateUtil();
	const { meetingRooms } = building;

	meetingRooms.forEach((element) => {
		const { meetings } = element;
		meetings.forEach((m) => {
			if (m.date === dateString && m.startTime < hours && hours < m.endTime) {
				totalMeetingsOutput.push(m);
			}
		});
	});

	return totalMeetingsOutput;
};

const availableBuildings = (date, startTime, endTime, buildings) => {
	const { dateString, hours } = dateUtil();
	// const { meetingRooms } = buildings;
	const availableBuildingsData = [];

	buildings.forEach((b) => {
		const { meetingRooms } = b;
		let flag = false;
		meetingRooms.forEach((mr) => {
			const { meetings } = mr;
			meetings.forEach((m) => {
				if (dateString === date) {
					if (hours > startTime && hours < endTime) {
					} else {
						flag = true;
					}
				} else {
					availableBuildingsData.push(b);
					flag = true;
				}
			});
		});

		if (flag) {
			availableBuildingsData.push(b);
		}
	});

	return availableBuildingsData;
};

const availableRooms = () => {};

export {
	freeRooms,
	totalMeetingsToday,
	onGoingMeetings,
	availableRooms,
	availableBuildings,
};
