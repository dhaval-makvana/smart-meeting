import { FETCH_DATA, ADD_MEETING, SAVE_MEETING, SELECT_BUILDING, FETCH_TEMP_DATA } from './types';

const initialState = {
  buildings: [],
  selectedBuilding: {},
  tempMeeting: {}
}

export default (state=initialState, action) => {
    switch (action.type) {
      case FETCH_DATA:
        return {
          ...state,
          buildings: action.payload,
          loading: false,
          selectedBuilding: {}
        };
      
      case SELECT_BUILDING:
        const selected = state.buildings.filter((b) => action.payload === b.name);
        return {
          ...state,
          selectedBuilding: selected[0]
        }
      
      case ADD_MEETING:
        return {
          ...state,
          tempMeeting: action.payload
        }

      case FETCH_TEMP_DATA:
        return {
          ...state,
          tempMeeting: action.payload
        }
      
      case SAVE_MEETING:
        return {
          buildings: action.payload,
          selectedBuilding: {},
          tempMeeting: {}
        }
    
      default:
        return state;
    }
}