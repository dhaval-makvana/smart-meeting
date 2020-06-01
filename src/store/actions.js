import { FETCH_DATA, ADD_MEETING, SELECT_BUILDING, FETCH_TEMP_DATA, SAVE_MEETING } from './types';

const fetchData = () => dispatch => {
  const data = localStorage.getItem('data');
  dispatch({ type: FETCH_DATA, payload: JSON.parse(data) });
}

const selectBuilding = (name) => dispatch => {
  dispatch({ type: SELECT_BUILDING, payload: name });
}

const addMeeting = (data) =>  dispatch => {
  localStorage.setItem('tempData', JSON.stringify(data));
  dispatch({
    type: ADD_MEETING,
    payload: data
  });
}

const fetchTempData = () => dispatch => {
  let tempData = localStorage.getItem('tempData');
  tempData = JSON.parse(tempData);
  dispatch({
    type: FETCH_TEMP_DATA,
    payload: tempData
  });
}

const saveMeeting = (room) => dispatch => {
  let data = JSON.parse(localStorage.getItem('data'));
  const tempData = JSON.parse(localStorage.getItem('tempData'));
  const { building, title, endTime, startTime, date } = tempData;
  const newMeeting = {
    title,
    endTime,
    startTime,
    date
  };
  data = data.map((b) => {
    const { name, meetingRooms } = b;
    if (name.trim() === building) {
      meetingRooms.forEach((mr) => {
        if (mr.name.trim() === room.trim()) {
          mr.meetings.push(newMeeting);
        }
      });
    }
    return b;
  });
  localStorage.setItem('data', JSON.stringify(data));
  localStorage.removeItem('tempData');
  dispatch({
    type: SAVE_MEETING,
    payload: data
  });
}

export { fetchData, selectBuilding, addMeeting, saveMeeting, fetchTempData };